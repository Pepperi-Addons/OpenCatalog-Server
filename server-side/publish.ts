import MyService from './my.service';
import { Client, Request } from '@pepperi-addons/debug-server';
import fetch from "node-fetch";
import jwtDecode from "jwt-decode";
import { Guid } from "guid-typescript";
import ClientApi from "@pepperi-addons/client-api";
import { servicesVersion } from 'typescript';
import { FileStorage } from '@pepperi-addons/papi-sdk';

//#region public methods for publish open catalog flow
export async function publishNewVersion(client: Client, request: Request) {
    console.log("start publishNewVersion");
    client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
    const service = new MyService(client);
    const atdID = request.body.atdID;
    const atdSecret = request.body.atdSecret;
    const elasticSearchSubType = request.body.elasticSearchSubType;

    try {
        let atdKey = await getAtdKey(service, atdSecret);
        const webAPIBaseURL = await service.getWebAPIBaseURL();
        const accessToken = await service.getAccessToken(webAPIBaseURL);
        await validateSyncStatus(webAPIBaseURL, accessToken);
        const pepperiClientAPI = await service.getPepperiClientAPI(webAPIBaseURL, accessToken);
        // create new version
        await createNewVersion(client, webAPIBaseURL, accessToken, pepperiClientAPI, atdID, elasticSearchSubType);
        // create item category relations
        const populateNewVersionBody = {
            webAPIBaseURL: webAPIBaseURL,
            accessToken: accessToken,
            atdID: atdID,
            atdKey: atdKey,
            elasticSearchSubType: elasticSearchSubType,
            index: 0
        };
        service.papiClient.post("/addons/api/async/" + client.AddonUUID + "/publish/populateNewVersion", populateNewVersionBody);
        return;
    }
    catch (error) {
        let status = `Failed - ${error.message}`;
        if (error.message.includes('Stopped')) {
            status = error.message;
        }

        const bodyDataTable = {
            Key: elasticSearchSubType,
            Status: status
        };
        const responseDataTable = await updateAdalTable(client, 'OpenCatalogData', bodyDataTable);

        const bodySettingsTable = {
            Key: atdID,
            PublishMode: true
        };
        const responseSettingsTable = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').upsert(bodySettingsTable);
    }
};

export async function populateNewVersion(client: Client, request: Request) {
    console.log("start populateNewVersion");
    client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
    const service = new MyService(client);
    const webAPIBaseURL = request.body.webAPIBaseURL;
    const accessToken = request.body.accessToken;
    const atdID = request.body.atdID;
    const atdKey = request.body.atdKey;
    const elasticSearchSubType = request.body.elasticSearchSubType;
    try {
        const index = parseInt(request.body.index);
        await validateStopPublishOpenCatalog(client, service, elasticSearchSubType);
        const versionData = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').key(elasticSearchSubType).get();
        let flattenedCategory;
        let categoriesTreeLength;
        await fetch(versionData["FlattenedCategoriesTree"], {
            method: `GET`
        })
            .then((response) => response.json())
            .then((data) => {
                flattenedCategory = data[index];
                categoriesTreeLength = data.length;
            });

        if (index < categoriesTreeLength) {
            const nextIndex = index + 1;
            if (nextIndex == categoriesTreeLength) {
                await uploadItemsCategory(client, webAPIBaseURL, accessToken, versionData["TransactionUUID"], flattenedCategory);
                await uploadNewVersion(client, atdID, atdKey, elasticSearchSubType);
            }
            else {
                await uploadItemsCategory(client, webAPIBaseURL, accessToken, versionData["TransactionUUID"], flattenedCategory);
                const bodyDataTable = {
                    Key: elasticSearchSubType,
                    Status: `Categories ${(nextIndex + 1)}/${categoriesTreeLength}`
                };
                const responseDataTable = await updateAdalTable(client, 'OpenCatalogData', bodyDataTable);
                const populateNewVersionBody = {
                    webAPIBaseURL: webAPIBaseURL,
                    accessToken: accessToken,
                    atdID: atdID,
                    atdKey: atdKey,
                    elasticSearchSubType: elasticSearchSubType,
                    index: nextIndex
                };
                service.papiClient.post("/addons/api/async/" + client.AddonUUID + "/publish/populateNewVersion", populateNewVersionBody);
            }
        }
    }
    catch (error) {
        let status = `Failed - ${error.message}`;
        if (error.message.includes('Stopped')) {
            status = error.message;
        }
        const bodyDataTable = {
            Key: elasticSearchSubType,
            Status: status
        };
        const responseDataTable = await updateAdalTable(client, 'OpenCatalogData', bodyDataTable);

        const bodySettingsTable = {
            Key: atdID,
            PublishMode: true
        };
        const responseSettingsTable = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').upsert(bodySettingsTable);
    }

}

