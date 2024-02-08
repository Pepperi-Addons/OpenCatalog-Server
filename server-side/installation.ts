
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server';
import { AddonDataScheme } from '@pepperi-addons/papi-sdk';
import MyService from './my.service';
import { OpenCatalogMapping } from './open-catalog-mapping';
import jwtDecode from "jwt-decode";

export async function install(client: Client, request: Request): Promise<any> {

    try {
        const service = new MyService(client);
        const headers = {
            "X-Pepperi-OwnerID": client.AddonUUID,
            "X-Pepperi-SecretKey": client.AddonSecretKey
        }

        // create schemas on adal - 
        // OpenCatalogSettings for list of open catalogs
        // OpenCatalogSecret for each open catalog his published version and secret key
        // OpenCatalogData for document each publish on open catalogs
        const bodySettingsTable: AddonDataScheme = {
            Name: 'OpenCatalogSettings',
            Type: 'meta_data'
        };
        const bodySecretTable: AddonDataScheme = {
            Name: 'OpenCatalogSecret',
            Type: 'meta_data'
        };
        const bodyDataTable: AddonDataScheme = {
            Name: 'OpenCatalogData',
            Type: 'meta_data'
        };
        const bodyScheduleJob: AddonDataScheme = {
            Name: 'OpenCatalogScheduleJob',
            Type: 'meta_data'                    
        }

        const responseSettingsTable = await service.papiClient.post('/addons/data/schemes', bodySettingsTable, headers);
        const responseSecretTable = await service.papiClient.post('/addons/data/schemes', bodySecretTable, headers);
        const responseDataTable = await service.papiClient.post('/addons/data/schemes', bodyDataTable, headers);
        const responseScheduleJob = await service.papiClient.post('/addons/data/schemes', bodyScheduleJob, headers);

        // PNS subscribe to adal changes 
        // When an entry of open catalog is purged we need to delete the index from elastic 
        const bodyPNS = {
            Name: 'DeleteVersionFromElasticSearch',
            AddonRelativeURL: '/publish/deleteVersionFromElasticSearch',
            AddonUUID: '00000000-0000-0000-0000-00000ca7a109',
            Type: 'data',
            FilterPolicy: { Action: ["remove"], Resource: ["OpenCatalogData"], AddonUUID: ['00000000-0000-0000-0000-00000ca7a109'] },
            Hidden: false
        };
        await service.papiClient.post('/notification/subscriptions', bodyPNS, headers);

        const distributorUuid = jwtDecode(client.OAuthAccessToken)['pepperi.distributoruuid'];
        await service.papiClient.post(`/addons/api/00000000-0000-0000-0000-00000e1a571c/internal/create_index?index_name=oc-${distributorUuid}`, OpenCatalogMapping.mappingOpenCatalog, headers);

        return { success: true, resultObject: {} }
    }
    catch (ex) {
        assertIsError(ex);    
        return { success: false, resultObject: { "Message": ex.message } }
    }

}

export async function uninstall(client: Client, request: Request): Promise<any> {
    const service = new MyService(client);
    var headers = {
        "X-Pepperi-OwnerID": client.AddonUUID,
        "X-Pepperi-SecretKey": client.AddonSecretKey
    }

    // delete schemas on adal
    const responseSettingsTable = await service.papiClient.post('/addons/data/schemes/OpenCatalogSettings/purge', null, headers);
    const responseSecretTable = await service.papiClient.post('/addons/data/schemes/OpenCatalogSecret/purge', null, headers);
    const responseDataTable = await service.papiClient.post('/addons/data/schemes/OpenCatalogData/purge', null, headers);
    const responseScheduleJob = await service.papiClient.post('/addons/data/schemes/OpenCatalogScheduleJob/purge', null, headers);

    // PNS unsubscribe 
    const bodyPNS = {
        Name: 'DeleteVersionFromElasticSearch',
        Hidden: true,
        AddonUUID: "00000000-0000-0000-0000-00000ca7a109"
    };
    const responsePNS = await service.papiClient.post('/notification/subscriptions', bodyPNS, headers);
    const distributorUuid = jwtDecode(client.OAuthAccessToken)['pepperi.distributoruuid'];
    await service.papiClient.post(`/addons/api/00000000-0000-0000-0000-00000e1a571c/internal/delete_index?index_name=oc-${distributorUuid}`, null, headers);

    return { success: true, resultObject: {} }
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    const service = new MyService(client);
    // PNS subscribe to adal changes 
    const bodyPNS = {
        Name: 'DeleteVersionFromElasticSearch',
        AddonRelativeURL: '/publish/deleteVersionFromElasticSearch',
        AddonUUID: '00000000-0000-0000-0000-00000ca7a109',
        Type: 'data',
        FilterPolicy: { Action: ["remove"], Resource: ["OpenCatalogData"], AddonUUID: ['00000000-0000-0000-0000-00000ca7a109'] },
        Hidden: false
    };
    const headersPNS = {
        "X-Pepperi-OwnerID": client.AddonUUID,
        "X-Pepperi-SecretKey": client.AddonSecretKey
    }
    const responsePNS = await service.papiClient.post('/notification/subscriptions', bodyPNS, headersPNS); 
    
  //creates table if it doesn't exist - DI-23815
  try {
    await service.papiClient.get(`/addons/data/schemes/OpenCatalogScheduleJob`);
  } catch {
    const headers = {
      "X-Pepperi-OwnerID": client.AddonUUID,
      "X-Pepperi-SecretKey": client.AddonSecretKey,
    };
    const bodyScheduleJob: AddonDataScheme = {
      Name: "OpenCatalogScheduleJob",
      Type: "meta_data",
    };
    await service.papiClient.post(
      "/addons/data/schemes",
      bodyScheduleJob,
      headers
    );
  }

    return { success: true, resultObject: {} }
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return { success: true, resultObject: {} }
}

export async function token(client: Client, request: Request): Promise<any> {
    const service = new MyService(client);
    client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
    const catalogSecret = request.query.addon_secret;
    let responseADAL = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSecret').key(catalogSecret).get();
    const claims = {
        'pepperi.addonkey': responseADAL['ElasticSearchSubType']
    };
    return { success: true, claims: claims }
}

function assertIsError(error: unknown): asserts error is Error {   
    if (!(error instanceof Error)) {
        throw error
    }
}


