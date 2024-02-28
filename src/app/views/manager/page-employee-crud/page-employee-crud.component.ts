import {Component, OnInit} from '@angular/core';
import {PageCrudProps} from "../../../components/page-crud/page-crud.component";
import {EmployeeService} from "../../../services/employee/employee.service";
import {Validators} from "@angular/forms";
import {GenderService} from "../../../services/gender/gender.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'app-page-employee-crud',
    templateUrl: './page-employee-crud.component.html',
    styleUrls: ['./page-employee-crud.component.scss']
})
export class PageEmployeeCrudComponent implements OnInit {
    fields: any = {};
    fieldsFilter: any = {};
    pageProps: PageCrudProps = {
        create: true,
        update: true,
        delete: true,
        list: true,
        filter: true,
        paginate: true,
    };

    constructor(private router: Router, private route: ActivatedRoute, public employeeService: EmployeeService, public genderService: GenderService) {
    }

    showDetails = (row: any) => {
        console.log(row);
        this.router.navigate(['/manager/employee/' + row._id])
    }

    ngOnInit(): void {
        this.fields = {
            _id: {
                label: "id",
                inputType: "hidden",
                hidden: true,
            },
            nom: {
                label: "Nom",
                inputType: "text",
                validators: Validators.required,
                inColumn: true,
            },
            prenom: {
                label: "Prenom",
                inputType: "text",
                inColumn: true,
            },
            genre: {
                label: "Genre",
                inputType: "select",
                selectProps: {
                    selectData: async () => {
                        return this.genderService.findAll()
                    },
                    getterValueSelect: (item: any) => item._id,
                    getterTextSelect: (item: any) => item.nom
                },
                validators: Validators.required,
                inColumn: true,
            },
            email: {
                label: "Email",
                inputType: "email",
                validators: Validators.email,
                inColumn: true,
            }, password: {
                label: "Mot de passe",
                inputType: "password",
                validators: Validators.required,
                inColumn: false,
            },
            telephone: {
                label: "Téléphone",
                inputType: "text",
                validators: [Validators.required, Validators.pattern("^\\d{10}$")],
                inColumn: true,
            },
            date_naissance: {
                label: "Date de naissance",
                inputType: "date",
                validators: Validators.required,
                inColumn: true,
            },
            date_creation: {
                label: "Date d'embauche",
                inputType: "hidden",
            },
            photo: {
                label: "Photo",
                inputType: "img",
                inColumn: true,
            }
        }

        this.fieldsFilter = {
            nom: {
                label: "Nom",
                inputType: "text",
            },
            prenom: {
                label: "Prenom",
                inputType: "text",
            }
        }
    }

}
