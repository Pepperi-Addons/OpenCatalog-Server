'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var perf_hooks = require('perf_hooks');
var Stream = require('stream');
var http = require('http');
var Url = require('url');
var https = require('https');
var zlib = require('zlib');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var perf_hooks__default = /*#__PURE__*/_interopDefaultLegacy(perf_hooks);
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);
var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var addons = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(addons);

var userDefinedTables = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(userDefinedTables);

var codeJobs = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(codeJobs);

var activity = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(activity);

var account = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(account);

var user = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(user);

var uiControl = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIControlViewTypes = void 0;
exports.UIControlViewTypes = {
    None: 0,
    Grid: 1,
    Cards: 2,
    Detailed: 3,
    Line: 4,
    CardsGrid: 5,
    Map: 6,
    Menu: 7,
    Configuration: 8,
};
});

unwrapExports(uiControl);
var uiControl_1 = uiControl.UIControlViewTypes;

var dataView = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataViewRowModes = exports.HorizontalAlignments = exports.VerticalAlignments = exports.ResoursePrefixes = exports.ResourceTypes = exports.DataViewFieldTypes = exports.DataViewScreenSizes = exports.DataViewTypes = void 0;
exports.DataViewTypes = [
    'Grid',
    'Form',
    'Card',
    'Large',
    'Line',
    'Map',
    'Menu',
    'Configuration',
    'CardsGrid',
    'Details',
];
exports.DataViewScreenSizes = ['Tablet', 'Phablet', 'Landscape'];
exports.DataViewFieldTypes = {
    None: 0,
    TextBox: 1,
    LimitedLengthTextBox: 2,
    TextArea: 3,
    TextHeader: 4,
    Date: 5,
    DateAndTime: 6,
    NumberInteger: 7,
    NumberReal: 8,
    Currency: 9,
    Boolean: 10,
    ComboBox: 11,
    MultiTickBox: 12,
    Separator: 13,
    Address: 14,
    Percentage: 15,
    EmptyComboBox: 16,
    InternalLink: 17,
    Email: 18,
    LimitedDate: 19,
    Image: 20,
    MultiTickBoxToComboBox: 21,
    EmptyMultiTickBox: 22,
    Totals: 23,
    Attachment: 24,
    Signature: 25,
    Link: 26,
    ImageURL: 27,
    NumberIntegerQuantitySelector: 28,
    NumberRealQuantitySelector: 29,
    NumberIntegerForMatrix: 30,
    NumberRealForMatrix: 31,
    Images: 32,
    Indicators: 33,
    CalculatedReal: 34,
    CalculatedInt: 35,
    CalculatedString: 36,
    CalculatedDate: 37,
    CalculatedBool: 38,
    MapDataDropDown: 39,
    MapDataReal: 40,
    MapDataString: 41,
    MapDataInt: 42,
    Sum: 43,
    Phone: 44,
    UrlForApi: 45,
    ManyToManyUrlForApi: 46,
    ReferenceType: 47,
    GuidReferenceType: 48,
    Button: 49,
    UIControlFieldType_InternalPage: 50,
    Duration: 51,
    ListOfObjects: 52,
    Package: 53,
    RelatedObjectsCards: 54,
    BooleanText: 55,
};
exports.ResourceTypes = [
    'None',
    'accounts',
    'transactions',
    'activities',
    'all_activities',
    'items',
    'users',
    'transaction_lines',
    'contacts',
    'lists',
];
exports.ResoursePrefixes = ['GA', 'OA', 'CP', 'AT', 'GL'];
exports.VerticalAlignments = {
    Stretch: 0,
    Top: 1,
    Bottom: 2,
    Center: 3,
};
exports.HorizontalAlignments = {
    Stretch: 0,
    Left: 1,
    Right: 2,
    Center: 3,
};
exports.DataViewRowModes = {
    Fixed: 0,
    MatchParent: 1,
};
});

unwrapExports(dataView);
var dataView_1 = dataView.DataViewRowModes;
var dataView_2 = dataView.HorizontalAlignments;
var dataView_3 = dataView.VerticalAlignments;
var dataView_4 = dataView.ResoursePrefixes;
var dataView_5 = dataView.ResourceTypes;
var dataView_6 = dataView.DataViewFieldTypes;
var dataView_7 = dataView.DataViewScreenSizes;
var dataView_8 = dataView.DataViewTypes;

var profile = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(profile);

var pepperiObject = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(pepperiObject);

var apiFieldObject = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(apiFieldObject);

var maintenance = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(maintenance);

var fileStorage = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(fileStorage);

var auditLogs = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(auditLogs);

var atdSettings = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(atdSettings);

var atdMetaData = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(atdMetaData);

var types = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(types);

var batchApiResponse = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(batchApiResponse);

var _export = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(_export);

var catalog = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(catalog);

var sync = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

unwrapExports(sync);

