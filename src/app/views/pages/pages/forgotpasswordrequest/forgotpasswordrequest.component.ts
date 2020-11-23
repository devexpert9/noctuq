import { Component, OnInit  , ViewChild } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
@Component({
  selector: 'kt-forgotpasswordrequest',
  templateUrl: './forgotpasswordrequest.component.html',
  styleUrls: ['./forgotpasswordrequest.component.scss']
})
export class ForgotpasswordrequestComponent implements OnInit {

  displayedColumns = [ 'name'  , 'type', 'created' ];
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
  type: string;
  created: string;
}
const ELEMENT_DATA: Element[] = [
  { name: 'test' , type: 'hhhhhhh@hghg.ccv'  , created: '19/09/2016 18:27:22'},
  { name: 'test' , type: 'hhhhhhh@hghg.ccv'  , created: '19/09/2016 18:27:22'},
  { name: 'test' , type: 'jdjd@hdhs.com'  , created: '19/09/2016 18:27:22'},
  { name: 'test' , type: 'hhhhhhh@hghg.ccv'  , created: '19/09/2016 18:27:22'},
  { name: 'test' , type: 'jdjd@hdhs.com'  , created: '19/09/2016 18:27:22'},
  { name: 'test' , type: 'hhhhhhh@hghg.ccv'  , created: '19/09/2016 18:27:22'},
  { name: 'test' , type: 'hhhhhhh@hghg.ccv'  , created: '19/09/2016 18:27:22'}
];