export async function deleteVersionFromElasticSearch(client: Client, request: Request) {
    console.log("start deleteVersionFromElasticSearch");
    const service = new MyService(client);
    request.body.Message.ModifiedObjects.forEach(async pnsObject => {
        const version = pnsObject["ObjectKey"];
        // delete the previous rollback version from ElasticSearch
        console.log(`deleteVersionFromElasticSearch - delete version ${version}`);
        const elasticBody = {};
        elasticBody["query"] = { "bool": { "must": { "terms": { "ElasticSearchSubType": [`${version}`] } } } };
        const elasticResponse = await service.papiClient.post("/elasticsearch/delete/open_catalog", elasticBody);
    });

    return;
}

export async function uploadNewVersion(client, atdID, atdKey, elasticSearchSubType) {
    console.log("start uploadNewVersion");
    client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
    const service = new MyService(client);
    const openCatalogDataBody = {
        Key: elasticSearchSubType,
        Status: 'Done'
    };
    const openCatalogDataResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').upsert(openCatalogDataBody);

    // update open catalog secret to point on the new published version
    const openCatalogSecretBody = {
        Key: atdKey,
        ElasticSearchSubType: elasticSearchSubType
    };
    const openCatalogSecretResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSecret').upsert(openCatalogSecretBody);

    // change on the settings the pointing of the published and rollback version
    const openCatalogSettings = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').key(atdID).get();
    const preRollbackVersion = openCatalogSettings["RollbackVersion"];
    const postRollbackVersion = openCatalogSettings["PublishVersion"];
    const openCatalogSettingsBody = {
        Key: atdID,
        PublishVersion: elasticSearchSubType,
        RollbackVersion: postRollbackVersion,
        LastPublishDate: (new Date(Date.now())).toISOString(),
        PublishMode: true
    };
    const openCatalogSettingsResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSettings').upsert(openCatalogSettingsBody);

    // put an expirationDateTime of a month on it, change configuration file to hidden
    /*     const elasticBody = {};
        elasticBody["query"]={"bool":{ "must":{"terms":{"ElasticSearchSubType":[`${preRollbackVersion}`]}}}};
        const elasticResponse = await service.papiClient.post("/elasticsearch/delete/open_catalog",elasticBody); */

    // Set the previous version expires in a month
    // If this is the first time, the key is empty, so there is no reason to expire a non-existent version
    if (preRollbackVersion) {
        const openCatalogPreRollbackDataBody = {
            Key: preRollbackVersion,
            ExpirationDateTime: getExpirationDateTime()
        };
        const openCatalogPreRollbackDataResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').upsert(openCatalogPreRollbackDataBody);

        if (openCatalogPreRollbackDataResponse["ConfigurationsID"]) {
            const fileStorageBody: FileStorage = {
                InternalID: openCatalogPreRollbackDataResponse["ConfigurationsID"],
                Title: "configurations",
                FileName: "configurations.json",
                Hidden: true
            };
            const fileStorageResponse = await service.papiClient.fileStorage.upsert(fileStorageBody);
        }
    }
}

//#region private methods

async function getAtdKey(service, atdSecret) {
    let atdKey;
    if (atdSecret == undefined) {
        throw new Error('atdSecret is requeired')
    }
    else {
        atdKey = decryptAtdSecret(atdSecret);
    }
    return atdKey;
}