var entities = createCommonjsModule(function (module, exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entities = void 0;
__exportStar(addons, exports);
__exportStar(userDefinedTables, exports);
__exportStar(codeJobs, exports);
__exportStar(activity, exports);
__exportStar(account, exports);
__exportStar(user, exports);
__exportStar(uiControl, exports);
__exportStar(dataView, exports);
__exportStar(profile, exports);
__exportStar(pepperiObject, exports);
__exportStar(apiFieldObject, exports);
__exportStar(maintenance, exports);
__exportStar(fileStorage, exports);
__exportStar(auditLogs, exports);
__exportStar(atdSettings, exports);
__exportStar(atdMetaData, exports);
__exportStar(types, exports);
__exportStar(batchApiResponse, exports);
__exportStar(_export, exports);
__exportStar(catalog, exports);
__exportStar(sync, exports);
// need something here that can be transpiled to js
// all the other entities are interfaces
class Entities {
}
exports.Entities = Entities;
});

unwrapExports(entities);
var entities_1 = entities.Entities;

var endpoint = createCommonjsModule(function (module, exports) {
var __asyncValues = (commonjsGlobal && commonjsGlobal.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IterableEndpoint = void 0;
class IterableEndpoint {
    constructor(service, endpoint) {
        this.service = service;
        this.endpoint = endpoint;
    }
    async find(options = {}) {
        let url = this.getEndpointURL();
        const query = Endpoint.encodeQueryParams(options);
        url = query ? url + '?' + query : url;
        return this.service.get(url);
    }
    getEndpointURL() {
        return this.endpoint;
    }
    iter(options = {}) {
        const self = this;
        return {
            [Symbol.asyncIterator]() {
                const newOptions = options;
                newOptions.include_count = true;
                let currentPage = 1;
                let obj = { items: [], numOfPages: 1 };
                return {
                    next: async () => {
                        if (obj.items.length == 0) {
                            if (currentPage == 1) {
                                newOptions.page = currentPage++;
                                obj = await self.getFirstPage(newOptions);
                                newOptions.include_count = false;
                            }
                            else if (currentPage <= obj.numOfPages) {
                                newOptions.page = currentPage++;
                                obj.items = await self.find(newOptions);
                            }
                        }
                        const retItem = obj.items.length > 0 ? obj.items.shift() : undefined;
                        if (retItem) {
                            return { value: retItem, done: false };
                        }
                        return { value: {}, done: true };
                    },
                };
            },
            toArray: async () => {
                var e_1, _a;
                const items = [];
                try {
                    for (var _b = __asyncValues(this.iter(options)), _c; _c = await _b.next(), !_c.done;) {
                        const item = _c.value;
                        items.push(item);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return items;
            },
        };
    }
    async getFirstPage(options) {
        let url = this.getEndpointURL();
        const query = Endpoint.encodeQueryParams(options);
        let items = [];
        url = query ? url + '?' + query : url;
        const res = await this.service.apiCall('GET', url);
        const numOfPages = Number(res.headers.get('X-Pepperi-Total-Pages'));
        items = await res.json();
        return { items, numOfPages };
    }
}
exports.IterableEndpoint = IterableEndpoint;
class Endpoint extends IterableEndpoint {
    constructor(service, endpoint) {
        super(service, endpoint);
        this.service = service;
        this.endpoint = endpoint;
    }
    async get(id) {
        let url = this.getEndpointURL();
        url += '/' + id;
        return this.service.get(url);
    }
    async upsert(object) {
        return this.service.post(this.getEndpointURL(), object);
    }
    async batch(objects) {
        return this.service.post('/batch' + this.getEndpointURL(), objects);
    }
    async export(options) {
        const body = {
            fields: options.fields ? options.fields.join(',') : undefined,
            where: options.where,
            orderBy: options.orderBy,
            page: options.page,
            page_size: options.page_size,
            include_nested: options.include_nested,
            full_mode: options.full_mode,
            include_deleted: options.include_deleted,
            is_distinct: options.is_distinct,
        };
        return this.service.post('/export' + this.getEndpointURL(), body);
    }
    async delete(id) {
        let url = this.getEndpointURL();
        url += '/' + id;
        return this.service
            .delete(url)
            .then((res) => res.text())
            .then((res) => (res ? JSON.parse(res) : ''));
    }
    static encodeQueryParams(params) {
        const ret = [];
        Object.keys(params).forEach((key) => {
            ret.push(key + '=' + encodeURIComponent(params[key]));
        });
        return ret.join('&');
    }
}
exports.default = Endpoint;
});

unwrapExports(endpoint);
var endpoint_1 = endpoint.IterableEndpoint;

var addons$1 = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddonEndpoint = void 0;
const endpoint_1 = __importDefault(endpoint);
class InstalledAddonEnpoint {
    constructor(service, addonUUID) {
        this.service = service;
        this.addonUUID = addonUUID;
    }
    async install(version = '') {
        if (version)
            return await this.service.post(`/addons/installed_addons/${this.addonUUID}/install/${version}`);
        else
            return await this.service.post(`/addons/installed_addons/${this.addonUUID}/install`);
    }
    async uninstall() {
        return await this.service.post(`/addons/installed_addons/${this.addonUUID}/uninstall`);
    }
    async upgrade(version = '') {
        if (version)
            return await this.service.post(`/addons/installed_addons/${this.addonUUID}/upgrade/${version}`);
        else
            return await this.service.post(`/addons/installed_addons/${this.addonUUID}/upgrade`);
    }
    async downgrade(version) {
        return await this.service.post(`/addons/installed_addons/${this.addonUUID}/downgrade/${version}`);
    }
    async get() {
        return await this.service.get(`/addons/installed_addons/${this.addonUUID}`);
    }
}
class InstalledAddonsEnpoint extends endpoint_1.default {
    constructor(service) {
        super(service, '/addons/installed_addons');
    }
    addonUUID(uuid) {
        return new InstalledAddonEnpoint(this.service, uuid);
    }
}
class AddonApiEndpoint {
    constructor(service) {
        this.service = service;
        this.options = {
            uuid: '',
            file: '',
            func: '',
            version: '',
            sync: true,
            queryString: '',
        };
    }
    uuid(uuid) {
        this.options.uuid = uuid;
        return this;
    }
    file(fileName) {
        this.options.file = fileName;
        return this;
    }
    func(functionName) {
        this.options.func = functionName;
        return this;
    }
    sync() {
        this.options.sync = true;
        return this;
    }
    async() {
        this.options.sync = false;
        return this;
    }
    async get(params = {}) {
        const url = this.GetAddonApiUrl(params);
        return await this.service.get(url);
    }
    async post(params = {}, body = undefined) {
        const url = this.GetAddonApiUrl(params);
        return await this.service.post(url, body);
    }
    GetAddonApiUrl(params = {}) {
        let asyncPart = '';
        if (!this.options.sync) {
            asyncPart = '/async';
        }
        const url = '/addons/api' + asyncPart + `/${this.options.uuid}/${this.options.file}/${this.options.func}`;
        const queryString = endpoint_1.default.encodeQueryParams(params);
        return queryString ? url + '?' + queryString : url;
    }
}
class AddonVersionEndpoint extends endpoint_1.default {
    constructor(service) {
        super(service, '/addons/versions');
    }
}
class TableEndpoint extends endpoint_1.default {
    constructor(service, addonUUID, tableName) {
        super(service, `/addons/data/${addonUUID}/${tableName}`);
        this.addonUUID = addonUUID;
        this.tableName = tableName;
    }
    key(keyName) {
        return {
            get: async () => {
                return await this.service.get(`/addons/data/${this.addonUUID}/${this.tableName}/${keyName}`);
            },
        };
    }
}
class AddonEndpoint extends endpoint_1.default {
    constructor(service) {
        super(service, '/addons');
        this.installedAddons = new InstalledAddonsEnpoint(this.service);
        this.versions = new AddonVersionEndpoint(this.service);
        this.api = new AddonApiEndpoint(this.service);
        // data = new AddonDataEndpoint(this.service);
        this.data = {
            schemes: {
                post: async (body) => {
                    return await this.service.post('/addons/data/schemes', body);
                },
            },
            uuid: (addonUUID) => {
                return {
                    table: (tableName) => {
                        return new TableEndpoint(this.service, addonUUID, tableName);
                    },
                };
            },
        };
    }
}
exports.AddonEndpoint = AddonEndpoint;
});

unwrapExports(addons$1);
var addons_1 = addons$1.AddonEndpoint;

var codeJobs$1 = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeJobsEndpoint = void 0;
const endpoint_1 = __importDefault(endpoint);
class CodeJobEndpoint {
    constructor(service, uuid, async) {
        this.service = service;
        this.uuid = uuid;
        this.async = async;
    }
    async find(includeDeleted = false) {
        return await this.service.get(`/code_jobs/${this.uuid}?include_deleted=${includeDeleted}`);
    }
    async publish(body) {
        return this.service.post(`/code_jobs/${this.uuid}/publish`, body);
    }
    async execute() {
        const asyncPart = this.async ? 'async/' : '';
        return this.service.post(`/code_jobs/${asyncPart}${this.uuid}/execute`);
    }
}
class CodeJobsEndpoint extends endpoint_1.default {
    constructor(service) {
        super(service, '/code_jobs');
        this.isAsync = false;
    }
    uuid(uuid) {
        return new CodeJobEndpoint(this.service, uuid, this.isAsync);
    }
    async() {
        this.isAsync = true;
        return this;
    }
}
exports.CodeJobsEndpoint = CodeJobsEndpoint;
});

