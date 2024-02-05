import { Component, Input, OnInit } from '@angular/core';
import { SelectProps } from '../../interfaces';
import { InputCommon } from '../input-common.class';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends InputCommon {
  @Input() props !: SelectProps;
 
}
