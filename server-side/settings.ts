import MyService from './my.service';
import { Client, Request } from '@pepperi-addons/debug-server';
import fetch from "node-fetch";
import jwtDecode from "jwt-decode";
import { Guid } from "guid-typescript";
import ClientApi from "@pepperi-addons/client-api";
import { servicesVersion } from 'typescript';
import { FileStorage } from '@pepperi-addons/papi-sdk';

//#region public methods for client-side - called from the addon ui
export async function getOpenCatalogSettings(client: Client, request: Request) {
    try {
        console.log("start getOpenCatalogSettings");
        client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
        const service = new MyService(client);
        const OpenCatalogsResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').iter({ page_size: -1 }).toArray();
        const OpenCatalogsHistoryResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').iter({ page_size: -1 }).toArray();
        let OpenCatalogsHistory = new Array();
        OpenCatalogsResponse.forEach(OpenCatalog => {
            const latestVersions = OpenCatalogsHistoryResponse.filter(x => x.ActivityTypeDefinitionUUID == OpenCatalog.ATDUUID).sort((a, b) => (a.Version < b.Version) ? 1 : ((b.Version < a.Version) ? -1 : 0)).slice(0, 10);;
            OpenCatalogsHistory = OpenCatalogsHistory.concat(latestVersions);
        });
        const CatalgsResponse = await service.papiClient.catalogs.iter().toArray();
        const catalogs = CatalgsResponse.map(({ InternalID, ExternalID }) => ({ InternalID, ExternalID }));
        return {
            Success: true,
            OpenCatalogs: OpenCatalogsResponse,
            OpenCatalogsHistory: OpenCatalogsHistory,
            Catalogs: catalogs
        };
    }
    catch (error) {
        return {
            Success: false,
            ErrorMessage: error.message
        }
    }
}

export async function getPreviewTransaction(client: Client, request: Request) {
    try {
        console.log("start getPreviewTransaction");
        client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
        const service = new MyService(client);
        const atdID = request.body.atdID;
        const webAPIBaseURL = await service.getWebAPIBaseURL();
        const accessToken = await service.getAccessToken(webAPIBaseURL);
        const pepperiClientAPI = await service.getPepperiClientAPI(webAPIBaseURL, accessToken);
        const transactionUUID = await service.createTransaction(webAPIBaseURL, accessToken, pepperiClientAPI, atdID);
        return {
            Success: true,
            TransactionUUID: transactionUUID
        };
    }
    catch (error) {
        return {
            Success: false,
            ErrorMessage: "The open catalog is on synchronization process."
        }
    }
}

