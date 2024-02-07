import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column } from '../interfaces';
import { PageEvent } from '@angular/material/paginator';
import { TableCommon } from '../table-common.class';

@Component({
  selector: 'app-table-paginate',
  templateUrl: './table-paginate.component.html',
  styleUrls: ['./table-paginate.component.scss']
})
export class TablePaginateComponent extends TableCommon implements OnInit{
  /* propriété de la pagination */
  // h<andleChangePage, page, rowsPerPage = 10, loading = false, count
  @Input() currentPage : number=0;
  @Input() rowsPerPage : number=10;
  @Input() length! : number;

  @Output() currentPageChange = new EventEmitter<number>();

  constructor() { 
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.rowsPerPage = e.pageSize;
    this.currentPage = e.pageIndex;

    /* il faudrait émettre la page reçu dans handlePageEvent la */
    this.currentPageChange.emit(e.pageIndex);
  }
  
  
}