async function createNewVersion(client, webAPIBaseURL, accessToken, pepperiClientAPI, atdID, elasticSearchSubType) {
    const service = new MyService(client);
    await validateStopPublishOpenCatalog(client, service, elasticSearchSubType);

    const transactionUUID = await service.createTransaction(webAPIBaseURL, accessToken, pepperiClientAPI, atdID);
    const bodyUpdteVersion = {
        Key: elasticSearchSubType,
        TransactionUUID: transactionUUID,
        Status: 'Prepare Items'
    };
    const responsUpdateVersion = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').upsert(bodyUpdteVersion);

    let indexedFields = new Array();
    let nonIndexedFields = new Array();
    let fields = new Array();
    const dataViews = await getDataViews(service, atdID, indexedFields, nonIndexedFields, fields);

    await uploadBaseItems(client, pepperiClientAPI, elasticSearchSubType, fields, indexedFields, nonIndexedFields, transactionUUID, atdID);
    const bodyDataTable = {
        Key: elasticSearchSubType,
        Status: `Prepare Categories`
    };
    const DataTableResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').upsert(bodyDataTable);

    const categoriesTree = await createCategoriesTree(webAPIBaseURL, accessToken, transactionUUID);
    await validateStopPublishOpenCatalog(client, service, elasticSearchSubType);
    const flattenedCategories = await getflattenedCategories(client, categoriesTree);
    const currency = await getCurrency(pepperiClientAPI, transactionUUID);
    const configurationsFile = await getConfigurationsFile(client, dataViews, categoriesTree, flattenedCategories.File["DownloadURL"], currency);
    const bodyNewVersionConfigurations = {
        Key: elasticSearchSubType,
        ConfigurationsID: configurationsFile.InternalID,
        ConfigurationsURL: configurationsFile.URL,
        FlattenedCategoriesTree: flattenedCategories.File["DownloadURL"],
        Status: `Categories 1/${flattenedCategories.Count}`
    };
    const responseNewVersionConfigurations = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').upsert(bodyNewVersionConfigurations);

    return elasticSearchSubType;
}

async function getDataViews(service, atdID, indexedFields, nonIndexedFields, fields) {

    const atdDataViews = await service.papiClient.metaData.dataViews.iter({ where: `Context.Object.InternalID=${atdID} and Context.Profile.Name=Rep` }).toArray();
    const indexedDataviewsOptions = ["SmartSearch", "OrderCenterView1", "OrderCenterView3", "OrderCenterUserSort", "OrderCenterSearch"];
    const nonIndexedDataviewsOptions = ["OrderCenterItemDetails"];
    const nonDisplayDataviewsOptions = ["OrderViewsMenu"];

    validateDataViews(atdDataViews);

    let indexedDataviews = atdDataViews.filter(dv => indexedDataviewsOptions.includes(dv.Context.Name));
    let nonIndexedDataviews = atdDataViews.filter(dv => nonIndexedDataviewsOptions.includes(dv.Context.Name));
    let nonDisplayDataviews = atdDataViews.filter(dv => nonDisplayDataviewsOptions.includes(dv.Context.Name));

    const dataViews = indexedDataviews.concat(nonIndexedDataviews).concat(nonDisplayDataviews);

    indexedDataviews.forEach(dataView => {
        dataView.Fields?.forEach(field => {
            if (!fields.includes(field.FieldID)) {
                indexedFields.push({ "APIName": field.FieldID, "Type": field["Type"] });
                fields.push(field.FieldID);
            }
        });
    });

    nonIndexedDataviews.forEach(dataView => {
        dataView.Fields?.forEach(field => {
            if (!fields.includes(field.FieldID)) {
                nonIndexedFields.push({ "APIName": field.FieldID, "Type": field["Type"] });
                fields.push(field.FieldID);
            }
            else {
                let updatefield = indexedFields.find(x => x.APIName == field.FieldID);
                if (updatefield) {
                    updatefield.Type = field["Type"];
                }
            }
        });
    });

    if (!indexedFields.some(x => x.APIName == "ItemUUID")) {
        if (nonIndexedFields.some(x => x.APIName == "ItemUUID")) {
            nonIndexedFields = nonIndexedFields.filter(x => x.APIName != "ItemUUID");
        }
        else {
            fields.push("ItemUUID");
        }
        indexedFields.push({ "APIName": "ItemUUID", "Type": "TextBox" });
    }

    // create needed mapping for export
    // set mapping of image type fields not indexed
    let ImageType = ["Image", "ImageURL", "Images"];
    let imageFields = indexedFields.filter(x => ImageType.includes(x.Type));
    await setImageFieldsMapping(service, imageFields);
    //

    return dataViews;
}

