import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnInit,
    ViewEncapsulation,
    Compiler,
    ViewChild,
    OnDestroy,
    TemplateRef,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FIELD_TYPE, PepFieldData, PepLayoutService, PepRowData, PepScreenSizeType, PepDataConvertorService } from '@pepperi-addons/ngx-lib';
import { AddonService } from './addon.service';
import { PepListComponent } from "@pepperi-addons/ngx-lib/list";
import { PepMenuItem } from "@pepperi-addons/ngx-lib/menu";
import { PepDialogActionButton, PepDialogData, PepDialogService } from "@pepperi-addons/ngx-lib/dialog";
import { AppService } from "../../app.service";
import { MatDialogRef } from "@angular/material/dialog";
import { IScheduledJob } from '../scheduler-job/scheduler-job.model';


@Component({
    selector: 'addon-addon',
    templateUrl: './addon.component.html',
    styleUrls: ['./addon.component.scss']
})
export class AddonComponent implements OnInit {
    screenSize: PepScreenSizeType;
    @ViewChild("openCatalogList") openCatalogList: PepListComponent;
    @ViewChild("openCatalogHistoryList") openCatalogHistoryList: PepListComponent;
    @ViewChild('selectCatalogDialogTemplate', { read: TemplateRef })
    selectCatalogDialogTemplate: TemplateRef<any>;
    @ViewChild('revokeAccessKeyDialogTemplate', { read: TemplateRef })
    revokeAccessKeyDialogTemplate: TemplateRef<any>;
    @ViewChild('deleteOpenCatalogDialogTemplate', { read: TemplateRef })
    deleteOpenCatalogDialogTemplate: TemplateRef<any>;
    @ViewChild('publishDialogTemplate', { read: TemplateRef })
    publishDialogTemplate: TemplateRef<any>;
    selectedCatalog;
    openCatalogData;
    openCatalogs;
    openCatalog;
    openCatalogsHistory;
    openCatalogHistory;
    openCatalogsJob;
    selectedJob;
    publishComment = '';
    catalogs;
    updateStatusInterval;
    isMain = true;
    disableActions = true;
    menuItems: Array<PepMenuItem>;
    chooseCatalogDialog: MatDialogRef<any>;
    revokeAccessKeyDialog: MatDialogRef<any>;
    deleteOpenCatalogDialog: MatDialogRef<any>;
    publishDialog: MatDialogRef<any>;
    menuActions = [
        { key: 'edit', value: 'Edit' },
        { key: 'delete', value: 'Delete' }
    ];

    constructor(
        public pluginService: AddonService,
        private translate: TranslateService,
        public routeParams: ActivatedRoute,
        public router: Router,
        public compiler: Compiler,
        public layoutService: PepLayoutService,
        private dataConvertorService: PepDataConvertorService,
        private dialogService: PepDialogService,
        private appService: AppService
    ) {

        // Parameters sent from url
        this.pluginService.pluginUUID = this.routeParams.snapshot.params['addon_uuid'];
        let userLang = "en";
        translate.setDefaultLang(userLang);
        userLang = translate.getBrowserLang().split("-")[0]; // use navigator lang if available
        translate.use(userLang);
        this.layoutService.onResize$.subscribe(size => {
            this.screenSize = size;
        });
    }

    ngOnInit(): void {
        this.init();
    }

    init() {
        this.appService.getAddonServerAPI('settings', 'getOpenCatalogSettings', {}).subscribe((result: any) => {
            this.openCatalogData = result;
            this.openCatalogs = result.OpenCatalogs;
            this.openCatalogsHistory = result.OpenCatalogsHistory;
            this.openCatalogsJob = result.OpenCatalogsJob;
            if (this.openCatalogHistory) {
                this.openCatalogHistory = this.openCatalogsHistory.filter(x => x.ActivityTypeDefinitionUUID == this.openCatalog.ATDUUID);
                this.loadOpenCatalogHistory(this.openCatalogHistory);
            }
            this.openCatalogHistory = this.openCatalogHistory ? this.openCatalogsHistory.filter(x => x.ActivityTypeDefinitionUUID == this.openCatalog.ATDUUID) : this.openCatalogHistory;
            this.pluginService.catalogs = result.Catalogs;
            this.loadOpenCatalogs(this.openCatalogs);
        });
    }

