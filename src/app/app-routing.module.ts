import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlertsComponent} from './components/alerts/alerts.component';
import {ButtonsComponent} from './components/buttons/buttons.component';
import {ChipsComponent} from './components/chips/chips.component';
import {ExpansionComponent} from './components/expansion/expansion.component';
import {FormsComponent} from './components/forms/forms.component';
import {GridListComponent} from './components/grid-list/grid-list.component';
import {MenuComponent} from './components/menu/menu.component';
import {ProgressSnipperComponent} from './components/progress-snipper/progress-snipper.component';
import {ProgressComponent} from './components/progress/progress.component';
import {SlideToggleComponent} from './components/slide-toggle/slide-toggle.component';
import {SliderComponent} from './components/slider/slider.component';
import {SnackbarComponent} from './components/snackbar/snackbar.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {TooltipsComponent} from './components/tooltips/tooltips.component';
import {ProductComponent} from './dashboard/dashboard-components/product/product.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FullComponent} from './layouts/full/full.component';
import {SinglePageComponent} from './components/single-page/single-page.component';
import {PageServiceCrudComponent} from './views/manager/page-service-crud/page-service-crud.component';
import {LoginComponent} from './views/login/login.component';
import {AppointmentCalendarComponent} from './views/client/appointment-calendar/appointment-calendar.component';
import {PageTypeExpenseComponent} from './views/manager/page-type-expense/page-type-expense.component';
import {AppointmentPaymentComponent} from './views/client/appointment-payment/appointment-payment.component';
import {BarChartComponent} from './views/bar-chart/bar-chart.component';
import {TestingComponent} from "./views/testing/testing.component";
import {EmployeeProfilComponent} from './views/employee/employee-profil/employee-profil.component';
import {ClientLayoutComponent} from './layouts/client-layout/client-layout.component';
import {ClientProfilComponent} from './views/client/client-profil/client-profil.component';
import {ManagerLayoutComponent} from './layouts/manager-layout/manager-layout.component';
import {EmployeeLayoutComponent} from './layouts/employee-layout/employee-layout.component';
import {RegisterClientComponent} from "./views/register-client/register-client.component";
import {PageEmployeeCrudComponent} from "./views/manager/page-employee-crud/page-employee-crud.component";
import {
    ClientServicePreferenceComponent
} from "./views/client/client-service-preference/client-service-preference.component";
import {
    ClientEmployeePreferenceComponent
} from "./views/client/client-employee-preference/client-employee-preference.component";
import {AppointmentCommissionComponent} from "./views/employee/appointment-commission/appointment-commission.component";

const routes: Routes = [
    {
        path: ":person/login", // allowed values for person: manager, client, employee
        component: LoginComponent,
    }, {
        path: "client/register",
        component: RegisterClientComponent
    },
    /**client */
    {
        path: "",
        component: ClientLayoutComponent,
        children: [
            {path: "client/appointment", component: AppointmentCalendarComponent},
            {path: "client/appointment/:id/payment", component: AppointmentPaymentComponent},
            {path: "client/profil", component: ClientProfilComponent},
            {path: "alerts", component: AlertsComponent},
            {path: "client/services/preference", component: ClientServicePreferenceComponent},
            {path: "client/employees/preference", component: ClientEmployeePreferenceComponent}
        ]
    },
    /**manager */
    {
        path: "",
        component: ManagerLayoutComponent,
        children: [
            {path: "manager/services", component: PageServiceCrudComponent},
            {path: "manager/type-expenses", component: PageTypeExpenseComponent},
            {path: "progress", component: ProgressComponent},
            {path: "employee", component: PageEmployeeCrudComponent}
        ]
    },
    /**Employee */
    {
        path: "",
        component: EmployeeLayoutComponent,
        children: [
            {path: "employee/profil", component: EmployeeProfilComponent},
            {path: "chips", component: ChipsComponent},
            {path: "appointments/commission", component : AppointmentCommissionComponent}
        ]
    },
    {
        path: "",
        component: FullComponent,
        children: [
            {path: "", redirectTo: "/home", pathMatch: "full"},
            {path: "home", component: DashboardComponent},
            {path: "forms", component: FormsComponent},
            {path: "table", component: ProductComponent},
            {path: "grid-list", component: GridListComponent},
            {path: "menu", component: MenuComponent},
            {path: "tabs", component: TabsComponent},
            {path: "expansion", component: ExpansionComponent},
            {path: "toolbar", component: ToolbarComponent},
            {path: "progress-snipper", component: ProgressSnipperComponent},
            {path: "snackbar", component: SnackbarComponent},
            {path: "slider", component: SliderComponent},
            {path: "slide-toggle", component: SlideToggleComponent},
            {path: "tooltip", component: TooltipsComponent},
            {path: "button", component: ButtonsComponent},
            {path: "singlepage", component: SinglePageComponent},
            {path: "service", component: PageServiceCrudComponent},
            {path: "client/appointement", component: AppointmentCalendarComponent},
            {path: "client/appointment/:id/payment", component: AppointmentPaymentComponent},
            {path: "manager/type-expense", component: PageTypeExpenseComponent},
            //     Ny Antsa
            //     path for bar chart
            {path: "bar-chart", component: BarChartComponent},
            {path: "testing", component: TestingComponent}
        ]
    },


    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "**", redirectTo: "/home", pathMatch: "full"},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
