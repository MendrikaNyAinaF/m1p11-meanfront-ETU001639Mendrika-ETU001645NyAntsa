import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../interfaces';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table-paginate',
  templateUrl: './table-paginate.component.html',
  styleUrls: ['./table-paginate.component.scss']
})
export class TablePaginateComponent {
  /* propriété d'une table normale */
  @Input() data !: any[];
  @Input() columns!: Column[];
  @Input() editable :boolean=false;
  @Input() deletable :boolean=false;

  /* propriété de la pagination */
  // h<andleChangePage, page, rowsPerPage = 10, loading = false, count
  @Input() currentPage : number=0;
  @Input() rowsPerPage : number=10;
  @Input() length! : number;

  constructor() { }

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.rowsPerPage = e.pageSize;
    this.currentPage = e.pageIndex;
  }
  
  /* il faudrait émettre la page reçu dans handlePageEvent la */
}
