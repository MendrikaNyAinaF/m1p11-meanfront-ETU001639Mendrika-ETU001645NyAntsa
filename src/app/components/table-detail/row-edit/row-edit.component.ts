import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormProps } from '../../interfaces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-row-edit',
  templateUrl: './row-edit.component.html',
  styleUrls: ['./row-edit.component.scss']
})
export class RowEditComponent implements OnInit {
  private _color: string = 'primary';
  private _row!: any;
  private _disabled: boolean = false;
  private _icon: string = 'edit';

  @Input() updateFormProps?: FormProps;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  open() {
    this.dialog.open(RowEditDialogComponent, {
      data: {
        row: this.row,
        formProps: this.updateFormProps
      }
    });
  }

  @Input() set color(color: string) {
    this._color = color;
  }
  get color() {
    return this._color;
  }

  @Input() set row(row: any) {
    this._row = row;
  }
  get row() {
    return this._row;
  }

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled || false;
  }

  get disabled() {
    return this._disabled;
  }

  @Input() set icon(icon: string) {
    this._icon = icon || 'edit';
  }

  get icon() {
    return this._icon;
  }


}

@Component({
  selector: 'app-row-edit-dialog',
  templateUrl: './row-edit-dialog.html',
})
export class RowEditDialogComponent implements OnInit {
  row!: any;
  formProps!: FormProps;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.row = this.data.row;
    this.formProps = this.data.formProps;

    /* définir les valeurs par défaut */
    for (let key in this.formProps.inputs) {
      if (key in this.row)
        this.formProps.inputs[key].default = this.row[key];
    }
  }
}
