import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TableCommon } from '../table-common.class';

@Component({
  selector: 'app-table-paginate',
  templateUrl: './table-paginate.component.html',
  styleUrls: ['./table-paginate.component.scss']
})
export class TablePaginateComponent extends TableCommon implements OnInit{
  /* propriété de la pagination */
  @Input() currentPage : number=0; /* la page actuelle */
  @Input() rowsPerPage : number=10; /* le nombre d'éléments par page */
  @Input() length! : number; /* le nombre total d'éléments */

  @Output() currentPageChange = new EventEmitter<number>(); /* émettre le changement de la page actuelle */

  constructor() { 
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  pageEvent!: PageEvent;

  /* fonction de changement de page */
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.rowsPerPage = e.pageSize;
    this.currentPage = e.pageIndex;

    /* émission du changement de page*/
    this.currentPageChange.emit(e.pageIndex);
  }
}
