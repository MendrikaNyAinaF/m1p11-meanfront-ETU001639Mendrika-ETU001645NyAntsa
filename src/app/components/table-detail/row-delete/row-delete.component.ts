import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-row-delete',
  templateUrl: './row-delete.component.html',
  styleUrls: ['./row-delete.component.scss']
})
export class RowDeleteComponent implements OnInit {

  private _color:string = 'primary';
  private _row!:any;
  private _disabled:boolean = false;
  private _icon:string = 'delete';
  private _urlDelete!:string ;

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  delete(){
    //TO DO
  }

  @Output() set emitDelete(urlDelete:string){
    //evenement delete
    //TO DO 
  }


  @Input() set color(color:string ){
    this._color=color;
  }
  get color(){
    return this._color;
  } 

  @Input() set row(row:any){
    this._row=row;
  }
  get row(){
    return this._row;
  }

  @Input() set disabled(disabled:boolean){
    this._disabled=disabled || false;
  }

  get disabled(){
    return this._disabled;
  }

  @Input() set icon(icon:string){
    this._icon=icon || 'edit';
  }

  get icon(){
    return this._icon;
  }

  @Input() set urlDelete(urlDelete:string){
    this._urlDelete=urlDelete;
  }

  get urlDelete(){
    return this._urlDelete;
  }

  


}