export async function createNewOpenCatalog(client: Client, request: Request) {
    try {
        console.log("start createNewOpenCatalog");
        client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
        const service = new MyService(client);
        const catalogID = request.body.catalogID;//'44690';
        const catalogName =request.body.catalogName;//'KOSHER';
        let atdID;

        // validate number of open catalogs
        const openCatalogsResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').iter().toArray();

        console.log("after OpenCatalogSettings");
        if (openCatalogsResponse.length >= 5) {
            console.log("Open Catalogs limit");
            return {
                Success: false,
                ErrorMessage: "You've reached the Open Catalogs limit. Please contact support for assistance."
            }
        }

        // create new atd
        const profiles = await service.papiClient.profiles.find({ where: "Name in ('Rep','Buyer','Admin')" });

        console.log("after profiles");
        const installedAddon = await service.papiClient.addons.installedAddons.addonUUID(client.AddonUUID).get();
        const baseAddonURL = installedAddon['PublicBaseURL'];
        console.log("baseAddonURL: " + baseAddonURL);
        const newAtdBody = {
            URL: `${baseAddonURL}template.json`,//"https://cdn.pepperi.com/1110703/CustomizationFile/4a315cde-adba-4647-9a1f-89379294fbf3/opencatalogtemplete.json",
            References: {
                "Mapping": [
                    {
                        "Origin": {
                            "ID": "75927",
                            "Type": "catalog",
                        },
                        "Destination": {
                            "ID": catalogID.toString(),
                            "Type": "catalog"
                        }
                    },
                    {
                        "Origin": { //rep
                            "ID": "67360",
                            "Name": "Rep",
                            "Type": "profile"
                        },
                        "Destination": {
                            "ID": (profiles.find(x => x.Name == 'Rep')?.InternalID || '').toString(),
                            "Name": "Rep",
                            "Type": "profile"
                        }
                    },
                    {
                        "Origin": { //admin
                            "ID": "67361",
                            "Name": "Admin",
                            "Type": "profile"
                        },
                        "Destination": {
                            "ID": (profiles.find(x => x.Name == 'Admin')?.InternalID || '').toString(),
                            "Name": "Admin",
                            "Type": "profile"
                        }
                    },
                    {
                        "Origin": { //buyer
                            "ID": "67362",
                            "Name": "Buyer",
                            "Type": "profile"
                        },
                        "Destination": {
                            "ID": (profiles.find(x => x.Name == 'Buyer')?.InternalID || '').toString(),
                            "Name": "Buyer",
                            "Type": "profile"
                        }
                    }
                ]
            }
        };

        console.log("newAtdBody: " + JSON.stringify(newAtdBody));

        const newAtdResponse = await service.papiClient.post('/addons/api/async/e9029d7f-af32-4b0e-a513-8d9ced6f8186/api/import_type_definition?type=transactions', newAtdBody);

        console.log("after import_type_definition");
        let updateAtdNameResponse: any;

        try{
            const auditLogUUID = newAtdResponse.ExecutionUUID;

            console.log("auditLogUUID: " + newAtdResponse.ExecutionUUID);

            let statusResponse = await service.papiClient.get('/audit_logs/' + auditLogUUID);

            console.log("statusResponse.Status.Name: " + statusResponse.Status.Name);

            while (statusResponse == undefined || statusResponse.Status.Name == 'New' || statusResponse.Status.Name == 'InProgress' || statusResponse.Status.Name == 'Started') {
                await sleep(1000);
                statusResponse = await service.papiClient.get('/audit_logs/' + auditLogUUID);
            }
            if (statusResponse.Status.Name == 'Success') {
                console.log("after response from audit_logs");
                atdID = JSON.parse(statusResponse.AuditInfo.ResultObject).InternalID;
            }
            else {
                console.log("failed response from audit_logs");
                throw new Error(statusResponse.AuditInfo.ErrorMessage);
            }

            const updateAtdNameBody = {
                InternalID: atdID,
                ExternalID: `Open Catalog ${atdID}`,
                Description: `Open Catalog Synchronization To Elastic`
            };

            //const updateAtdNameResponse = await service.papiClient.post('/meta_data/transactions/types', updateAtdNameBody);
            updateAtdNameResponse = await service.papiClient.post('/meta_data/transactions/types', updateAtdNameBody);
            console.log("after transactions types");

        }   
        catch(error){
            console.log(error);
        }

        
        // save new atd settings on adal
        let accessKey : any;
        try{
            //const accessKey = await createAccessKey(client, service, updateAtdNameResponse.InternalID);
             accessKey = await createAccessKey(client, service, updateAtdNameResponse.InternalID);
        }
        catch(error){
            console.log("failed createAccessKey");
        }

        console.log("after createAccessKey");

        const settingsBody = {
            Key: updateAtdNameResponse.InternalID.toString(),
            OpenCatalogName: updateAtdNameResponse.ExternalID,
            CatalogID: catalogID,
            CatalogName: catalogName,
            ATDName: updateAtdNameResponse.ExternalID,
            ATDUUID: updateAtdNameResponse.UUID.toString().toLowerCase(),
            AccessKey: accessKey,
            LatestVersion: 0,
            PublishVersion: "",
            RollbackVersion: "",
            PublishMode: true,
            LastPublishDate: (new Date(Date.now())).toISOString()
        };
        const settingsResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').upsert(settingsBody);

        console.log("after upsert OpenCatalogSettings");

        return { Success: true, OpenCatalog: settingsResponse };
    }
    catch (error) {
        console.log(error);
        return {
            Success: false,
            ErrorMessage: error.message
        }
    }
}

export async function addNewOpenCatalog(client: Client, request: Request) {
    try {
        console.log("start addNewOpenCatalog");
        client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
        const service = new MyService(client);
        const atdID = request.query.atdID;

        const atdBody = {
            InternalID: atdID
        };
        const atdResponse = await service.papiClient.post('/meta_data/transactions/types', atdBody);

        const atdSettings = await service.papiClient.metaData.type('transactions').types.subtype(atdID).settings.get();
        const catalog = atdSettings.CatalogIDs[0];
        const catalogSettings = await service.papiClient.catalogs.get(catalog);

        // save new atd settings on adal
        const accessKey = await createAccessKey(client, service, atdID);
        const settingsBody = {
            Key: atdID.toString(),
            OpenCatalogName: atdResponse.ExternalID,
            CatalogID: catalogSettings["InternalID"],
            CatalogName: catalogSettings["ExternalID"],
            ATDName: atdResponse.ExternalID,
            ATDUUID: atdResponse.UUID.toString().toLowerCase(),
            AccessKey: accessKey,
            LatestVersion: 0,
            PublishVersion: "",
            RollbackVersion: "",
            PublishMode: true,
            LastPublishDate: (new Date(Date.now())).toISOString()
        };
        const settingsResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').upsert(settingsBody);
        return { Success: true, OpenCatalog: settingsResponse };
    }
    catch (error) {
        return {
            Success: false,
            ErrorMessage: error.message
        }
    }
}

