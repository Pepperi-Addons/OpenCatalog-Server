import MyService from './my.service';
import { Client, Request } from '@pepperi-addons/debug-server';
import jwtDecode from "jwt-decode";
import { callElasticSearchLambda } from "@pepperi-addons/system-addon-utils";

//#region public method - open catalog api
export async function single_item(client: Client, request: Request) {
    // https://papi.pepperi.com/v1.0/open_catalog/items/{itemUUID}
    const uuid = request.query.UUID;
    const subType = jwtDecode(client.OAuthAccessToken)['pepperi.addonkey'];
    const body = {
        "query": {
            "bool": {
                "must": [
                    {
                        "match": { "_id": "open_catalog_" + subType + "_" + uuid }
                    }
                ]
            }
        }
    };

    const index = jwtDecode(client.OAuthAccessToken)['pepperi.distributoruuid'];
    const endpoint = index + '/_search';
    const method = 'POST';

    const lambdaResponse = await callElasticSearchLambda('oc-' + endpoint, method, JSON.stringify(body));
    let response;
    if (lambdaResponse.success) {
        response = lambdaResponse.resultObject;
    }
    else {
        throw new Error(lambdaResponse["errorMessage"]);
    }

    if (response.error) {
        if (response.error.caused_by) {
            throw new Error(response.error.caused_by.reason);
        }
        else {
            throw new Error(response.error.type + ". " + response.error.reason);
        }
    }

    const count = response.hits.total.value;
    if (count == 1) {
        let item = response.hits.hits[0];
        populateItem(item);
        return item._source;
    }
    else {
        throw new Error("Object ID does not exist.")
    }
};

export async function items(client: Client, request: Request) {
    // https://papi.pepperi.com/v1.0/open_catalog/items?where={where}&search_string={searchString}
    // &search_string_fields={fields}&order_by={OrderBy}&page_size={PageSize}&page={PageIndex}&fields={fields}
    const subType = jwtDecode(client.OAuthAccessToken)['pepperi.addonkey'];
    const include_count = request.query.include_count ? request.query.include_count : false;
    const fields = request.query.fields ? request.query.fields.replace(" ", "").split(",") : undefined;
    const page = request.query.page ? (request.query.page > 0 ? request.query.page - 1 : 0) : 0;
    let page_size = request.query.page_size ? request.query.page_size : 100;
    if (page_size == -1) {
        page_size = 10000;
    }
    else if (page_size > 10000) {
        page_size = 10000;
    }
    const from = page * page_size;
    const where = request.query.where ? request.query.where.split(" and ") : undefined;
    const search_string = request.query.search_string.includes(' ') ? request.query.search_string.replace(/ /g, '*') :  request.query.search_string;
    const search_string_fields = request.query.search_string_fields ? request.query.search_string_fields.replace(" ", "").split(",") : undefined;
    const order_by = request.query.order_by ? request.query.order_by.split(" ") : undefined;

    const body = {
        "size": page_size,
        "from": from,
        "track_total_hits": include_count,
        "query": {
            "bool": {
                "must": new Array()
            }
        }
    };

    body["query"]["bool"]["must"].push({ "match": { "ElasticSearchSubType": subType } });
    body["query"]["bool"]["must"].push({ "match": { "ElasticSearchType": "open_catalog" } });

    if (search_string) {
        if (search_string_fields) {
            body["query"]["bool"]["must"].push({ "query_string": { "query": "*" + search_string + "*", "fields": search_string_fields, "type": "most_fields" } });
        }
        else {
            body["query"]["bool"]["must"].push({ "query_string": { "query": "*" + search_string + "*", "type": "most_fields" } });
        }
    }

    convertParamsToQuery(fields, where, order_by, body);

    // call ElasticSearchLambda directly
    const index = jwtDecode(client.OAuthAccessToken)['pepperi.distributoruuid'];
    const endpoint = index + '/_search';
    const method = 'POST';

    const lambdaResponse = await callElasticSearchLambda('oc-' + endpoint, method, JSON.stringify(body));
    let response;
    if (lambdaResponse.success) {
        response = lambdaResponse.resultObject;
    }
    else {
        throw new Error(lambdaResponse["errorMessage"]);
    }

    if (response.error) {
        if (response.error.caused_by) {
            throw new Error(response.error.caused_by.reason);
        }
        else {
            throw new Error(response.error.type + ". " + response.error.reason);
        }
    }

    let result = {};
    if (include_count == "true") {
        const count = response.hits.total.value;
        result["TotalCount"] = count;
    }

    let resultProducts = new Array();
    response.hits.hits.forEach(item => {
        resultProducts.push(item._source);
    });
    result["Products"] = resultProducts;
    console.log("f1 end open_catalog/items");
    return result;
};

