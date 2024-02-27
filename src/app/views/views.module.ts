import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { PageServiceCrudComponent } from './manager/page-service-crud/page-service-crud.component';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { FeatherModule } from 'angular-feather';
import { DemoFlexyModule } from '../demo-flexy-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { allIcons } from 'angular-feather/icons';
import { ClientProfilComponent } from './client/client-profil/client-profil.component';
import { BannerSpecialOfferComponent } from './client/banner-special-offer/banner-special-offer.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { AppointmentCalendarComponent } from './client/appointment-calendar/appointment-calendar.component';
import { AppointmentCreateComponent } from './client/appointment-create/appointment-create.component';
import { AppointmentPaymentComponent } from './client/appointment-payment/appointment-payment.component';
import { AppointmentUpdateComponent } from './client/appointment-update/appointment-update.component';
import { EmployeeProfilComponent } from './employee/employee-profil/employee-profil.component';
import { PageExpenseComponent } from './manager/page-expense/page-expense.component';
import { PageSpecialOfferComponent } from './manager/page-special-offer/page-special-offer.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import {RouterLinkWithHref} from "@angular/router";


import { PageTypeExpenseComponent } from './manager/page-type-expense/page-type-expense.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TestingComponent } from './testing/testing.component';
import { PageEmployeeCrudComponent } from './manager/page-employee-crud/page-employee-crud.component';
import { ClientEmployeePreferenceComponent } from './client/client-employee-preference/client-employee-preference.component';
import { ClientServicePreferenceComponent } from './client/client-service-preference/client-service-preference.component';
import { DetailsModalComponent } from './client/client-service-preference/details-modal/details-modal.component';
import { EmDetailsDialogComponent } from './client/client-employee-preference/em-details-dialog/em-details-dialog.component';
import { AppointmentCommissionComponent } from './employee/appointment-commission/appointment-commission.component';
import { DetailApppointmentDialogComponent, EmployeeCalendarComponent } from './employee/employee-calendar/employee-calendar.component';
import { AppointmentNumberComponent } from './stat/appointment-number/appointment-number.component';
import { DashboardBSComponent } from './dashboard-bs/dashboard-bs.component';
import { PageEmployeeDetailComponent } from './manager/page-employee-crud/page-employee-detail/page-employee-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WorktimeComponent } from './manager/statistics/worktime/worktime.component';
import { TurnoverComponent } from './manager/statistics/turnover/turnover.component';
import { IncomeComponent } from './manager/statistics/income/income.component';


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
        ClientProfilComponent,
        RegisterClientComponent,
        PageEmployeeCrudComponent,
        ClientEmployeePreferenceComponent,
        ClientServicePreferenceComponent,
        DetailsModalComponent,
        EmDetailsDialogComponent,
        AppointmentCommissionComponent,
        EmployeeCalendarComponent,
        AppointmentNumberComponent,
        DashboardBSComponent,
        PageEmployeeDetailComponent,
        DetailApppointmentDialogComponent,
        NotFoundComponent,
        WorktimeComponent,
        TurnoverComponent,
        IncomeComponent
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
        NgApexchartsModule,
        RouterLinkWithHref,
        NgOptimizedImage
    ]
})
export class ViewsModule { }
