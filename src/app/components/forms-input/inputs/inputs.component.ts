import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputProps, SelectProps, isForm } from '../../interfaces';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
/* le but ici est de faire un input généralisé qu'importe le inputProps/selectProps qu'on passe */
export class InputsComponent {
  @Input() key!: string; /* nom de l'input */
  @Input() props!: any; /* propriété de l'input */
  @Input() form !: FormGroup; /* formulaire */

  isSelect() {
    return this.props.type === 'select';
  }
  isImgInput() {
    return this.props.type === 'image' || this.props.type === 'file' || this.props.type === 'img';
  }
  isOtherInput(){
    return !this.isSelect() && !this.isImgInput();
  }

  get(key: string) {
    return this.form.get(key) as FormGroup;
  }

  onChange(e: any) {
    if (this.props.onChange !== undefined) {
      this.props.onChange(e.newValue, e.object);
    }
  }
}
