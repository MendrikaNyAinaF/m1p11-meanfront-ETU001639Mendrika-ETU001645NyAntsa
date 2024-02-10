import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageServiceCrudComponent } from './manager/page-service-crud/page-service-crud.component';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    PageServiceCrudComponent,
    LoginComponent
  ],
  imports: [
    ComponentsModule
  ]
})
export class ViewsModule { }