    loadOpenCatalogs(openCatalogs) {
        if (this.openCatalogList && openCatalogs) {
            const tableData = new Array<PepRowData>();
            openCatalogs.forEach((openCatalog: any) => {
                const allKeys = ["OpenCatalogName", "CatalogName", "ATDName", "LastPublishDate"];
                tableData.push(
                    this.convertOpenCatalogToPepRowData(openCatalog, allKeys)
                );
            });
            if (tableData.length > 0) {
                const uiControl = this.dataConvertorService.getUiControl(
                    tableData[0]
                );
                const rows = this.dataConvertorService.convertListData(
                    tableData
                );

                rows.map((row, i) => {
                    row.UID = openCatalogs[i].UUID || row.UID;
                });

                setTimeout(() => {
                    this.openCatalogList.initListData(uiControl, rows.length, rows);
                }, 0);
            }
        }
    }

    convertOpenCatalogToPepRowData(openCatalog: any, customKeys = null) {
        const row = new PepRowData();
        row.Fields = [];
        const keys = customKeys ? customKeys : Object.keys(openCatalog);
        keys.forEach(key => row.Fields.push(this.initOpenCatalogDataRowField(openCatalog, key)));
        return row;
    }

    initOpenCatalogDataRowField(openCatalog: any, key: any): PepFieldData {

        const dataRowField: PepFieldData = {
            ApiName: key,
            Title: this.translate.instant(key),
            XAlignment: 1,
            FormattedValue: openCatalog[key] ? openCatalog[key].toString() : '',
            Value: openCatalog[key] ? openCatalog[key].toString() : '',
            ColumnWidth: 10,
            AdditionalValue: '',
            OptionalValues: [],
            FieldType: FIELD_TYPE.TextBox
        };

        switch (key) {
            case 'OpenCatalogName':
                dataRowField.ColumnWidth = 25;
                dataRowField.Title = 'Name';
                dataRowField.AdditionalValue = openCatalog["Key"] ? openCatalog["Key"].toString() : '';
                break;
            case 'CatalogName':
                dataRowField.ColumnWidth = 25;
                dataRowField.Title = 'Catalog';
                break;
            case 'ATDName':
                dataRowField.ColumnWidth = 25;
                dataRowField.Title = 'Transaction Type';
                dataRowField.FieldType = FIELD_TYPE.InternalLink;
                dataRowField.Value = "settings/354c5123-a7d0-4f52-8fce-3cf1ebc95314/editor?view=sa_transactiontypes";//`settings/04de9428-8658-4bf7-8171-b59f6327bbf1/transaction_types/${openCatalog["Key"]}/general`;
                break;
            case 'LastPublishDate':
                dataRowField.ColumnWidth = 25;
                dataRowField.Title = 'Last Published Date';
                if (openCatalog[key]) {
                    var datetime = new Date(openCatalog[key].toString());
                    dataRowField.FormattedValue = datetime.toUTCString();
                }

                break;
            default:
                dataRowField.ColumnWidth = 0;
                break;
        }

        return dataRowField;
    }

    loadOpenCatalogHistory(openCatalogHistory) {
        if (this.openCatalogHistoryList && openCatalogHistory) {
            const tableData = new Array<PepRowData>();
            openCatalogHistory.forEach((openCatalog: any) => {
                const allKeys = ["CreationDateTime", "Version", "PublishedBy", "Comment", "Status"];
                tableData.push(
                    this.convertOpenCatalogHistoryToPepRowData(openCatalog, allKeys)
                );
            });
            if (tableData.length > 0) {
                const uiControl = this.dataConvertorService.getUiControl(
                    tableData[0]
                );
                const rows = this.dataConvertorService.convertListData(
                    tableData
                );

                rows.map((row, i) => {
                    row.UID = openCatalogHistory[i].UUID || row.UID;
                });
                setTimeout(() => {
                    this.openCatalogHistoryList.initListData(uiControl, rows.length, rows);
                }, 0);

            }
            else {
                this.openCatalogHistoryList.initListData(null, 0, []);
            }
        }
    }

    convertOpenCatalogHistoryToPepRowData(openCatalogHistory: any, customKeys = null) {
        const row = new PepRowData();
        row.Fields = [];
        const keys = customKeys ? customKeys : Object.keys(openCatalogHistory);
        keys.forEach(key => row.Fields.push(this.initOpenCatalogHistoryDataRowField(openCatalogHistory, key)));
        return row;
    }