export async function filters(client: Client, request: Request) {
    // https://papi.pepperi.com/v1.0/open_catalog/filters?where={where}&search_string={searchString}&
    // search_string_fields={fields}&fields={fields}&distinct_fields={distinctFields}
    const subType = jwtDecode(client.OAuthAccessToken)['pepperi.addonkey'];
    const distinct_fields = request.query.distinct_fields ? request.query.distinct_fields.replace(" ", "").split(",") : undefined;
    const where = request.query.where ? request.query.where.split(" and ") : undefined;
    const search_string = request.query.search_string;
    const search_string_fields = request.query.search_string_fields ? request.query.search_string_fields.replace(" ", "").split(",") : undefined;

    const index = jwtDecode(client.OAuthAccessToken)['pepperi.distributoruuid'];
    const endpoint = index + '/_search';
    const method = 'POST';

    if (!distinct_fields) {
        return new Array();
    }

    const body = {
        "size": 0,
        "query": {
            "bool": {
                "must": new Array()
            }
        },
        "aggs": {}
    };
    body["query"]["bool"]["must"].push({ "match": { "ElasticSearchSubType": subType } });
    body["query"]["bool"]["must"].push({ "match": { "ElasticSearchType": "open_catalog" } });

    if (search_string) {
        if (search_string_fields) {
            body["query"]["bool"]["must"].push({ "query_string": { "query": "*" + search_string + "*", "fields": search_string_fields, "type": "most_fields" } });
        }
        else {
            body["query"]["bool"]["must"].push({ "query_string": { "query": "*" + search_string + "*", "type": "most_fields" } });
        }
    }

    const listPromises: Promise<any>[] = new Array();
    let filters = new Array();
    let newBody;
    let newWhere;

    let unselectedFields = new Array();
    distinct_fields.forEach(field => {
        newBody = JSON.parse(JSON.stringify(body));
        newWhere = where ? JSON.parse(JSON.stringify(where.filter(x => !x.includes(field)))) : undefined;
        if (newWhere == where || newWhere.length == where.length) {
            unselectedFields.push(field);
        }
        else {
            newBody["aggs"][field.replace(".Value", "")] = {
                "terms": { "script": `params._source['${field}']`, "size": 1000, "order": { "_term": "asc" } }
            };
            convertWhereToQuery(newWhere, newBody);
            listPromises.push(callElasticSearchLambda('oc-' + endpoint, method, JSON.stringify(newBody)));
        }
    });

    if (unselectedFields.length > 0) {
        newBody = JSON.parse(JSON.stringify(body));;
        unselectedFields.forEach(field => {
            newBody["aggs"][field.replace(".Value", "")] = { "terms": { "script": `params._source['${field}']`, "size": 1000, "order": { "_term": "asc" } } };
        });
        convertWhereToQuery(where, newBody);
        listPromises.push(callElasticSearchLambda('oc-' + endpoint, method, JSON.stringify(newBody)));
    }

    await Promise.all(listPromises).then(
        function (res) {
            var i = 0;
            while (i < res.length) {
                let filter = {};
                Object.keys(res[i].resultObject.aggregations).forEach(function (key) {
                    filter = {};
                    filter["APIName"] = key;
                    filter["Values"] = res[i].resultObject.aggregations[key].buckets;
                    filters.push(filter);
                });
                i++;
            }
        }
    );

    return filters;
};