unwrapExports(codeJobs$1);
var codeJobs_1 = codeJobs$1.CodeJobsEndpoint;

var metaData = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = exports.Fields = exports.SubTypes = exports.Types = exports.TypeMetaData = exports.DistributorFlagsEndpoint = void 0;
class DistributorFlagsEndpoint {
    constructor(service) {
        this.service = service;
        this.options = {
            name: '',
        };
    }
    name(flagName) {
        this.options.name = flagName;
        return this;
    }
    async get() {
        return await this.service.get(`/meta_data/flags/${this.options.name}`);
    }
}
exports.DistributorFlagsEndpoint = DistributorFlagsEndpoint;
class TypeMetaData {
    constructor(service, typeObject) {
        this.service = service;
        this.typeObject = typeObject;
        this.types = new Types(this.service, this.typeObject);
        this.fields = new Fields(this.service, this.typeObject);
    }
}
exports.TypeMetaData = TypeMetaData;
class Types {
    constructor(service, typeName) {
        this.service = service;
        this.typeName = typeName;
        this.fields = new Fields(this.service, this.typeName);
    }
    subtype(subtypeid) {
        return new SubTypes(this.service, this.typeName, subtypeid);
    }
    async get() {
        const url = `/meta_data/${this.typeName}/types`;
        return await this.service.get(url);
    }
}
exports.Types = Types;
class SubTypes {
    constructor(service, typeName, subtype) {
        this.service = service;
        this.typeName = typeName;
        this.subtype = subtype;
        this.fields = new Fields(this.service, this.typeName, this.subtype);
        this.settings = new Settings(this.service, this.typeName, this.subtype);
    }
    async get() {
        const url = `/meta_data/${this.typeName}/types/${this.subtype}`;
        return await this.service.get(url);
    }
    async addons() {
        const url = `/meta_data/${this.typeName}/types/${this.subtype}/addons`;
        return await this.service.get(url);
    }
}
exports.SubTypes = SubTypes;
class Fields {
    constructor(service, type, subtypeid) {
        this.service = service;
        this.type = type;
        this.subtypeid = subtypeid;
    }
    async get(p = { include_owned: true }) {
        let url = this.createUrl();
        if (typeof p === 'string') {
            if (p) {
                url = `${url}/${p}`;
            }
        }
        else if (typeof p === 'object') {
            if (p) {
                url = `${url}?include_owned=${p.include_owned}`;
            }
            else {
                url = `${url}?include_owned=true`;
            }
        }
        return await this.service.get(url);
    }
    async upsert(body) {
        const url = this.createUrl();
        return await this.service.post(url, body);
    }
    async delete(FieldID) {
        let url = this.createUrl();
        url = `${url}/${FieldID}`;
        return await this.service
            .delete(url)
            .then((res) => res.text())
            .then((res) => (res ? JSON.parse(res) : ''));
    }
    createUrl() {
        let url = `/meta_data/${this.type}`;
        if (this.subtypeid) {
            url = `${url}/types/${this.subtypeid}`;
        }
        return (url = `${url}/fields`);
    }
}
exports.Fields = Fields;
class Settings {
    constructor(service, type, subtypeid) {
        this.service = service;
        this.type = type;
        this.subtypeid = subtypeid;
    }
    async get() {
        const url = `/meta_data/${this.type}/types/${this.subtypeid}/settings`;
        return await this.service.get(url);
    }
    async update(body) {
        const url = `/meta_data/${this.type}/types/${this.subtypeid}/settings`;
        return await this.service.post(url, body);
    }
}
exports.Settings = Settings;
});