async function createCategoriesTree(webAPIBaseURL, accessToken, transactionUUID) {
    const sourceTabsURL = webAPIBaseURL + "/Service1.svc/v1/OrderCenter/Transaction/" + transactionUUID + "/Tabs";
    const sourceTabsBody = { "DefaultTabID": "-1" };
    const sourceTabs = (await (await fetch(sourceTabsURL, {
        method: "POST",
        body: JSON.stringify(sourceTabsBody),
        headers: {
            "PepperiSessionToken": accessToken,
            "Content-Type": "application/json"
        }
    })).json())["TabList"];

    // foreach all tabs
    await recurseionTree(webAPIBaseURL, accessToken, sourceTabs, transactionUUID, new Array());
    return sourceTabs;
}

async function recurseionTree(webAPIBaseURL, accessToken, sourceTabs, transactionUUID, path, parentUUID?) {
    if (sourceTabs.length == 0) {
        return;
    }
    else {
        let i = 0;
        for (i = 0; i < sourceTabs.length; i++) {
            const subTabsURL = webAPIBaseURL + "/Service1.svc/v1/OrderCenter/Transaction/" + transactionUUID + "/SubTabs";
            let subTabsBody = { TabID: sourceTabs[i].UID }
            let subTabs = await (await fetch(subTabsURL, {
                method: "POST",
                body: JSON.stringify(subTabsBody),
                headers: {
                    "PepperiSessionToken": accessToken,
                    "Content-Type": "application/json"
                }
            })).json();

            let innerPath = JSON.parse(JSON.stringify(path));;
            innerPath.push(sourceTabs[i]["Name"]);
            let uuid = Guid.create()["value"];
            sourceTabs[i]["Nodes"] = subTabs["TabList"];
            sourceTabs[i]["Path"] = innerPath;
            sourceTabs[i]["UUID"] = uuid;
            sourceTabs[i]["ParentUUID"] = parentUUID ? parentUUID : "";
            delete sourceTabs[i].SubTabs;
            await recurseionTree(webAPIBaseURL, accessToken, sourceTabs[i]["Nodes"], transactionUUID, innerPath, uuid);
        }
    }
}

async function getflattenedCategories(client, categoriesTree) {
    const service = new MyService(client);
    const flattenedCategoriesTree = new Array();
    flatTree({ "Nodes": categoriesTree }, flattenedCategoriesTree);

    if (flattenedCategoriesTree.length == 0) {
        throw new Error("There are no categories on this catalog")
    }
    else if (flattenedCategoriesTree.length > 4000) {
        throw new Error("There are more then 4000 categories on this catalog")
    }

    const flattenedCategoriesTreeFile = await service.papiClient.post("/file_storage/tmp");
    await fetch(flattenedCategoriesTreeFile["UploadURL"], {
        method: "PUT",
        body: JSON.stringify(flattenedCategoriesTree),
        headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" }
    });
    return {
        File: flattenedCategoriesTreeFile,
        Count: flattenedCategoriesTree.length
    };
}

