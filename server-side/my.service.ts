import { PapiClient, InstalledAddon } from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';
import fetch from "node-fetch";
import jwtDecode from "jwt-decode";
import ClientApi from "@pepperi-addons/client-api";

class MyService {

    papiClient: PapiClient

    constructor(private client: Client) {
        this.papiClient = new PapiClient({
            baseURL: client.BaseURL,
            token: client.OAuthAccessToken,
            addonUUID: client.AddonUUID,
            addonSecretKey: client.AddonSecretKey
        });
    }

    doSomething() {
        console.log("doesn't really do anything....");
    }

    getAddons(): Promise<InstalledAddon[]> {
        return this.papiClient.addons.installedAddons.find({});
    }

    async getWebAPIBaseURL() {
        //get WebAPI base url, this implementation is temporary, DI-17467

        let environment = jwtDecode(this.client.OAuthAccessToken)["pepperi.datacenter"];

        const webappAddon = await this.papiClient.addons.installedAddons.addonUUID("00000000-0000-0000-0000-0000003eba91").get();
        environment = environment == "sandbox" ? "sandbox." : "";

        let baseURL = '';
        if (webappAddon.Version?.indexOf('16.55') != -1) {
            const webappVersion = webappAddon.Version?.split(".");
            const versionMain = webappVersion ? webappVersion[0] : "";
            const versionMinor = webappVersion ? webappVersion[1] : "";
            const versionPatch = webappVersion ? webappVersion[2] : "";
            baseURL = `https://webapi.${environment}pepperi.com/V${versionMain}_${versionMinor}/WebApp_${versionPatch}`;
        } else {
            baseURL = `https://webapi.${environment}pepperi.com/${webappAddon.Version}/webapi`;
        }

        return baseURL;
    }

    async getAccessToken(webAPIBaseURL) {
        const URL = webAPIBaseURL + "/Service1.svc/v1/CreateSession";
        const Body = { "accessToken": this.client.OAuthAccessToken, "culture": "en-US" };
        let accessToken = (await (await fetch(URL, {
            method: "POST",
            body: JSON.stringify(Body),
            headers: { "Content-Type": "application/json" }
        })).json())["AccessToken"];

        while (accessToken == null) {
            accessToken = (await (await fetch(URL, {
                method: "POST",
                body: JSON.stringify(Body),
                headers: { "Content-Type": "application/json" }
            })).json())["AccessToken"];
        }

        return accessToken;
    }

    async getPepperiClientAPI(webAPIBaseURL, accessToken) {
        const pepperi = ClientApi(async (params) => {
            const url = webAPIBaseURL + "/Service1.svc/v1/ClientApi/Execute";
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ Request: JSON.stringify(params) }),
                headers: {
                    "Content-Type": "application/json",
                    "PepperiSessionToken": accessToken
                }
            });
            const result = await response.json();
            if (result.Success) {
                // maybe check also result.Value success
                const jsonResponse = JSON.parse(result.Value);
                if (!jsonResponse.success) {
                    let error = jsonResponse.error.message.replace('does not exist', 'is not supported on Open Catalog');
                    throw new Error(error);
                }
                return jsonResponse;
            }
            else {
                throw new Error("Failed on client api");
            }
        });
        return pepperi;
    }

    async createTransaction(webAPIBaseURL, accessToken, pepperiClientAPI, atdID) {
        const userUUID = jwtDecode(this.client.OAuthAccessToken)['pepperi.useruuid'];
        const account = await this.papiClient.get('/accounts/ExternalID/' + userUUID);

        const accountURL = webAPIBaseURL + "/Service1.svc/v1/Account/" + account.UUID;
        const accountReload = await (await fetch(accountURL, {
            method: "GET",
            headers: {
                "PepperiSessionToken": accessToken,
                "Content-Type": "application/json"
            }
        })).json();
        const transaction = await pepperiClientAPI.app.transactions.add(
            {
                type: { InternalID: parseInt(atdID) },
                references: { account: { UUID: account.UUID } }
            }
        )
        return transaction.id;
    }
}

export default MyService;