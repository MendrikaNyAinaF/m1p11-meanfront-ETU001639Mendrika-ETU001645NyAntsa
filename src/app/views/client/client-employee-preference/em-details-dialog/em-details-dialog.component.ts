import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DateUtilService} from "../../../../services/utils/date-util.service";

@Component({
    selector: 'app-em-details-dialog',
    templateUrl: './em-details-dialog.component.html',
    styleUrls: ['./em-details-dialog.component.scss']
})
export class EmDetailsDialogComponent implements OnInit {
    selectedEmployee: any;

    constructor(@Inject(MAT_DIALOG_DATA) public employee: any) {
        console.log("Employee : ", employee);
        this.selectedEmployee = employee;
    }

    ngOnInit(): void {
    }

    protected readonly DateUtilService = DateUtilService;
}