unwrapExports(metaData);
var metaData_1 = metaData.Settings;
var metaData_2 = metaData.Fields;
var metaData_3 = metaData.SubTypes;
var metaData_4 = metaData.Types;
var metaData_5 = metaData.TypeMetaData;
var metaData_6 = metaData.DistributorFlagsEndpoint;

var maintenance$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceEndpoint = void 0;
class MaintenanceEndpoint {
    constructor(service) {
        this.service = service;
    }
    async archive(body) {
        const url = '/maintenance/archive';
        return await this.service.post(url, body);
    }
}
exports.MaintenanceEndpoint = MaintenanceEndpoint;
});

unwrapExports(maintenance$1);
var maintenance_1 = maintenance$1.MaintenanceEndpoint;

var auditLogs$1 = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsEndpoint = void 0;
const endpoint_1 = __importDefault(endpoint);
class AuditLogEndpoint {
    constructor(service, uuid) {
        this.service = service;
        this.uuid = uuid;
        this.lines = new endpoint_1.default(this.service, `/audit_logs/${this.uuid}/lines`);
    }
    async get() {
        return await this.service.get(`/audit_logs/${this.uuid}`);
    }
}
class AuditLogsEndpoint extends endpoint_1.default {
    constructor(service) {
        super(service, '/audit_logs');
    }
    uuid(uuid) {
        return new AuditLogEndpoint(this.service, uuid);
    }
}
exports.AuditLogsEndpoint = AuditLogsEndpoint;
});

unwrapExports(auditLogs$1);
var auditLogs_1 = auditLogs$1.AuditLogsEndpoint;

