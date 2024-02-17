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
import { BarChartComponent } from './bar-chart/bar-chart.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { TestingComponent } from './testing/testing.component';



@NgModule({
  declarations: [
    PageServiceCrudComponent,
    LoginComponent,
    AppointmentCalendarComponent,
    AppointmentCreateComponent,
    AppointmentUpdateComponent,
    PageTypeExpenseComponent,
    BarChartComponent,
    TestingComponent
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
        NgApexchartsModule
    ]
})
export class ViewsModule { }
