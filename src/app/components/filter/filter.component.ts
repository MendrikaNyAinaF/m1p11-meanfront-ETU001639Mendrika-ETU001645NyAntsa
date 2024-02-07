import { Component, Input, OnInit } from '@angular/core';
import { FormProps } from '../interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() formProps!: FormProps;
  constructor() { }

  ngOnInit(): void {
  }

}
