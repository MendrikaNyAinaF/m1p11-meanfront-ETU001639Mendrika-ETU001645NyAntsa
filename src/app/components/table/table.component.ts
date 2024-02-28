import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TableCommon } from '../table-common.class';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteAction, FormProps } from '../interfaces';
import { AlertService } from '../alert.service';
import { FullSizeImageDialogComponent } from "../full-size-image-dialog/full-size-image-dialog.component";

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

  /* ouvrir le dialog du formulaire de modification */
  openEditDialog(row: any, $event: MouseEvent) {
    $event.stopPropagation();
    this.dialog.open(RowEditDialogComponent, {
      data: {
        row: row,
        formProps: this.updateFormProps,
        handleSubmitChange: this.handleSubmitChange
      }
    });
  }

  /* ouvrir le dialog du formulaire de suppression */
  openDeleteDialog(id: any, $event: MouseEvent) {
    $event.stopPropagation();

    this.dialog.open(RowDeleteDialogComponent, {
      data: {
        uid: id,
        deleteAction: this.deleteAction?.bind(this),
        handleSubmitChange: this.handleSubmitChange
      }
    });
  }

  openFullSizeImage(imageUrl: any, $event: MouseEvent) {
    $event.stopPropagation();
    console.log(imageUrl);
    this.dialog.open(FullSizeImageDialogComponent, {
      data: imageUrl
    });

  }
}
/* Modal update form */
@Component({
  selector: 'app-row-edit-dialog',
  templateUrl: './row-edit-dialog.html',
  styleUrls: ['./table.component.scss']
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
    this.handleSubmitChange = (status: string) => {
      this.data.handleSubmitChange(status);
      if (status === "success") {
        this.dialogRef.close();
      }
    }

    /* définir les valeurs par défaut */
    for (let key in this.formProps.inputs) {
      if (key in this.row) {
        if (this.formProps.inputs[key].type === "select") {
          this.formProps.inputs[key].default = this.formProps.inputs[key].getValue(this.row[key]);
          this.formProps.inputs[key].default= this.formProps.inputs[key].default.$oid|| this.formProps.inputs[key].default;
        } else {
          this.formProps.inputs[key].default = this.row[key];
        }

      }
    }
  }
}

/* Modal delete form */
@Component({
  selector: 'app-row-delete-dialog',
  templateUrl: './row-delete-dialog.html',
  styleUrls: ['./table.component.scss']
})
export class RowDeleteDialogComponent {
  deleteAction!: DeleteAction; //la fonction à exécuter pour la suppression
  uid!: string; //l'identifiant de l'élément à supprimer
  handleSubmitChange!: (status: string) => void; //la fonction à exécuter après la suppression pour signifier le changement

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    private dialogRef: MatDialogRef<RowDeleteDialogComponent>) {

    this.deleteAction = this.data.deleteAction;
    this.uid = this.data.uid;
    this.handleSubmitChange = this.data.handleSubmitChange;
    console.log(this.data);
  }

  delete() {
    this.deleteAction(this.uid)
      .then((res: any) => {
        this.handleSubmitChange("success");
        this.alertService.alertSuccess(res?.message || "Le traitement a été effectué avec succès");
        this.dialogRef.close();
      })
      .catch((err: any) => {
        console.log(err);
        this.alertService.alertError(err?.message || "Une erreur s'est produite lors du traitement");
      })
      ;
  }
}
