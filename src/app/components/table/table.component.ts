import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { Column, Getter, RowAction } from '../interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  private _data !: any[];
  private _titles !: string[];
  private _columns!: Column[];
  private _editable :boolean=false;
  private _deletable :boolean=false;

  /** list of actions for each row */
  @Input() actions : RowAction[] = [];

  /** function to call on row click */
  @Output() onRowClick = new EventEmitter<any>();

  dataSource : MatTableDataSource<any> = new MatTableDataSource();

  /** the list of the object that will be displayed on the table*/
  @Input() set data (val: any[]) {
    this._data = val;
    this.dataSource.data = val;
  }

  /** columns of the table */
  @Input() set columns (val: Column[]) {
    this._columns = val;
    this._titles=[...val.map((col: Column) => col.name),"Edit","Supprimer"];
  }

  @Input() set editable (val: boolean) {
    this._editable = val || false;
  } 

  @Input() set deletable (val: boolean) {
    this._deletable = val || false;
  }
  get data () {
    return this._data;
  }
  get titles () {
    return this._titles;
  }
  get columns () {
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

}
