import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TableCommon } from '../table-common.class';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteAction, FormProps } from '../interfaces';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableCommon implements OnInit {
  constructor(public dialog: MatDialog) {
    super();
  }
  override ngOnInit(): void {
    super.ngOnInit();
  }

  openEditDialog(row: any) {
    this.dialog.open(RowEditDialogComponent, {
      data: {
        row: row,
        formProps: this.updateFormProps,
        handleSubmitChange: this.handleSubmitChange
      }
    });
  }

  openDeleteDialog(id: any) {
    this.dialog.open(RowDeleteDialogComponent, {
      data: {
        uid: id,
        deleteAction: this.deleteAction,
        handleSubmitChange: this.handleSubmitChange
      }
    });
  }
}
/* Modal update form */
@Component({
  selector: 'app-row-edit-dialog',
  templateUrl: './row-edit-dialog.html',
})
export class RowEditDialogComponent implements OnInit {
  row!: any;
  formProps!: FormProps;
  handleSubmitChange!: (status: string) => void;

  constructor(
    public dialogRef: MatDialogRef<RowEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.row = this.data.row;
    this.formProps = this.data.formProps;
    this.handleSubmitChange = this.data.handleSubmitChange;

    /* définir les valeurs par défaut */
    for (let key in this.formProps.inputs) {
      if (key in this.row)
        this.formProps.inputs[key].default = this.row[key];
    }
  }
}

/* Modal delete form */
@Component({
  selector: 'app-row-delete-dialog',
  templateUrl: './row-delete-dialog.html',
})
export class RowDeleteDialogComponent implements OnInit {
  deleteAction!: DeleteAction;
  uid!: string;
  handleSubmitChange!: (status: string) => void;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.deleteAction = this.data.deleteAction;
    this.uid = this.data.uid;
    this.handleSubmitChange = this.data.handleSubmitChange;
  }

  delete() {
    this.deleteAction(this.uid)
      .then((res: any) => {
        this.handleSubmitChange("success");
        this.alertService.alertSuccess(res?.message || "Le traitement a été effectué avec succès");
      })
      .catch((err: any) => {
        this.alertService.alertError(err?.message || "Une erreur s'est produite lors du traitement");
      })
      ;
  }
}