async function uploadBaseItems(client, pepperiClientAPI, elasticSearchSubType, fields, indexedFields, nonIndexedFields, transactionUUID, atdID) {
    const service = new MyService(client);
    let itemsCount = (await pepperiClientAPI.api.transactionScopeItems.search({
        fields: ["ItemUUID"],
        transaction: { UUID: transactionUUID },
        createTransactionScope: true,
        pageSize: 0
    })).count;

    const atdTransactionLinesFields = await service.papiClient.metaData.type('transaction_lines').types.subtype(atdID.toString()).fields.get();
    const atdItemsFields = await service.papiClient.metaData.type('items').fields.get();
    const atdFields = atdTransactionLinesFields.concat(atdItemsFields);

    let StringType = ["TextBox", "LimitedLengthTextBox", "TextArea", "TextHeader", "Address", "Email", "CalculatedString", "MapDataString", "Phone", "MultiTickBox", "RichTextHTML", "Image", "ImageURL", "Images"];
    let NumberType = ["NumberInteger", "NumberReal", "Currency", "Percentage", "CalculatedReal", "CalculatedInt", "MapDataReal", "MapDataInt"];
    let BoolType = ["Boolean", "LimitedLengthTextBox", "TextArea", "TextHeader", "CalculatedBool"];
    let DateType = ["Date", "DateAndTime", "LimitedDate", "CalculatedDate"];

    let NonIndexedStringFields = new Array();
    let NonIndexedNumberFields = new Array();
    let NonIndexedBoolFields = new Array();
    let NonIndexedDateFields = new Array();

    // new code
    let multiTickBoxFields = (indexedFields.concat(nonIndexedFields)).filter(x => x.Type == "MultiTickBox");

    nonIndexedFields.forEach(field => {
        let atdField = atdFields.find(x => x.FieldID == field.APIName);
        switch (atdField?.Format) {
            case 'String':
            case 'Guid':
                NonIndexedStringFields.push(field.APIName);
                break;
            case "Int16":
            case "Int32":
            case "Int64":
            case "Double":
            case "Decimal":
                NonIndexedNumberFields.push(field.APIName);
                break;
            case "DateTime":
                NonIndexedDateFields.push(field.APIName);
                break;
            case "Boolean":
                NonIndexedBoolFields.push(field.APIName);
                break;
            default:
                if (StringType.includes(field.Type)) {
                    NonIndexedStringFields.push(field.APIName);
                }
                else if (NumberType.includes(field.Type)) {
                    NonIndexedNumberFields.push(field.APIName);
                }
                else if (BoolType.includes(field.Type)) {
                    NonIndexedBoolFields.push(field.APIName);
                }
                else if (DateType.includes(field.Type)) {
                    NonIndexedDateFields.push(field.APIName);
                }
                else {
                    fields = fields.filter(x => x != field.APIName);
                }
                break;
        };
    });

    let IgnoreTypes = ["InternalLink", "Separator", "Indicators"];
    indexedFields.forEach(field => {
        if (IgnoreTypes.includes(field.Type)) {
            fields = fields.filter(x => x != field.APIName);
        }
    });
    nonIndexedFields.forEach(field => {
        if (IgnoreTypes.includes(field.Type)) {
            fields = fields.filter(x => x != field.APIName);
        }
    });

    const pagesCount = Math.ceil(itemsCount / 500);
    const fileStorage = await service.papiClient.post("/file_storage/tmp");
    let i;
    let itemsPage;
    for (i = 1; i <= pagesCount; i++) {
        await validateStopPublishOpenCatalog(client, service, elasticSearchSubType);
        itemsPage = (i - 1) * 500;
        const bodyDataTable = {
            Key: elasticSearchSubType,
            Status: `Items ${itemsPage}/${itemsCount}`
        };
        const DataTableResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').upsert(bodyDataTable);

        let itemsChunk = (await pepperiClientAPI.api.transactionScopeItems.search({
            fields: fields,
            transaction: { UUID: transactionUUID },
            pageSize: 500,
            page: i,
        })).objects;

        itemsChunk.forEach(item => {
            multiTickBoxFields.forEach(field => {
                // need to get saparator from distributor data
                item[field.APIName] = item[field.APIName] ? item[field.APIName].split(",") : item[field.APIName];
            });

            item["NonIndexedString"] = new Array();
            NonIndexedStringFields.forEach(stringField => {
                item["NonIndexedString"].push({ "APIName": stringField, "Value": item[stringField] });
                delete item[stringField];
            });
            item["NonIndexedNumber"] = new Array();
            NonIndexedNumberFields.forEach(numberField => {
                item["NonIndexedNumber"].push({ "APIName": numberField, "Value": item[numberField] });
                delete item[numberField];
            });
            item["NonIndexedBool"] = new Array();
            NonIndexedBoolFields.forEach(boolField => {
                item["NonIndexedBool"].push({ "APIName": boolField, "Value": item[boolField] });
                delete item[boolField];
            });
            item["NonIndexedDate"] = new Array();
            NonIndexedDateFields.forEach(dateField => {
                item["NonIndexedDate"].push({ "APIName": dateField, "Value": item[dateField] });
                delete item[dateField];
            });

            //make all indexed fields key: object
            indexedFields.forEach(indexedField => {
                if (indexedField.APIName != "ItemUUID") {
                    item[indexedField.APIName + ".Value"] = item[indexedField.APIName];
                    delete item[indexedField.APIName];
                }
            });

            item["CategoryUUID"] = new Array();
            item["ElasticSearchSubType"] = elasticSearchSubType
            item["UUID"] = item["ItemUUID"];
            delete item["ItemUUID"];
        });

        let createFile = await fetch(fileStorage["UploadURL"], {
            method: "PUT",
            body: JSON.stringify(itemsChunk),
            headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" }
        });

        if (createFile.status != 200) {
            throw new Error("failed to upload file");
        }

        const bulkBody = { URL: fileStorage["DownloadURL"] };
        const bulkResponse = await service.papiClient.post("/elasticsearch/bulk/open_catalog", bulkBody);
    }

    return;
}

