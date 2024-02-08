import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageServiceCrudComponent } from './page-service-crud/page-service-crud.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    PageServiceCrudComponent
  ],
  imports: [
    ComponentsModule
  ]
})
export class ViewsModule { }
