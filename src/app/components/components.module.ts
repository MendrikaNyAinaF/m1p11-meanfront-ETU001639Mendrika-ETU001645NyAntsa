import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsComponent } from './forms/forms.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { GridListComponent } from './grid-list/grid-list.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ProgressComponent } from './progress/progress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TooltipsComponent } from './tooltips/tooltips.component'
import { RowDeleteDialogComponent, RowEditDialogComponent, TableComponent } from './table/table.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { DialogValidationComponent } from './dialog-validation/dialog-validation.component';
import { SelectComponent } from './forms-input/select/select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputComponent } from './forms-input/input/input.component';
import { ImageInputComponent } from './forms-input/image-input/image-input.component';
import { InputsComponent } from './forms-input/inputs/inputs.component';
import { FormComponent } from './form/form.component';
import { TablePaginateComponent } from './table-paginate/table-paginate.component';
import { CreateFormComponent, PageCrudComponent } from './page-crud/page-crud.component';
import { CheckboxComponent } from './forms-input/checkbox/checkbox.component';
import { OnePageCrudComponent } from './one-page-crud/one-page-crud.component';
@NgModule({
  declarations: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    TooltipsComponent,
    TableComponent,
    SinglePageComponent,
    RowEditDialogComponent,
    RowDeleteDialogComponent,
    DialogValidationComponent,
    SelectComponent,
    InputComponent,
    ImageInputComponent,
    InputsComponent,
    FormComponent,
    TablePaginateComponent,
    PageCrudComponent,
    CheckboxComponent,
    CreateFormComponent,
    OnePageCrudComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    TableComponent,
    SinglePageComponent,
    RowEditDialogComponent,
    RowDeleteDialogComponent,
    DialogValidationComponent,
    SelectComponent,
    InputComponent,
    ImageInputComponent,
    InputsComponent,
    FormComponent,
    TablePaginateComponent,
    CreateFormComponent,
    PageCrudComponent,
    OnePageCrudComponent
  ]
})
export class ComponentsModule { }
