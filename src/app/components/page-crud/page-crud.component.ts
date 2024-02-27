import {Component, Inject, Input, OnInit} from '@angular/core';
import {CrudService} from 'src/app/services/crud/crud.service';
import {Column, FormProps} from '../interfaces';
import {ValidatorFn} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface PageCrudProps {
    create: boolean;
    update: boolean;
    delete: boolean;
    list: boolean;
    filter: boolean;
    paginate: boolean;
}

interface PageCrudFieldProps {
    inputType: string, //les type de input
    label: string, //le label du input ou colonne, s'il n'y en a pas, par défaut c'est le key
    inColumn: true, //si le champ est dans la liste
    selectProps?: {
        selectData: () => Promise<any>, //fonction pour prendre les données du select
        getterValueSelect: (item: any) => any, //fonction pour prendre la valeur qu'on va mettre dans le select
        getterTextSelect: (item: any) => any //fonction pour prendre le text qu'on va mettre dans le select
    },
    validators?: ValidatorFn | ValidatorFn[]; //les validateurs du input
}

@Component({
    selector: 'app-page-crud',
    templateUrl: './page-crud.component.html',
    styleUrls: ['./page-crud.component.scss']
})
export class PageCrudComponent implements OnInit {
    @Input() pageProps: PageCrudProps = {
        create: false,
        update: false,
        delete: false,
        list: false,
        filter: false,
        paginate: false
    };

    /* de la forme: {key: PageCrudFieldProps} */
    @Input() fields: any;

    /* de la forme: {key: PageCrudFieldProps} */
    @Input() fieldsFilter: any; //comme fields mais pour le filtre

    @Input() crudService!: CrudService;

    @Input() onRowClick?: (row: any) => void;


    constructor(public dialog: MatDialog) {
    }

    /* les données des listes */
    filterData: any = {};
    filterFormProps: FormProps = {
        inputs: {}, action: {
            label: "", submit: () => {
            }, color: ""
        }
    };
    currentPage: number = 0;
    lengthPage: number = 10;
    totalLength: number = 2;
    dataList: any[] = []; /* données de la liste */
    columns: Column[] = [];
    loaderList: boolean = false;

    /* fonction de changement de page */
    handlePageChange(page: number) {
        this.currentPage = page;
        this.getDataList();
    }

    /* pour le changement de filtre */
    handleChangeFilter(filterData: any) {
        this.filterData = filterData;
        this.getDataList();
    }

    /* les données des updates */
    updateFormProps?: FormProps;

    /* les données des creates */
    createFormProps: FormProps = {
        inputs: {}, action: {
            label: "", submit: () => {
            }, color: ""
        }
    };

    ngOnInit(): void {
        //traiter les colonnes des listes
        if (this.pageProps.list) {
            this.getDataList();
            this.buildColumns();
        }

        /* construire les formulaires de création et de modification */
        if (this.pageProps.create || this.pageProps.update) {
            this.buildUpdateCreateFormProps();
        }

        if (this.pageProps.filter) {
            //construire le formulaire des filtres
            this.buildFilterFormProps();
        }
    }


    /* prendre les données depuis un appel API */
    getDataList() {
        this.loaderList = true;
        this.crudService.findAll(this.getFilterData())
            .then((data: any) => {
                console.log("Data ", data.data)
                this.dataList = data;
                (data !== undefined && data !== null && !Array.isArray(data)) ? this.dataList = data.data : this.dataList = data;
                // console.log(data);
                this.loaderList = false;
            })
            .catch((err: any) => {
                console.error(err);
                this.loaderList = false;
            });
    }

    handleSubmitChange(status: string) {
        if (status == "success") {
            this.getDataList();
        }
    }

    buildColumns() {
        let cols: Column[] = [];
        Object.keys(this.fields).forEach((key: string) => {
            if (this.fields[key].inColumn) {
                cols.push({
                    name: this.fields[key].label || key,
                    selector: (row: any) => {
                        // row[key]
                        //   check if row[key] is an object
                        if (row[key] != null && row[key] != undefined && typeof row[key] === 'object') {
                            return row[key].nom;
                        }
                        // check if there an operator +-/* in the key
                        if (key.includes('*')) {
                            let operationRows = key.split('*');
                            let firstValue = this.getChildValue(row, operationRows[0]);
                            let secondValue = this.getChildValue(row, operationRows[1]);
                            if (operationRows.length == 3) {
                                return (firstValue * secondValue) / 100;
                            }
                            return firstValue * secondValue;
                        }
                        // check if key contains a dot
                        if (key.includes('.')) {
                            return this.getChildValue(row, key);
                        }
                        return row[key];
                    },
                    type: this.fields[key].inputType == "img" ? "img" : "text"
                });
            }
        });
        this.columns = cols;
    }