async function getConfigurationsFile(client, dataViews, categoriesTree, categoriesListFile, currency) {
    const service = new MyService(client);
    let categoriesList;
    await fetch(categoriesListFile, {
        method: `GET`
    })
        .then((response) => response.json())
        .then((data) => {
            categoriesList = data;
        });

    const configurationsBody = {
        DataViews: dataViews,
        CategoriesTree: categoriesTree,
        CategoriesList: categoriesList,
        Currency: currency
    };
    let configurationsFileBody = {
        Title: "configurations",
        FileName: "configurations.json",
        MimeType: "json",
        Content: Buffer.from(JSON.stringify(configurationsBody)).toString('base64')
    };
    const configurationsFileResponse = await service.papiClient.fileStorage.upsert(configurationsFileBody);
    return configurationsFileResponse;
}

async function getCurrency(pepperiClientAPI, transactionUUID) {
    let item = await pepperiClientAPI.api.transactionScopeItems.search({
        fields: ["Transaction.Currency"],
        transaction: { UUID: transactionUUID },
        pageSize: 1
    });
    return item.objects[0]["Transaction.Currency"];
}

async function uploadItemsCategory(client, webAPIBaseURL, accessToken, transactionUUID, flattenedCategory) {
    const service = new MyService(client);
    const searchItemsURL = webAPIBaseURL + "/Service1.svc/v1/OrderCenter/Transaction/" + transactionUUID + "/Items/Search";

    const countItemsBody = {
        Ascending: true,
        CatalogUID: transactionUUID,
        OrderBy: "",
        SearchText: "",
        SmartSearch: [],
        TabUID: flattenedCategory.UID,
        Top: 1,
        ViewType: "OrderCenterView3"
    };
    const relatedItemsData = await (await fetch(searchItemsURL, {
        method: "POST",
        body: JSON.stringify(countItemsBody),
        headers: {
            "PepperiSessionToken": accessToken,
            "Content-Type": "application/json"
        }
    })).json();

    const relatedItemsCount = relatedItemsData.TotalRows;
    const relatedItemsSearchCode = relatedItemsData.SearchCode;
    const chuncks = Math.ceil(relatedItemsCount / 1000);
    let i = 0, indexStart = 0, indexEnd = 999;
    const relatedItemsBody = {
        SearchCode: relatedItemsSearchCode
    };

    for (i = 0; i < chuncks; i++, indexStart += 1000, indexEnd += 1000) {
        const searchItemsByIndexURL = `${webAPIBaseURL}/Service1.svc/v1/OrderCenter/Transaction/${transactionUUID}/Items/${indexStart}/${indexEnd}`;
        const relatedItems = (await (await fetch(searchItemsByIndexURL, {
            method: "POST",
            body: JSON.stringify(relatedItemsBody),
            headers: {
                "PepperiSessionToken": accessToken,
                "Content-Type": "application/json"
            }
        })).json()).Rows;

        const categoryUUID = flattenedCategory.UUID;
        const uuidList = new Array();
        relatedItems.forEach(relatedItem => {
            uuidList.push(relatedItem.UID);
        });
        const updateBody = {};
        updateBody["query"] = { "bool": { "must": { "terms": { "UUID": uuidList } } } };
        updateBody["script"] = { "source": `ctx._source['CategoryUUID'].add('${categoryUUID}')` };
        const updateResponse = await service.papiClient.post("/elasticsearch/update/open_catalog", updateBody);
    }

    return;
}

async function setImageFieldsMapping(service, imageFields) {
    const mappingBody = {};
    const properties = {};
    imageFields.forEach(imageField => {
        properties[imageField.APIName] = { "enabled": false };
    });
    mappingBody["properties"] = properties;
    const mappingResponse = await service.papiClient.post("/elasticsearch/mapping/open_catalog", mappingBody);
}

async function updateAdalTable(client, tableName, tableBody) {
    const service = new MyService(client);
    const response = await service.papiClient.addons.data.uuid(client.AddonUUID).table(tableName).upsert(tableBody);
    return response;
}

