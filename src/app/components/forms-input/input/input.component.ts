import { Component, Input, OnInit } from '@angular/core';
import { InputProps } from '../../interfaces';
import { InputCommon } from '../input-common.class';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends InputCommon  {
  
  @Input() props !: InputProps;
  // ngOnInit(): void {
  //   if (this.props.type == 'datetime-local' && this.props.default!=undefined && this.props.default.length>15) {
  //     this.props.default = this.props.default.substring(0,16);
  //     this.form.patchValue({
  //       [this.key]: this.props.default
  //     });
  //   }
  // }


}
