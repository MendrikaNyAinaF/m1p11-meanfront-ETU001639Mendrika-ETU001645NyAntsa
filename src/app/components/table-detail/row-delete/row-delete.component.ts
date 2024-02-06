import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeleteAction } from '../../interfaces';

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

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  open() {
    this.dialog.open(RowDeleteDialogComponent, {
      data: {
        uid:"",
        deleteAction: this.deleteAction
      }
    });
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

  @Input()deleteAction:DeleteAction | undefined;
  @Input()uid:string | undefined;

}

@Component({
  selector: 'app-row-delete-dialog',
  templateUrl: './row-delete-dialog.html',
})
export class RowDeleteDialogComponent implements OnInit {
  deleteAction! :DeleteAction;
  uid!:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.deleteAction = this.data.deleteAction;
    this.uid = this.data.uid;
  }

  delete(){
    this.deleteAction(this.uid)
      .then((res:any) => {})
      .catch((err:any) => {})
    ;
  }
}