var sync$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncEndpoint = void 0;
class SyncEndpoint {
    constructor(service) {
        this.service = service;
    }
    async post(body) {
        const url = `/application/sync`;
        return await this.service.post(url, body);
    }
    async jobInfo(uuid) {
        const url = `/application/sync/jobinfo/${uuid}`;
        return await this.service.get(url);
    }
    async data(uuid) {
        const url = `/application/sync/data/${uuid}`;
        return await this.service.get(url);
    }
}
exports.SyncEndpoint = SyncEndpoint;
});

unwrapExports(sync$1);
var sync_1 = sync$1.SyncEndpoint;

var fileStorage$1 = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageEndpoint = void 0;
const endpoint_1 = __importDefault(endpoint);
class FileStorageEndpoint extends endpoint_1.default {
    constructor(service) {
        super(service, '/file_storage');
    }
    async name(fileName) {
        return await this.service.get(`/file_storage/name/${fileName}`);
    }
    async tmp() {
        return await this.service.post('/file_storage/tmp');
    }
}
exports.FileStorageEndpoint = FileStorageEndpoint;
});

unwrapExports(fileStorage$1);
var fileStorage_1 = fileStorage$1.FileStorageEndpoint;

var endpoints = createCommonjsModule(function (module, exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(addons$1, exports);
__exportStar(codeJobs$1, exports);
__exportStar(metaData, exports);
__exportStar(maintenance$1, exports);
__exportStar(auditLogs$1, exports);
__exportStar(sync$1, exports);
__exportStar(fileStorage$1, exports);
});

unwrapExports(endpoints);

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream__default['default'].Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream__default['default'].PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream__default['default']) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream__default['default']) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream__default['default'])) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream__default['default'] && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream__default['default']) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http__default['default'].STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url__default['default'].parse;
const format_url = Url__default['default'].format;

const streamDestructionSupported = 'destroy' in Stream__default['default'].Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream__default['default'].Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream__default['default'].PassThrough;
const resolve_url = Url__default['default'].resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https__default['default'] : http__default['default']).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream__default['default'].Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib__default['default'].Z_SYNC_FLUSH,
				finishFlush: zlib__default['default'].Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib__default['default'].createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib__default['default'].createInflate());
					} else {
						body = body.pipe(zlib__default['default'].createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib__default['default'].createBrotliDecompress === 'function') {
				body = body.pipe(zlib__default['default'].createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

var lib = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': fetch,
	Headers: Headers,
	Request: Request,
	Response: Response,
	FetchError: FetchError
});

var require$$0 = getCjsExportFromNamespace(lib);

var papiModule = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.papi_fetch = exports.papi_performance = void 0;

const node_fetch_1 = __importDefault(require$$0);
exports.papi_performance = typeof window !== 'undefined' ? window.performance : perf_hooks__default['default'].performance;
exports.papi_fetch = typeof window !== 'undefined' ? window.fetch.bind(window) : node_fetch_1.default;
});

unwrapExports(papiModule);
var papiModule_1 = papiModule.papi_fetch;
var papiModule_2 = papiModule.papi_performance;

