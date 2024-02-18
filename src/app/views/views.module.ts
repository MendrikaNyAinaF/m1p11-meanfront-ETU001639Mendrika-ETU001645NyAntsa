import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageServiceCrudComponent } from './manager/page-service-crud/page-service-crud.component';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { FeatherModule } from 'angular-feather';
import { DemoFlexyModule } from '../demo-flexy-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { allIcons } from 'angular-feather/icons';
import { AppointmentCalendarComponent } from './client/appointment-calendar/appointment-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentCreateComponent } from './client/appointment-create/appointment-create.component';
import { AppointmentUpdateComponent } from './client/appointment-update/appointment-update.component';
import { PageTypeExpenseComponent } from './manager/page-type-expense/page-type-expense.component';
import { AppointmentPaymentComponent } from './client/appointment-payment/appointment-payment.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { TestingComponent } from './testing/testing.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { EmployeeProfilComponent } from './employee/employee-profil/employee-profil.component';
import { PageExpenseComponent } from './manager/page-expense/page-expense.component';
import { PageSpecialOfferComponent } from './manager/page-special-offer/page-special-offer.component';
import { BannerSpecialOfferComponent } from './client/banner-special-offer/banner-special-offer.component';
import { ClientProfilComponent } from './client/client-profil/client-profil.component';



@NgModule({
    declarations: [
        PageServiceCrudComponent,
        LoginComponent,
        AppointmentCalendarComponent,
        AppointmentCreateComponent,
        AppointmentUpdateComponent,
        PageTypeExpenseComponent,
        AppointmentPaymentComponent,
        BarChartComponent,
        TestingComponent,
        SpinnerComponent,
        EmployeeProfilComponent,
        PageExpenseComponent,
        PageSpecialOfferComponent,
        BannerSpecialOfferComponent,
        ClientProfilComponent
    ],
    exports: [
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        FeatherModule.pick(allIcons),
        DemoFlexyModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FullCalendarModule,
        ReactiveFormsModule,
        NgApexchartsModule
    ]
})
export class ViewsModule { }
