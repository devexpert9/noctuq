import { Component, OnInit  , ViewChild } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
@Component({
  selector: 'kt-datasynclogs',
  templateUrl: './datasynclogs.component.html',
  styleUrls: ['./datasynclogs.component.scss']
})
export class DatasynclogsComponent implements OnInit {
 displayedColumns = [ 'device'  , 'syncdata',  'timesync'  , 'created' ];
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
  device: string;
  syncdata: string;
  timesync: string;
  created: string;
}
const ELEMENT_DATA: Element[] = [
  { device: '354470082003929' , syncdata: '896'  ,    timesync:  '18' , created: '19/09/2016 18:27:22'},
  { device: '355470062071457' , syncdata: '875'  ,    timesync:  '20' , created: '19/09/2016 18:27:22'},
  { device: '869447038796846' , syncdata: '948'  ,    timesync:  '33' , created: '19/09/2016 18:27:22'},
  { device: '863122038335020' , syncdata: '2679'  ,    timesync: '31' , created: '19/09/2016 18:27:22'},
  { device: '355798054921903' , syncdata: '40'  ,    timesync:   '18' , created: '19/09/2016 18:27:22'}
];