var papiClient = createCommonjsModule(function (module, exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PapiClient = void 0;
const endpoint_1 = __importStar(endpoint);


class PapiClient {
    constructor(options) {
        this.options = options;
        this.metaData = {
            userDefinedTables: new endpoint_1.default(this, '/meta_data/user_defined_tables'),
            flags: new endpoints.DistributorFlagsEndpoint(this),
            type: (typeObject) => {
                return new endpoints.TypeMetaData(this, typeObject);
            },
            dataViews: new endpoint_1.default(this, '/meta_data/data_views'),
            pepperiObjects: new endpoint_1.default(this, '/meta_data/pepperiObjects'),
        };
        this.userDefinedTables = new endpoint_1.default(this, '/user_defined_tables');
        this.addons = new endpoints.AddonEndpoint(this);
        this.codeJobs = new endpoints.CodeJobsEndpoint(this);
        this.activities = new endpoint_1.default(this, '/activities');
        this.transactions = new endpoint_1.default(this, '/transactions');
        this.allActivities = new endpoint_1.default(this, '/all_activities');
        this.accounts = new endpoint_1.default(this, '/accounts');
        this.users = new endpoint_1.default(this, '/users');
        this.uiControls = new endpoint_1.default(this, '/uicontrols');
        this.profiles = new endpoint_1.default(this, '/profiles');
        this.fileStorage = new endpoints.FileStorageEndpoint(this);
        this.maintenance = new endpoints.MaintenanceEndpoint(this);
        this.auditLogs = new endpoints.AuditLogsEndpoint(this);
        this.types = new endpoint_1.IterableEndpoint(this, '/types');
        this.catalogs = new endpoint_1.default(this, '/catalogs');
        this.application = {
            sync: new endpoints.SyncEndpoint(this),
        };
    }
    async get(url) {
        return this.apiCall('GET', url)
            .then((res) => res.text())
            .then((res) => (res ? JSON.parse(res) : ''));
    }
    async post(url, body = undefined, headers = undefined) {
        return this.apiCall('POST', url, body, headers)
            .then((res) => res.text())
            .then((res) => (res ? JSON.parse(res) : ''));
    }
    async delete(url) {
        return this.apiCall('DELETE', url);
    }
    async apiCall(method, url, body = undefined, headers = undefined) {
        const fullURL = this.options.baseURL + url;
        const options = {
            method: method,
            headers: Object.assign({ authorization: 'Bearer ' + this.options.token }, headers),
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        if (this.options.addonUUID) {
            options.headers['X-Pepperi-OwnerID'] = this.options.addonUUID;
        }
        if (this.options.addonSecretKey) {
            options.headers['X-Pepperi-SecretKey'] = this.options.addonSecretKey;
        }
        if (this.options.actionUUID) {
            options.headers['X-Pepperi-ActionID'] = this.options.actionUUID;
        }
        const t0 = papiModule.papi_performance.now();
        const res = await papiModule.papi_fetch(fullURL, options);
        const t1 = papiModule.papi_performance.now();
        if (!this.options.suppressLogging) {
            console.log(method, fullURL, 'took', (t1 - t0).toFixed(2), 'milliseconds');
        }
        if (!res.ok) {
            // try parsing error as json
            let error = '';
            try {
                error = JSON.stringify(await res.json());
            }
            catch (_a) { }
            throw new Error(`${fullURL} failed with status: ${res.status} - ${res.statusText} error: ${error}`);
        }
        return res;
    }
}
exports.PapiClient = PapiClient;
});

unwrapExports(papiClient);
var papiClient_1 = papiClient.PapiClient;

var dist = createCommonjsModule(function (module, exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(entities, exports);
__exportStar(papiClient, exports);
});

var index = unwrapExports(dist);

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


var atob = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

var base64_url_decode = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

var C__git_Wsim_Wsim_BackEnd_OpenCatalog_serverSide_node_modules_jwtDecode_lib = function (token,options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

var InvalidTokenError_1 = InvalidTokenError;
C__git_Wsim_Wsim_BackEnd_OpenCatalog_serverSide_node_modules_jwtDecode_lib.InvalidTokenError = InvalidTokenError_1;

function Factory(bridge) {
    async function bridgeToCPI(func, params) {
        params['function'] = func;
        const res = await bridge(params);
        if (typeof res !== 'object' || typeof res.success !== 'boolean') {
            throw new Error(`Bridge function returned invalid response: ${res}`);
        }
        if (!res.success) {
            throw new Error(`Client API Error. Code: ${res.code}, Messsage: ${res.message}`);
        }
        return res;
    }
    function searchFunction(key) {
        return (params) => {
            return bridgeToCPI(key, params);
        };
    }
    function getFunction(key) {
        return (params) => {
            return bridgeToCPI(key, params);
        };
    }
    function updateFunction(key) {
        return (params) => {
            return bridgeToCPI(key, params);
        };
    }
    const clientApi = {
        api: {
            transactions: {
                get: getFunction('pepperi.api.transactions.get'),
                update: updateFunction('pepperi.api.transactions.update'),
                search: searchFunction('pepperi.api.transactions.search'),
                addLines: (params) => {
                    return bridgeToCPI('pepperi.api.transactions.addLines', params);
                },
                removeLines: (params) => {
                    return bridgeToCPI('pepperi.api.transactions.removeLines', params);
                }
            },
            activities: {
                get: getFunction('pepperi.api.activities.get'),
                update: updateFunction('pepperi.api.activities.update'),
                search: searchFunction('pepperi.api.activities.search'),
            },
            accounts: {
                get: getFunction('pepperi.api.accounts.get'),
                update: updateFunction('pepperi.api.accounts.update'),
                search: searchFunction('pepperi.api.accounts.search'),
            },
            transactionLines: {
                get: getFunction('pepperi.api.transactionLines.get'),
                update: updateFunction('pepperi.api.transactionLines.update'),
                search: searchFunction('pepperi.api.transactionLines.search'),
            },
            users: {
                get: getFunction('pepperi.api.users.get'),
                search: searchFunction('pepperi.api.users.search'),
            },
            contacts: {
                get: getFunction('pepperi.api.contacts.get'),
                update: updateFunction('pepperi.api.contacts.update'),
                search: searchFunction('pepperi.api.contacts.search'),
            },
            items: {
                get: getFunction('pepperi.api.items.get'),
                search: searchFunction('pepperi.api.items.search'),
            },
            catalogs: {
                get: getFunction('pepperi.api.catalogs.get'),
                search: searchFunction('pepperi.api.catalogs.search'),
            },
            allActivities: {
                search: searchFunction('pepperi.api.allActivities.search'),
            },
            attachments: {
                get: getFunction('pepperi.api.attachments.get'),
                search: searchFunction('pepperi.api.attachments.search'),
            },
            userDefinedTables: {
                get: (params) => {
                    return bridgeToCPI('pepperi.api.userDefinedTables.get', params);
                },
                upsert: (params) => {
                    return bridgeToCPI('pepperi.api.userDefinedTables.upsert', params);
                },
                getList: (params) => {
                    return bridgeToCPI('pepperi.api.userDefinedTables.getList', params);
                }
            },
            transactionScopeItems: {
                get: getFunction('pepperi.api.transactionScopeItems.get'),
                search: (params) => {
                    return bridgeToCPI('pepperi.api.transactionScopeItems.search', params);
                },
                update: updateFunction('pepperi.api.transactionScopeItems.update'),
            }
        },
        app: {
            transactions: {
                update: updateFunction('pepperi.app.transactions.update'),
                add: (params) => {
                    return bridgeToCPI('pepperi.app.transactions.add', params);
                },
                addLines: (params) => {
                    return bridgeToCPI('pepperi.app.transactions.addLines', params);
                },
                removeLines: (params) => {
                    return bridgeToCPI('pepperi.app.transactions.removeLines', params);
                }
            },
            activities: {
                update: updateFunction('pepperi.app.activities.update'),
                add: (params) => {
                    return bridgeToCPI('pepperi.app.activities.add', params);
                }
            },
            accounts: {
                update: updateFunction('pepperi.app.accounts.update'),
                add: (params) => {
                    return bridgeToCPI('pepperi.app.accounts.add', params);
                }
            },
            transactionLines: {
                update: updateFunction('pepperi.app.transactionLines.update'),
            },
            contacts: {
                update: updateFunction('pepperi.app.contacts.update'),
                add: (params) => {
                    return bridgeToCPI('pepperi.app.contacts.add', params);
                }
            },
            transactionScopeItems: {
                update: updateFunction('pepperi.app.transactionScopeItems.update'),
            }
        }
    };
    return clientApi;
}

class MyService {
    constructor(client) {
        this.client = client;
        this.papiClient = new index.PapiClient({
            baseURL: client.BaseURL,
            token: client.OAuthAccessToken,
            addonUUID: client.AddonUUID,
            addonSecretKey: client.AddonSecretKey
        });
    }
    doSomething() {
        console.log("doesn't really do anything....");
    }
    getAddons() {
        return this.papiClient.addons.installedAddons.find({});
    }
    async getWebAPIBaseURL() {
        //get WebAPI base url, this implementation is temporary, DI-17467
        var _a, _b;
        let environment = C__git_Wsim_Wsim_BackEnd_OpenCatalog_serverSide_node_modules_jwtDecode_lib(this.client.OAuthAccessToken)["pepperi.datacenter"];
        const webappAddon = await this.papiClient.addons.installedAddons.addonUUID("00000000-0000-0000-0000-0000003eba91").get();
        environment = environment == "sandbox" ? "sandbox." : "";
        let baseURL = '';
        if (((_a = webappAddon.Version) === null || _a === void 0 ? void 0 : _a.indexOf('16.55')) != -1) {
            const webappVersion = (_b = webappAddon.Version) === null || _b === void 0 ? void 0 : _b.split(".");
            const versionMain = webappVersion ? webappVersion[0] : "";
            const versionMinor = webappVersion ? webappVersion[1] : "";
            const versionPatch = webappVersion ? webappVersion[2] : "";
            baseURL = `https://webapi.${environment}pepperi.com/V${versionMain}_${versionMinor}/WebApp_${versionPatch}`;
        }
        else {
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
        const pepperi = Factory(async (params) => {
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
        const userUUID = C__git_Wsim_Wsim_BackEnd_OpenCatalog_serverSide_node_modules_jwtDecode_lib(this.client.OAuthAccessToken)['pepperi.useruuid'];
        const account = await this.papiClient.get('/accounts/ExternalID/' + userUUID);
        const accountURL = webAPIBaseURL + "/Service1.svc/v1/Account/" + account.UUID;
        const accountReload = await (await fetch(accountURL, {
            method: "GET",
            headers: {
                "PepperiSessionToken": accessToken,
                "Content-Type": "application/json"
            }
        })).json();
        const transaction = await pepperiClientAPI.app.transactions.add({
            type: { InternalID: parseInt(atdID) },
            references: { account: { UUID: account.UUID } }
        });
        return transaction.id;
    }
}

class OpenCatalogMapping {
}
OpenCatalogMapping.mappingOpenCatalog = {
    "Settings": {
        "number_of_shards": 1,
        "analysis": {
            "normalizer": {
                "my_normalizer": {
                    "type": "custom",
                    "filter": ["lowercase"]
                }
            }
        }
    },
    "Mapping": {
        "dynamic_templates": [
            {
                "strings": {
                    "match_mapping_type": "string",
                    "mapping": { "type": "keyword", "normalizer": "my_normalizer" }
                }
            },
            {
                "decimals": {
                    "match_mapping_type": "double",
                    "mapping": { "type": "double" }
                }
            }
        ],
        "properties": {
            "ElasticSearchType": { "type": "keyword" },
            "ElasticSearchSubType": { "type": "keyword" },
            "UUID": { "type": "keyword" },
            "CategoryUUID": { "type": "keyword" },
            "NonIndexedText": {
                "type": "nested",
                "enabled": false,
                "properties": {
                    "APIName": { "type": "keyword" },
                    "Value": { "type": "text" }
                }
            },
            "NonIndexedNumber": {
                "type": "nested",
                "enabled": false,
                "properties": {
                    "APIName": { "type": "keyword" },
                    "Value": { "type": "float" }
                }
            },
            "NonIndexedBool": {
                "type": "nested",
                "enabled": false,
                "properties": {
                    "APIName": { "type": "keyword" },
                    "Value": { "type": "boolean" }
                }
            },
            "NonIndexedDate": {
                "type": "nested",
                "enabled": false,
                "properties": {
                    "APIName": { "type": "keyword" },
                    "Value": { "type": "date" }
                }
            }
        }
    }
};

/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/
async function install(client, request) {
    try {
        const service = new MyService(client);
        const headers = {
            "X-Pepperi-OwnerID": client.AddonUUID,
            "X-Pepperi-SecretKey": client.AddonSecretKey
        };
        // create schemas on adal - 
        // OpenCatalogSettings for list of open catalogs
        // OpenCatalogSecret for each open catalog his published version and secret key
        // OpenCatalogData for document each publish on open catalogs
        const bodySettingsTable = {
            Name: 'OpenCatalogSettings',
            Type: 'meta_data'
        };
        const bodySecretTable = {
            Name: 'OpenCatalogSecret',
            Type: 'meta_data'
        };
        const bodyDataTable = {
            Name: 'OpenCatalogData',
            Type: 'meta_data'
        };
        const responseSettingsTable = await service.papiClient.post('/addons/data/schemes', bodySettingsTable, headers);
        const responseSecretTable = await service.papiClient.post('/addons/data/schemes', bodySecretTable, headers);
        const responseDataTable = await service.papiClient.post('/addons/data/schemes', bodyDataTable, headers);
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
        const distributorUuid = C__git_Wsim_Wsim_BackEnd_OpenCatalog_serverSide_node_modules_jwtDecode_lib(client.OAuthAccessToken)['pepperi.distributoruuid'];
        await service.papiClient.post(`/addons/api/00000000-0000-0000-0000-00000e1a571c/internal/create_index?index_name=oc-${distributorUuid}`, OpenCatalogMapping.mappingOpenCatalog, headers);
        return { success: true, resultObject: {} };
    }
    catch (ex) {
        return { success: false, resultObject: { "Message": ex.message } };
    }
}
async function uninstall(client, request) {
    const service = new MyService(client);
    var headers = {
        "X-Pepperi-OwnerID": client.AddonUUID,
        "X-Pepperi-SecretKey": client.AddonSecretKey
    };
    // delete schemas on adal
    const responseSettingsTable = await service.papiClient.post('/addons/data/schemes/OpenCatalogSettings/purge', null, headers);
    const responseSecretTable = await service.papiClient.post('/addons/data/schemes/OpenCatalogSecret/purge', null, headers);
    const responseDataTable = await service.papiClient.post('/addons/data/schemes/OpenCatalogData/purge', null, headers);
    // PNS unsubscribe 
    const bodyPNS = {
        Name: 'DeleteVersionFromElasticSearch',
        Hidden: true,
        AddonUUID: "00000000-0000-0000-0000-00000ca7a109"
    };
    const responsePNS = await service.papiClient.post('/notification/subscriptions', bodyPNS, headers);
    const distributorUuid = C__git_Wsim_Wsim_BackEnd_OpenCatalog_serverSide_node_modules_jwtDecode_lib(client.OAuthAccessToken)['pepperi.distributoruuid'];
    await service.papiClient.post(`/addons/api/00000000-0000-0000-0000-00000e1a571c/internal/delete_index?index_name=oc-${distributorUuid}`, null, headers);
    return { success: true, resultObject: {} };
}
async function upgrade(client, request) {
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
    };
    const responsePNS = await service.papiClient.post('/notification/subscriptions', bodyPNS, headersPNS);
    return { success: true, resultObject: {} };
}
async function downgrade(client, request) {
    return { success: true, resultObject: {} };
}
async function token(client, request) {
    const service = new MyService(client);
    client.AddonUUID = "00000000-0000-0000-0000-00000ca7a109";
    const catalogSecret = request.query.addon_secret;
    let responseADAL = await service.papiClient.addons.data.uuid(client.AddonUUID).table('OpenCatalogSecret').key(catalogSecret).get();
    const claims = {
        'pepperi.addonkey': responseADAL['ElasticSearchSubType']
    };
    return { success: true, claims: claims };
}

exports.downgrade = downgrade;
exports.install = install;
exports.token = token;
exports.uninstall = uninstall;
exports.upgrade = upgrade;
