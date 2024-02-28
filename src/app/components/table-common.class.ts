import { FormGroup } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { Column, DeleteAction, FormProps } from "./interfaces";
import { MatTableDataSource } from "@angular/material/table";
import {Router} from "@angular/router";


@Component({
  template: ``
})
export class TableCommon implements OnInit {
  ngOnInit(): void {
    this._titles = [...this._columns.map((col: Column) => col.name)];
    if (this._editable) {
      this._titles.push("Edit");
    }
    if (this._deletable) {
      this._titles.push("Delete");
    }
    
  }

  private _data !: any[];
  private _titles !: string[];
  private _columns!: Column[];
  private _editable: boolean = false;
  private _deletable: boolean = false;

  @Input() handleSubmitChange: (status:string)=>void = (status:string)=>{}; 

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  /** the list of the object that will be displayed on the table*/
  @Input() set data(val: any[]) {
    this._data = val;
    this.dataSource.data = val;
  }

  /** columns of the table */
  @Input() set columns(val: Column[]) {
    this._columns = val;
  }

  @Input() set editable(val: boolean) {
    this._editable = val || false;
  }

  @Input() set deletable(val: boolean) {
    this._deletable = val || false;
  }


  get data() {
    return this._data;
  }
  get titles() {
    return this._titles;
  }
  get columns() {
    return this._columns;
  }

  getTitles(): string[] {
    return [...this.titles];
  }
  getColumns(): Column[] {
    return this._columns;
  }
  getEditable(): boolean {
    return this._editable;
  }
  getDeletable(): boolean {
    return this._deletable;
  }


  @Input() updateFormProps?: FormProps= undefined;

  
  @Input()deleteAction?: DeleteAction = undefined;

  /** list of actions for each row */
  @Input() actions?: (row: any) => any;

  /** function to call on row click */
  @Input() onRowClick?: (row: any) => any;

  @Input()loader:boolean = false;

 

  /* props edit */
  click(row: any) {
    if (this.actions) return;
    if (this.onRowClick) this.onRowClick(row);
  }
  rowable(){
    if (this.onRowClick!==undefined) return "rowable";
    return "";
  }

}
