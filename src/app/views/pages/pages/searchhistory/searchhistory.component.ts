import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
@Component({
  selector: 'kt-searchhistory',
  templateUrl: './searchhistory.component.html',
  styleUrls: ['./searchhistory.component.scss']
})
export class SearchhistoryComponent implements OnInit {
displayedColumns = [ 'name'  , 'kind', 'created' ];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
	    this.dataSource.sort = this.sort;
  }
    applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor() { }

  ngOnInit() {
  }

}
export interface Element {
  name: string;
  kind: string;
  created: string;
}
const ELEMENT_DATA: Element[] = [
  { name: 'music' , kind: 'web'  , created: '19/09/2016 18:27:22'},
  { name: 'music' , kind: 'web'  , created: '19/09/2016 18:27:22'},
  { name: 'music' , kind: 'web'  , created: '19/09/2016 18:27:22'},
  { name: 'music' , kind: 'web'  , created: '19/09/2016 18:27:22'},
  { name: 'Search' , kind: 'web'  , created: '19/09/2016 18:27:22'},
  { name: 'bar' , kind: 'android'  , created: '19/09/2016 18:27:22'},
  { name: 'hotel' , kind: 'android'  , created: '19/09/2016 18:27:22'}
];