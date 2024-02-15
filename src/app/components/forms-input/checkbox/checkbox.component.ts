import { Component, Input, OnInit } from '@angular/core';
import { InputCommon } from '../input-common.class';
import { CheckBoxProps, InputProps } from '../../interfaces';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends InputCommon {
  @Input() props !: CheckBoxProps;

  
}
