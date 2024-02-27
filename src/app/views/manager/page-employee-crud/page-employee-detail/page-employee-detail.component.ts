import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "../../../../services/employee/employee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HoraireServiceService} from "../../../../services/horaire/horaire-service.service";

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

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private employeeService: EmployeeService, private horaireService: HoraireServiceService) {
        this.horaireForm = this.fb.group({
            horaireDebut: ['', Validators.required],
            horaireFin: ['', Validators.required],
        })
    }

    ngOnInit(): void {
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