    initOpenCatalogHistoryDataRowField(openCatalogHistory: any, key: any): PepFieldData {

        const dataRowField: PepFieldData = {
            ApiName: key,
            Title: this.translate.instant(key),
            XAlignment: 1,
            FormattedValue: openCatalogHistory[key] ? openCatalogHistory[key].toString() : '',
            Value: openCatalogHistory[key] ? openCatalogHistory[key].toString() : '',
            ColumnWidth: 10,
            AdditionalValue: '',
            OptionalValues: [],
            FieldType: FIELD_TYPE.TextBox
        };

        switch (key) {
            case 'CreationDateTime':
                dataRowField.ColumnWidth = 12;
                dataRowField.Title = 'Date';
                if (openCatalogHistory[key]) {
                    var datetime = new Date(openCatalogHistory[key].toString());
                    dataRowField.FormattedValue = datetime.toUTCString();
                }
                break;
            case 'Version':
                dataRowField.ColumnWidth = 5;
                dataRowField.Title = 'Version';
                break;
            case 'PublishedBy':
                dataRowField.ColumnWidth = 7;
                dataRowField.Title = 'Published By';
                break;
            case 'Comment':
                dataRowField.ColumnWidth = 10;
                dataRowField.Title = 'Comment';
                dataRowField.FieldType = FIELD_TYPE.TextArea;
                break;
            case 'Status':
                dataRowField.ColumnWidth = 10;
                dataRowField.Title = 'Status';
                dataRowField.FieldType = FIELD_TYPE.TextArea;
                break;
            default:
                dataRowField.ColumnWidth = 0;
                break;
        }

        return dataRowField;
    }

    onListChange(event) {
    }

    onCustomizeFieldClick(event) {
    }