export async function configurations(client: Client, request: Request) {
    try {
        // https://papi.pepperi.com/v1.0/open_catalog/configurations
        console.log("In Configurations api function");
        const service = new MyService(client);
        client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
        const subType = jwtDecode(client.OAuthAccessToken)['pepperi.addonkey'];
        console.log("Before calling ADAL");
        let responseADAL = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogData').key(subType).get();
        console.log("After calling ADAL");
        const configurations = {
            "ConfigurationsURL": responseADAL["ConfigurationsURL"]
        };
        return configurations;
    } catch (error) {
        console.log(`Caught error in api/configurations: ${error}`);
        return null;
    } 

};

//#endregion

//#region private methods
function convertWhereToQuery(where, body) {
    if (!where) {
        return;
    }

    if (where.toString().includes("!=")) {
        body["query"]["bool"]["must_not"] = new Array();
    }

    for (var i in where) {
        if (where[i].includes("!=")) {
            const condition = where[i].split("!=");
            let keyValue = {};
            let values = new Array();
            condition[1].split(",").forEach(value => {
                values.push(value);
            });
            keyValue[condition[0]] = values;
            body["query"]["bool"]["must_not"].push({ "terms": keyValue });
        }
        else if (where[i].includes(">=")) {
            const condition = where[i].split(">=");
            let expression = { "range": {} };
            expression["range"][condition[0]] = { "gte": condition[1] };
            body["query"]["bool"]["must"].push(expression);
        }
        else if (where[i].includes("<=")) {
            const condition = where[i].split("<=");
            let expression = { "range": {} };
            expression["range"][condition[0]] = { "lte": condition[1] };
            body["query"]["bool"]["must"].push(expression);
        }
        else if (where[i].includes("=")) {
            let condition = where[i].split("=");
            let keyValue = {};
            let values = new Array();
            condition[1].split(";").forEach(value => {
                values.push(value);
            });
            keyValue[condition[0]] = values;
            body["query"]["bool"]["must"].push({ "terms": keyValue });
        }
        else if (where[i].includes(">")) {
            const condition = where[i].split(">");
            let expression = { "range": {} };
            expression["range"][condition[0]] = { "gt": condition[1] };
            body["query"]["bool"]["must"].push(expression);
        }
        else if (where[i].includes("<")) {
            const condition = where[i].split("<");
            let expression = { "range": {} };
            expression["range"][condition[0]] = { "lt": condition[1] };
            body["query"]["bool"]["must"].push(expression);
        }
    }
    return;
}

function convertOrderByToQuery(order_by, body) {
    const order_by_field = order_by[0];
    const order_by_asc = order_by[1] ? order_by[1].toLowerCase() : "asc";
    const expression = { "sort": {} };
    expression["sort"][order_by_field] = { "order": order_by_asc };
    body["sort"] = expression["sort"];
    return;
}

function convertFieldsToQuery(fields, body) {
    body["_source"] = fields;
    return;
}

function convertParamsToQuery(fields, where, order_by, body) {
    if (fields) {
        convertFieldsToQuery(fields, body);
    }

    if (where) {
        convertWhereToQuery(where, body);
    }

    if (order_by) {
        convertOrderByToQuery(order_by, body)
    }

    return;
}

function populateItem(item) {
    if (item._source.hasOwnProperty("NonIndexedString")) {
        item._source["NonIndexedString"]?.forEach(field => {
            item._source[field.APIName + ".Value"] = field.Value;
        });
        delete item._source.NonIndexedString;
    };
    if (item._source.hasOwnProperty("NonIndexedNumber")) {
        item._source["NonIndexedNumber"]?.forEach(field => {
            item._source[field.APIName + ".Value"] = field.Value;
        });
        delete item._source.NonIndexedNumber;
    };
    if (item._source.hasOwnProperty("NonIndexedBool")) {
        item._source["NonIndexedBool"]?.forEach(field => {
            item._source[field.APIName + ".Value"] = field.Value;
        });
        delete item._source.NonIndexedBool;
    };
    if (item._source.hasOwnProperty("NonIndexedDate")) {
        item._source["NonIndexedDate"]?.forEach(field => {
            item._source[field.APIName + ".Value"] = field.Value;
        });
        delete item._source.NonIndexedDate;
    };
    delete item._source.ElasticSearchSubType;
    delete item._source.ElasticSearchType;
}
//#endregion
