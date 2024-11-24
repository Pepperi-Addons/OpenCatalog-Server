# Open Catalog addon

- The Open Catalog goal is to create an open source catalog that based on Pepperi's order center with fast performance. The Open Catalog data export data to ElasticSearch,  a search engine that provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents.

## High Level

- The data and configuration for the catalog are exported from Pepperi and published to a high-speed database that allows for super-fast search and filtering.<br>
- Pepperi provides an API for web site developers to access this database and display the information on their web site, as well as a WordPress Plugin that automatically publishes the catalog on their web site.

- The addon give the ability to:
  - Add new catalogs.
  - Edit catalogs.
  - See catalog publish history. 
  - Schedule the repeating occurrences for exporting the data of the open catalog

---

## Releases
| Version | Description | Migration |
|-------- |------------ |---------- |
| 2.0.6  | Publish Pepperi products catalogs to private web page with no user registration|  |

---

## Deployment
After a Pull Request is merged into a release branch, avilable version will be published.

---

# Debugging

## **Client side:**
To debug your addon with developer toolbar (chrome or any other browser dev tool).
- Open terminal --> change to client-side --> Start your addon with npm start.
- Go to Settings --> Branded App --> Open Catalog.<br>
  Or open your browser at: https://app.pepperi.com/settings/00000000-0000-0000-0000-00000ca7a109/open_catalog.
- Add the ?dev=true param to the url.
- Open the browser inspector to make sure that the editor file is served locally.
- Add a debbuger or breakpoints on your code.

## **Server side:** 
To debug your addon with `Visual Studio Code`: <br> 
- Set the RUN mode to 'Launch API Server', press `F5`<br> or `Run->Start Debugging`.<br>
- You can then checkout your *API* at http://localhost:4400/api/foo.<br>
- Be sure to supply a JWT for it to work.


## **CPI side:**
- There is no CPI side.

---

### **Installation**
- On the installation we simply create the ADAL schemas for the Open catalog Configurations.<br>
- PNS (Pepperi Notification Service) subscribing to ADAL changes.
- Create index for the Elastic search

## Testing

- This addon does not require any tests (so far).

---

## Dependencies

| Addon | Version >= | Usage |
|--------|--------- |------------ |
| adal  | 1.0.100 | ADAL support  |
| data_views | 1.0.1 | Data view support  |
| import_export_atd | 1.1.177 |  |
| pepperi_elastic_search | 0.0.100 |  |
| pns | 1.0.62 |  |
| webapi | 16.55.261 |  |
---

## APIs
| Call | Method | Description|
|-------- |------------ | ----- |
| [Get Item](https://apidesign.pepperi.com/open-catalog/get-single-item) | GET - https://papi.pepperi.com/v1.0/open_catalog/items/{itemUUID} | This endpoint allows you to get item by UUID |
| [Get Items](https://apidesign.pepperi.com/open-catalog/get-items) | GET - https://papi.pepperi.com/v1.0/open_catalog/items | This endpoint allows you to get items |
| [Get Filters](https://apidesign.pepperi.com/open-catalog/get-filters) | GET - https://papi.pepperi.com/v1.0/open_catalog/filters | This endpoint allows you to get filters. |
| [Get Configuration](https://apidesign.pepperi.com/open-catalog/get-settings) | GET - https://papi.pepperi.com/v1.0/open_catalog/configurations | This endpoint allows you to get open catalog settings |
| [Get Category](https://apidesign.pepperi.com/open-catalog-dynamo/get-single-category) | GET - https://papi.pepperi.com/v1.0/categories/{UUID} | This endpoint allows you to get category.|
| [Get Categories](https://apidesign.pepperi.com/open-catalog-dynamo/get-categories) | GET - https://papi.pepperi.com/v1.0/categories | This endpoint allows you to get categories |
| [Post Category](https://apidesign.pepperi.com/open-catalog-dynamo/post-category) | POST - https://papi.pepperi.com/v1.0/categories | This endpoint allows you to post category. |

for more data read the [Open Catalog API design](https://apidesign.pepperi.com/open-catalog/open-catalog-entry) on the proj lib on Github.

---

## Limitations

- The limit amount of records is 10,000.
- For now, the Open catalog is not supporting matrix items.

---

## Architecture
see: [Architecture](./architecture.md)

---

## Known issues
There is no issues.

---

## Future Ideas & Plans
There is no futures ideas.

## Usage
- Install the addon & all his dependencies.
- Login with admin account
- Navigate to Settings --> Branded App --> Open Catalog.