    onSwitchPage(isMain) {
        this.isMain = isMain;
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 0);
    }

    onOpenCatalogActionClicked(action, tabs) {
        const typeListID = this.openCatalogList.getSelectedItemsData().rows[0];
        const typeData = this.openCatalogList.getItemDataByID(typeListID.toString());
        var openCatalogID = typeData.Fields[0].AdditionalValue;
        this.openCatalog = this.openCatalogs.find(x => x.Key == openCatalogID);
        if (this.openCatalogsJob?.length) {
            this.selectedJob = this.openCatalogsJob.find(x => x.Key == openCatalogID);
        }
        if (action.key == 'edit') {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 0);
            this.onSwitchPage(false);
            if (this.openCatalog.PublishMode == false) {
                this.onUpdateStatus();
            }
            this.openCatalogHistory = this.openCatalogsHistory.filter(x => x.ActivityTypeDefinitionUUID == this.openCatalog.ATDUUID);
            this.loadOpenCatalogHistory(this.openCatalogHistory);

        }
        else if (action.key == 'delete') {
            this.onDeleteOpenCatalogDialog();
        }

    }

    onAddOpenCatalogClicked() {
        this.chooseCatalogDialog = this.dialogService.openDialog(
            this.selectCatalogDialogTemplate,
            ''
        );
        this.chooseCatalogDialog.afterClosed().subscribe((value) => {
        });
    }

    onAddOpenCatalogDialog() {
        const catalog = this.pluginService.getCatalog(this.selectedCatalog);
        const body = { catalogID: catalog.InternalID, catalogName: catalog.ExternalID };
        this.chooseCatalogDialog.close();
        this.appService.postAddonServerAPI('settings', 'createNewOpenCatalog', body, {})
            .subscribe((result: any) => {
                const success = result.Success;
                if (success == true) {
                    this.openCatalog = result.OpenCatalog;
                    this.openCatalogs.push(result.OpenCatalog);
                    this.onSwitchPage(false);
                    this.loadOpenCatalogs(this.openCatalogs);
                }
                else {
                    this.openInfoDialog('Error', 'Open_Catalog_MESSAGES.AddFailed', `${result.ErrorMessage}`)
                }
            });
    }

    onCloseRevokeAccessKeyDialog() {
        this.revokeAccessKeyDialog.close();
    }

    onCloseDeleteOpenCatalogDialog() {
        this.deleteOpenCatalogDialog.close();
    }

    onRevokeAccessKeyDialog() {
        this.revokeAccessKeyDialog = this.dialogService.openDialog(
            this.revokeAccessKeyDialogTemplate,
            ''
        );
        this.revokeAccessKeyDialog.afterClosed().subscribe((value) => {
        });
    }

    onDeleteOpenCatalogDialog() {
        this.deleteOpenCatalogDialog = this.dialogService.openDialog(
            this.deleteOpenCatalogDialogTemplate,
            ''
        );
        this.deleteOpenCatalogDialog.afterClosed().subscribe((value) => {
        });
    }

    openInfoDialog(titleResource: string, contentResource: string, additionalContent?: string, callback?: any) {
        var title = this.translate.instant(titleResource);
        var content = this.translate.instant(contentResource);
        content = additionalContent ? `${content} ${additionalContent}` : content;
        const actionButton: PepDialogActionButton = {
            title: "OK",
            className: "",
            callback: callback,
        };

        const dialogData = new PepDialogData({
            title: title,
            content: content,
            actionButtons: [actionButton],
            actionsType: "cancel-ok",
        });
        this.dialogService
            .openDefaultDialog(dialogData)
            .afterClosed()
            .subscribe((callback) => {
            });
    }

    onValueChange(event, key): void {
        const input = event.target ? event.target.value : event;
        this.openCatalog[key] = input.value;
    }

    onDone(tabs) {
        this.onSwitchPage(true);
        tabs.selectedIndex = 0;
        clearInterval(this.updateStatusInterval);
    }

    onPreview() {
        // will create an instance of this ATD and will navigate to it by a deep link to the order center
        const body = { atdID: this.openCatalog.Key };
        this.appService.postAddonServerAPI('settings', 'getPreviewTransaction', body, {})
            .subscribe((result: any) => {
                const success = result.Success;
                if (success == true) {
                    var transactionUUID = result.TransactionUUID;
                    const url = "transactions/scope_items/" + transactionUUID;
                    var win = window.open(url, '_blank');
                    win.focus();
                }
                else {
                    this.openInfoDialog('Error', 'Open_Catalog_MESSAGES.PreviewFailed', `${result.ErrorMessage}`)
                }
            });

    }

    onStop() {
        const body = { atdID: this.openCatalog.Key, atdUUID: this.openCatalog.ATDUUID };
        clearInterval(this.updateStatusInterval);
        this.openCatalog.Status = '';
        this.openCatalog.PublishMode = true;
        this.appService.postAddonServerAPI('settings', 'stopPublishOpenCatalog', body, {})
            .subscribe((result: any) => {
                const success = result.Success;
                if (success == true) {
                    this.init();
                }
                else {
                    this.openInfoDialog('Error', 'Open_Catalog_MESSAGES.StopFailed')
                }
            });

    }

    onPublish() {
        this.publishDialog = this.dialogService.openDialog(
            this.publishDialogTemplate,
            ''
        );
        this.publishDialog.afterClosed().subscribe((value) => {
        });
    }

    onPublishOpenCatalog() {
        // need to do async call
        const body = { atdID: this.openCatalog.Key, atdSecret: this.openCatalog.AccessKey, comment: this.publishComment };
        this.publishDialog.close();
        this.publishComment == '';
        this.openCatalog.PublishMode = false;
        this.openCatalog.Status = 'Start publish';
        this.appService.postAddonServerAPI('settings', 'publishOpenCatalog', body, {})
            .subscribe((result: any) => {
                const success = result.Success;
                if (success == true) {
                    result.OpenCatalog.Status = 'Start publish';
                    this.openCatalog = result.OpenCatalog;
                    this.onUpdateStatus();
                }
                else {
                    this.openCatalog.PublishMode = true;
                    this.openInfoDialog('Error', 'Open_Catalog_MESSAGES.PublishFailed');
                    this.init();
                }
            });
    }

    onTabChange() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 0);
    }

    onUpdateStatus() {
        var that = this;
        this.updateStatusInterval = setInterval(function () {
            //code goes here that will be run every 3 seconds.   
            //adal call to update status
            const body = { atdUUID: that.openCatalog.ATDUUID, version: that.openCatalog.LatestVersion };
            that.appService.postAddonServerAPI('settings', 'getOpenCatalogVersionData', body, {})
                .subscribe((result: any) => {
                    const success = result.Success;
                    if (success == true) {
                        var openCatalogData = result.OpenCatalogData;
                        if (openCatalogData.Status == 'Done') {
                            that.openCatalog.Status = '';
                            that.openCatalog.PublishMode = true;
                            clearInterval(that.updateStatusInterval);
                            that.init();
                        }
                        else if (openCatalogData.Status.includes('Fail')) {
                            that.openCatalog.Status = '';
                            that.openCatalog.PublishMode = true;
                            that.openInfoDialog('Error', 'Open_Catalog_MESSAGES.PublishFailed');
                            clearInterval(that.updateStatusInterval);
                            that.init();
                        }
                        else if (openCatalogData.StopPublish == true) {
                            that.openCatalog.Status = '';
                            that.openCatalog.PublishMode = true;
                            clearInterval(that.updateStatusInterval);
                            that.init();
                        }
                        else {
                            that.openCatalog.Status = openCatalogData.Status;
                        }
                        //update status field
                    }
                    else {
                        that.openCatalog.Status = '';
                        that.openCatalog.PublishMode = true;
                        that.openInfoDialog('Error', 'Open_Catalog_MESSAGES.PublishFailed');
                        clearInterval(that.updateStatusInterval);

                    }
                });
        }, 1500);
    }

    onOpenCatalogNameSave() {
        const body = { atdID: this.openCatalog.Key, openCatalogName: (this.openCatalog.OpenCatalogName == undefined ? '' : this.openCatalog.OpenCatalogName.toString()) };
        this.appService.postAddonServerAPI('settings', 'saveOpenCatalogName', body, {})
            .subscribe((result: any) => {
                const success = result.Success;
                if (success == true) {
                    this.loadOpenCatalogs(this.openCatalogs);
                }
                else {
                    this.openInfoDialog('Error', 'Open_Catalog_MESSAGES.SaveNameFailed', `${result.ErrorMessage}`)
                }
            });
    }

    onCopyToClipboard() {
        var valueToCopy = this.openCatalog.AccessKey;
        const el = document.createElement('textarea');
        el.value = valueToCopy;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    onRevokeAccessKey() {
        const body = { accessKey: this.openCatalog.AccessKey, atdID: this.openCatalog.Key };
        this.revokeAccessKeyDialog.close();
        this.appService.postAddonServerAPI('settings', 'revokeAccessKey', body, {})
            .subscribe((result: any) => {
                const success = result.Success;
                if (success) {
                    this.openCatalog.AccessKey = result.AccessKey;
                }
                else {
                    this.openInfoDialog('Error', 'Open_Catalog_MESSAGES.RevokeFailed', `${result.ErrorMessage}`)
                }
            });
    }

    onDeleteOpenCatalog() {
        const atdID = this.openCatalog.Key;
        const body = { atdID: atdID, atdUUID: this.openCatalog.ATDUUID, accessKey: this.openCatalog.AccessKey };
        this.deleteOpenCatalogDialog.close();
        this.appService.postAddonServerAPI('settings', 'deleteOpenCatalog', body, {})
            .subscribe((result: any) => {
                const success = result.Success;
                if (success == true) {
                    this.openCatalogs = this.openCatalogs.filter(x => x.Key != atdID);
                    this.loadOpenCatalogs(this.openCatalogs);
                }
                else {
                    this.openInfoDialog('Error', 'Open_Catalog_MESSAGES.DeleteFailed', `${result.ErrorMessage}`)
                }
            });
    }

    onSchedulingSave() {
    }

    onValueChanged(event) {
        this[event.key] = event.value;
    }

    selectedRowsChanged(selectedRowsCount) {
        if (selectedRowsCount == 0) {
            this.disableActions = true;
        }
        else {
            this.disableActions = false;
        }
    }

    onSaveCatalogClicked(job: IScheduledJob) {
        let body: any = {};
        Object.assign(body, job);
        body.Key = this.openCatalog.Key;
       
        this.appService.postAddonServerAPI('settings', 'saveOpenCatalogJob', body, {})
            .subscribe((result: any) => {
                const success = result.Success;
                if (success == true) {
                    this.loadOpenCatalogs(this.openCatalogs);
                }
                else {
                    this.openInfoDialog('Error', 'Open_Catalog_MESSAGES.SaveScheduledJobFailed', `${result.ErrorMessage}`)
                }
            }); 
    }

}
