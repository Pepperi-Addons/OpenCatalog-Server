import jwt from 'jwt-decode';
import { PapiClient } from '@pepperi-addons/papi-sdk';
import { Injectable } from '@angular/core';

import { PepAddonService, PepHttpService, PepDataConvertorService, PepSessionService } from '@pepperi-addons/ngx-lib';

import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';

@Injectable({ providedIn: 'root' })
export class AddonService {
    accessToken = '';
    parsedToken: any
    papiBaseURL = ''
    pluginUUID;
    _catalogs: any[] = [];

    get papiClient(): PapiClient {
        return new PapiClient({
            baseURL: this.papiBaseURL,
            token: this.session.getIdpToken(),
            addonUUID: this.pluginUUID,
            suppressLogging: true
        })
    }

    get catalogs() {
        return this._catalogs;
    }

    set catalogs(list: any[]) {
        this._catalogs = list;
    }

    getCatalog(id: string) {
        if (id) {
            return this._catalogs.find(x => x.InternalID == id);
        } else {
            return null;
        }
    }

    constructor(
        public addonService: PepAddonService
        , public session: PepSessionService
        , public httpService: PepHttpService
        , public pepperiDataConverter: PepDataConvertorService
        , public dialogService: PepDialogService
    ) {
        const accessToken = this.session.getIdpToken();
        this.parsedToken = jwt(accessToken);
        this.papiBaseURL = this.parsedToken["pepperi.baseurl"]
    }

    getCronExpressionDay(day: string) {
        switch (day) {
            case 'sunday':
                return '1';
            case 'monday':
                return '2';
            case 'tuesday':
                return '3';
            case 'wednesday':
                return '4';
            case 'thursday':
                return '5';
            case 'friday':
                return '6';
            case 'saterday':
                return '7';
            default: '*';
        }
    }

}