async function validateStopPublishOpenCatalog(client, service, elasticSearchSubType) {
    const versionData = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').key(elasticSearchSubType).get();
    if (versionData.StopPublish == true) {
        // update status to stopped
        const bodyDataTable = {
            Key: elasticSearchSubType,
            Status: "Stopped"
        };
        const DataTableResponse = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').upsert(bodyDataTable);
        // delete version data from elasticsearch
        const deleteBody = {};
        deleteBody["query"] = { "bool": { "must": { "query_string": { "query": `${elasticSearchSubType}`, "fields": ["ElasticSearchSubType"] } } } };
        const deleteResponse = await service.papiClient.post("/elasticsearch/delete/open_catalog", deleteBody);
        throw new Error("Stopped");
    }
}

async function validateSyncStatus(webAPIBaseURL, accessToken) {
    const getSyncStatusURL = `${webAPIBaseURL}/Service1.svc/v1/GetSyncStatus`;
    const syncStatus = await (await fetch(getSyncStatusURL, {
        method: "GET",
        headers: {
            "PepperiSessionToken": accessToken
        }
    })).json();
    let status = syncStatus.Status;

    while (status != "UpToDate") {
        const syncStatus = await (await fetch(getSyncStatusURL, {
            method: "GET",
            headers: {
                "PepperiSessionToken": accessToken
            }
        })).json();

        status = syncStatus.Status;
    }
}

function decryptAtdSecret(atdSecret) {
    const atdSecretDecrypt = JSON.parse(Buffer.from(atdSecret, 'base64').toString());
    return atdSecretDecrypt.k;
}

function flatTree(tree, collection) {
    if (!tree["Nodes"] || tree["Nodes"].length === 0) return;
    for (var i = 0; i < tree["Nodes"].length; i++) {
        var node = tree["Nodes"][i];
        collection.push(node);
        flatTree(node, collection);
    }
    return;
}

function validateDataViews(atdDataViews) {
    if (atdDataViews.filter(dv => dv.Context.Name == "OrderCenterView3").length == 0) {
        throw new Error("OrderCenterView3 data view is missing on the atd")
    }
    else if (atdDataViews.filter(dv => dv.Context.Name == "OrderCenterView1").length == 0) {
        throw new Error("OrderCenterView1 data view is missing on the atd")
    }
    else if (atdDataViews.filter(dv => dv.Context.Name == "OrderCenterUserSort").length == 0) {
        throw new Error("OrderCenterUserSort data view is missing on the atd")
    }
    else if (atdDataViews.filter(dv => dv.Context.Name == "OrderCenterSearch").length == 0) {
        throw new Error("OrderCenterSearch data view is missing on the atd")
    }
    else if (atdDataViews.filter(dv => dv.Context.Name == "SmartSearch").length == 0) {
        throw new Error("SmartSearch data view is missing on the atd")
    }
    else if (atdDataViews.filter(dv => dv.Context.Name == "OrderCenterItemDetails").length == 0) {
        throw new Error("OrderCenterItemDetails data view is missing on the atd")
    }
    else if (atdDataViews.filter(dv => dv.Context.Name == "OrderViewsMenu").length == 0) {
        throw new Error("OrderViewsMenu data view is missing on the atd")
    }
    atdDataViews.filter(dv => dv.Context.Name == "OrderCenterSearch").forEach(dataview => {
        if (dataview.Fields.length == 0) {
            throw new Error("OrderCenterSearch data view need at least one field")
        }
    });
    atdDataViews.filter(dv => dv.Context.Name == "OrderCenterUserSort").forEach(dataview => {
        if (dataview.Fields.length == 0) {
            throw new Error("OrderCenterUserSort data view need at least one field")
        }
    });
    atdDataViews.filter(dv => dv.Context.Name == "OrderViewsMenu").forEach(dataview => {
        if (dataview.Fields.filter(f => f.FieldID == "OrderCenterView1" || f.FieldID == "OrderCenterView3").length < 2) {
            throw new Error("OrderCenterUserSort data view need at least one field")
        }
    });
}

function getExpirationDateTime() {
    let expirationDateTime = new Date(Date.now());
    expirationDateTime.setMonth(expirationDateTime.getMonth() + 1);
    return expirationDateTime.toISOString();
}

//#endregion