export async function getOpenCatalogVersionData(client: Client, request: Request) {
    try {
        console.log("start getOpenCatalogVersionData");
        client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
        const service = new MyService(client);
        const atdUUID = request.body.atdUUID;
        const version = request.body.version;
        const key = `${atdUUID}_${version}`;
        const dataTableResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').key(key).get();
        return { Success: true, OpenCatalogData: dataTableResponse };
    }
    catch (error) {
        return {
            Success: false,
            ErrorMessage: error.message
        }
    }
}

export async function saveOpenCatalogName(client: Client, request: Request) {
    try {
        console.log("start saveOpenCatalogName");
        client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
        const service = new MyService(client);
        const atdID = request.body.atdID;
        const openCatalogName = request.body.openCatalogName;
        const settingsBody = {
            Key: atdID.toString(),
            OpenCatalogName: openCatalogName
        };
        const settingsResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').upsert(settingsBody);
        return { Success: true };
    }
    catch (error) {
        return {
            Success: false,
            ErrorMessage: error.message
        }
    }
}

export async function deleteOpenCatalog(client: Client, request: Request) {
    try {
        console.log("start deleteOpenCatalog");
        client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
        const service = new MyService(client);
        const atdID = request.body.atdID;
        const atdUUID = request.body.atdUUID;
        const accessKey = request.body.accessKey;
        const atdKey = decryptAtdSecret(accessKey);

        // delete atd
        const orders = await service.papiClient.get(`/transactions?where=ActivityTypeID=${atdID}`);
        let batchBody = new Array();
        orders.forEach(order => {
            batchBody.push({ "InternalID": order.InternalID, "Hidden": true })
        });
        const batchResponse = await service.papiClient.post('/batch/transactions', batchBody)

        const atdBody = {
            InternalID: atdID,
            Hidden: true
        };
        const atdResponse = await service.papiClient.post('/meta_data/transactions/types', atdBody);

        // delete open catalog from list of open catalogs
        const settingsBody = {
            Key: atdID.toString(),
            Hidden: true
        };
        const settingsResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').upsert(settingsBody);

        // delete open catalog secret access
        const secretBody = {
            Key: atdKey.toString(),
            ElasticSearchSubType: "",
            Hidden: true
        };
        const secretResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSecret').upsert(secretBody);

        // delete data from elasticsearch
        const elasticBody = {};
        elasticBody["query"] = { "bool": { "must": { "query_string": { "query": `${atdUUID}_*`, "fields": ["ElasticSearchSubType"] } } } };
        const elasticResponse = await service.papiClient.post("/elasticsearch/delete/open_catalog", elasticBody);

        return { Success: true };
    }
    catch (error) {
        return {
            Success: false,
            ErrorMessage: error.message
        }
    }
}

