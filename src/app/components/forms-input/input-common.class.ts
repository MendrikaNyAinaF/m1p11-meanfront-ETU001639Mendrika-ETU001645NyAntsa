import {FormGroup} from "@angular/forms";
import {Component, Input} from "@angular/core";
import {evaluateError} from "../../services/error.handler";

@Component({
  template: ``
})
export class InputCommon {
  @Input() form!: FormGroup;
  @Input() key!: string;


  public readError () {
    return evaluateError(this.form, this.key);
  }

}