    getChildValue(obj: any, key: string) {
        let keys = key.split('.');
        let value = obj;
        try {
            for (let k of keys) {
                value = value[k];
            }
            return value;
        } catch (e) {
            return ''
        }
    }

    /* avoir les valeurs du filtre avec les paginations */
    getFilterData() {
        if (this.pageProps.paginate) {
            return {
                search: {
                    ...this.filterData,
                },
                page: {
                    size: this.lengthPage,
                    number: this.currentPage
                }
            }
        } else {
            return this.filterData;
        }
    }

    /* préparer les données de formulaire  */
    buildUpdateCreateFormProps() {
        /* la liste des champs du formulaire update/create */
        let inputs: any = {};

        //ajouter dans les inputs les champs qui sont dans le formulaire de mise à jour si le champs est à mettre à jour
        Object.keys(this.fields).forEach(async (key: string) => {
            inputs[key] = {
                label: this.fields[key].label || key,
                type: this.fields[key].inputType,
                validators: [],
                // this.fields[key].validators ||
                class: "w-100 fs-16"
            };
            //pour prendre les données du select
            if (this.fields[key].inputType == "select") {
                inputs[key].options = (await this.fields[key].selectProps.selectData()).data;
                console.log("Options ", inputs[key].options);
                inputs[key].getValue = this.fields[key].selectProps.getterValueSelect;
                inputs[key].getText = this.fields[key].selectProps.getterTextSelect;
            }

        });

        this.updateFormProps = {
            inputs: inputs,
            action: {
                label: "Modifier",
                submit: this.submitUpdate,
                color: "accent"
            },
            title: "Modifier " + this.crudService.crudName
        }
        this.createFormProps = {
            inputs: inputs,
            action: {
                label: "Ajouter",
                submit: this.submitCreate,
                color: "primary"
            },
            title: "Ajouter " + this.crudService.crudName
        }
    }

    submitUpdate = (obj: any) => {
        return new Promise((resolve, reject) => {
            this.crudService.update(obj._id, obj)
                .then((data: any) => {
                    this.getDataList();
                    resolve(data);
                }).catch((err: any) => {
                console.error(err);
                reject(err);
            });
        });
    }
    submitCreate = (obj: any) => {
        return new Promise((resolve, reject) => {
            this.crudService.create(obj)
                .then((data: any) => {
                    this.getDataList();
                    resolve(data);
                }).catch((err: any) => {
                console.error(err);
                reject(err);
            });
        });
    }

    /* construire le formulaire  */
    buildFilterFormProps() {
        /* la liste des champs du formulaire update/create */
        let inputs: any = {};

        //ajouter dans les inputs les champs qui sont dans le formulaire de mise à jour si le champs est à mettre à jour
        Object.keys(this.fieldsFilter).forEach(async (key: string) => {
            inputs[key] = {
                label: this.fieldsFilter[key].label || key,
                type: this.fieldsFilter[key].inputType,
                validators: this.fieldsFilter.validators || [],
                class: "me-24 fs-16"
            };
            if (key in this.filterData)
                inputs[key].default = this.filterData[key];
            //pour prendre les données du select
            if (this.fieldsFilter[key].inputType == "select") {
                inputs[key].options = await this.fieldsFilter[key].selectProps.selectData();
                inputs[key].getValue = this.fieldsFilter[key].selectProps.getterValueSelect;
                inputs[key].getText = this.fieldsFilter[key].selectProps.getterTextSelect;
            }

        });
        this.filterFormProps = {
            inputs: inputs,
            action: {
                color: "primary",
                label: "Filtrer",
                submit: (obj: any) => {
                    return new Promise((resolve, reject) => {
                        this.handleChangeFilter(obj);
                        resolve("ok");
                    });

                }
            }
        }
    }

    deleteAction = (id: any) => {
        return new Promise((resolve, reject) => {
            this.crudService.delete(id)
                .then((data: any) => {
                    this.getDataList();
                    resolve(data);
                }).catch((err: any) => {
                console.error(err);
                reject(err);
            });
        });

    }

    openCreateForm() {
        this.dialog.open(CreateFormComponent, {
            data: {
                handleSubmitChange: this.handleSubmitChange.bind(this),
                formProps: this.createFormProps
            },
            autoFocus: false,
            maxHeight: '90vh'
        })
    }
}

@Component({
    selector: 'app-create-from',
    templateUrl: './create-form.component.html',
    styleUrls: ['./page-crud.component.scss']
})
export class CreateFormComponent {

    formProps: FormProps = {
        inputs: {}, action: {
            label: "", submit: () => {
            }, color: ""
        }
    };
    handleSubmitChange: (status: string) => void = () => {
    };

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef: MatDialogRef<CreateFormComponent>) {
    }

    ngOnInit(): void {
        this.formProps = this.data.formProps;
        this.handleSubmitChange = (status: string) => {
            this.data.handleSubmitChange(status);
            if (status === "success") {
                this.dialogRef.close();
            }
        }
    }
}