export async function stopPublishOpenCatalog(client: Client, request: Request) {
    try {
        console.log("start stopPublish");
        client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
        const service = new MyService(client);
        const atdID = request.body.atdID;
        const atdUUID = request.body.atdUUID;
        let version = (await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').key(atdID).get())["LatestVersion"];
        const elasticSearchSubType = `${atdUUID}_${version}`;
        const bodyDataTable = {
            Key: elasticSearchSubType,
            StopPublish: true,
            Status: 'Stopped'
        };
        const responseDataTable = await updateAdalTable(client, 'OpenCatalogData', bodyDataTable);

        const settingsBody = {
            Key: atdID,
            PublishMode: true
        };
        const settingsResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').upsert(settingsBody);
        return { Success: true };
    }
    catch (error) {
        return {
            Success: false,
            ErrorMessage: error.message
        }
    }
};

export async function publishOpenCatalog(client: Client, request: Request) {
    try {
        console.log("start publishOpenCatalog");
        client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
        const service = new MyService(client);
        const jwt = jwtDecode(client.OAuthAccessToken)["pepperi.id"];
        const user = await service.papiClient.users.get(jwt);
        let publishedBy = `${user["FirstName"]} ${user["LastName"]}`;
        publishedBy = publishedBy.includes("SupportAdminUser") ? "Automatically" : publishedBy;
        const atdID = request.body.atdID;
        const atdSecret = request.body.atdSecret;
        const comment = request.body.comment;
        const atdUUID = (await service.papiClient.metaData.type('transactions').types.subtype(atdID).get()).UUID;
        const preVersion = (await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').key(atdID).get())["LatestVersion"];
        const version = parseInt(preVersion) + 1;
        const elasticSearchSubType = `${atdUUID}_${version}`;

        const bodySettings = {
            Key: atdID,
            LatestVersion: version,
            PublishMode: false
        };
        const responseSettings = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').upsert(bodySettings);

        const bodyUpdteVersion = {
            Key: elasticSearchSubType,
            ActivityTypeDefinitionUUID: atdUUID,
            Version: version,
            Status: 'Prepare Items',
            Comment: comment,
            PublishedBy: publishedBy
        };
        const responsUpdateVersion = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').upsert(bodyUpdteVersion);

        const publishBody = {
            elasticSearchSubType: elasticSearchSubType,
            atdID: atdID,
            atdSecret: atdSecret
        }
        const auditLog = await service.papiClient.post(`/addons/api/async/${client.AddonUUID}/publish/publishNewVersion`, publishBody);
        return { Success: true, ExecutionUUID: auditLog.ExecutionUUID, ElasticSearchSubType: elasticSearchSubType, OpenCatalog: responseSettings };
    }
    catch (error) {
        return {
            Success: false,
            ErrorMessage: error.message
        }
    }
};

export async function revokeAccessKey(client: Client, request: Request) {
    try {
        console.log("start revokeAccessKey");
        const service = new MyService(client);
        let oldAccessKey = request.body.accessKey;
        let atdID = request.body.atdID;
        let newAccessKey;
        if (oldAccessKey == undefined) {
            throw new Error('accessKey is requeired')
        }
        else {
            // update old secret to point nothing
            let oldAtdKey = decryptAtdSecret(oldAccessKey);
            let elasticSearchSubType = (await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSecret').key(oldAtdKey).get())["ElasticSearchSubType"];
            const bodyOldOpenCatalogSecret = {
                Key: oldAtdKey,
                ElasticSearchSubType: ''
            };
            const responseOldOpenCatalogSecret = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSecret').upsert(bodyOldOpenCatalogSecret);

            // create new secret to point to open catalog
            const NewAtdKey = Guid.create()["value"];
            const bodyNewOpenCatalogSecret = {
                Key: NewAtdKey,
                ElasticSearchSubType: elasticSearchSubType
            };
            const responseNewOpenCatalogSecret = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSecret').upsert(bodyNewOpenCatalogSecret);
            newAccessKey = await encryptAtdSecret(service, NewAtdKey);
            const bodySettings = {
                Key: atdID,
                AccessKey: newAccessKey,
            };
            const responseSettings = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').upsert(bodySettings);
        }
        return {
            Success: true,
            AccessKey: newAccessKey
        };
    }
    catch (error) {
        return {
            Success: false,
            ErrorMessage: error.message
        }
    }
}

//#endregion

//#region private methods
async function createAccessKey(client, service, atdID) {
    console.log("start createAccessKey");
    const atdKey = Guid.create()["value"];
    const accessKey = await encryptAtdSecret(service, atdKey);

    const bodyNewOpenCatalogSecret = {
        Key: atdKey,
        ElasticSearchSubType: ''
    };
    const responsNewVersion = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSecret').upsert(bodyNewOpenCatalogSecret);
    return accessKey;
}

async function encryptAtdSecret(service, atdKey) {
    const supportUserInternalID = (await service.papiClient.get('/distributor')).SupportAdminUser.ID;
    const supportUserUUID = (await service.papiClient.get(`/users/${supportUserInternalID}`)).UUID;
    const atdSecretObject = { a: "00000000-0000-0000-0000-00000ca7a109", u: supportUserUUID, k: atdKey };
    return Buffer.from(JSON.stringify(atdSecretObject)).toString('base64');
}

function decryptAtdSecret(atdSecret) {
    const atdSecretDecrypt = JSON.parse(Buffer.from(atdSecret, 'base64').toString());
    return atdSecretDecrypt.k;
}

async function updateAdalTable(client, tableName, tableBody) {
    const service = new MyService(client);
    const response = await service.papiClient.addons.data.uuid(client.AddonUUID).table(tableName).upsert(tableBody);
    return response;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

//#endregion