import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "../../../../services/employee/employee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HoraireServiceService} from "../../../../services/horaire/horaire-service.service";
import {PageCrudProps} from "../../../../components/page-crud/page-crud.component";

@Component({
    selector: 'app-page-employee-detail',
    templateUrl: './page-employee-detail.component.html',
    styleUrls: ['./page-employee-detail.component.scss']
})
export class PageEmployeeDetailComponent implements OnInit {

    employee: any;
    horaireForm: FormGroup;
    success: any;
    message: any;
    fields: any = {};
    pageProps: PageCrudProps = {
        create: false,
        update: false,
        delete: false,
        list: true,
        filter: false,
        paginate: true,
    };

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private employeeService: EmployeeService, public horaireService: HoraireServiceService) {
        this.horaireForm = this.fb.group({
            horaireDebut: ['', Validators.required],
            horaireFin: ['', Validators.required],
        })
    }

    ngOnInit(): void {
        this.fields = {
            _id: {
                label: "id",
                inputType: "hidden",
                hidden: true,
            },
            date_debut: {
                label: "Date debut",
                inputType: "date",
                inColumn: true,
            },
            date_fin: {
                label: "Date fin",
                inputType: "date",
                inColumn: true,
            },
            heure_debut: {
                label: "Heure debut",
                inputType: "time",
                inColumn: true,
            },
            heure_fin: {
                label: "Heure fin",
                inputType: "time",
                inColumn: true,
            }
        }

        //   get id from url params
        this.route.params.subscribe(params => {
                const id = params['id'];
                console.log(id);
                this.employeeService.findOne(id).then(
                    (employee: any) => {
                        // @ts-ignore
                        this.employee = employee.data;
                    }
                );
            }
        );
    }

    onSubmit() {
        if (this.horaireForm.valid) {
            console.log('Form submitted:', this.horaireForm.value);
            let horaireDebut = this.horaireForm.get('horaireDebut')?.value;
            let horaireFin = this.horaireForm.get('horaireFin')?.value;
            let horaire = {
                heure_debut: horaireDebut,
                heure_fin: horaireFin
            }
            this.horaireService.saveHoraire(this.employee._id, horaire).subscribe((res: any) => {
                    console.log("res",res)
                    // check if res.code starts with 2xx
                    this.success = res.code===201 ?  true: false;
                    this.message = res.message;
                }
            )
        }
    }
}
