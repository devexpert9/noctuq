import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';

@Component({
  selector: 'kt-setweatherinfo',
  templateUrl: './setweatherinfo.component.html',
  styleUrls: ['./setweatherinfo.component.scss']
})
export class SetweatherinfoComponent implements OnInit {
 displayedColumns = [ 'date' , 'temperature', 'wind', 'cloudcover' ,  'hight' , 'lowtide' ,  'hight1' ,  'hightide' , 'action'];
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
  date: string;
  temperature: string;
  wind: string;
  cloudcover: string;
  hight: string;
  lowtide: string;
  hight1: string;
  hightide: string;
}
const ELEMENT_DATA: Element[] = [
  {date: '2016-11-04', temperature: '27.47°C', wind: 'Moderate Breeze'  , cloudcover:'Broken Clouds' ,    hight:'0.1m'  , lowtide:'12:11' , hight1:'0.5m' , hightide:'18:23'},
  {date: '2016-11-05', temperature: '24.48°C', wind: 'Moderate Breeze'  , cloudcover:'Overcast Clouds' ,  hight:'0.2m'  , lowtide:'12:56' , hight1:'0.5m' , hightide:'19:09'},
  {date: '2016-11-06', temperature: '26.14°C', wind: 'Moderate Breeze'  , cloudcover:'Overcast Clouds' ,  hight:'0.2m'  , lowtide:'13:56' , hight1:'0.5m' , hightide:'07:48'},
  {date: '2016-11-07', temperature: '25.06°C', wind: 'Moderate Breeze'  , cloudcover:'Overcast Clouds' ,  hight:'0.2m'  , lowtide:'15:17' , hight1:'0.5m' , hightide:'08:58'},
  {date: '2016-11-08', temperature: '23.82°C', wind: 'Gentle Breeze'  ,   cloudcover:'Few Clouds' ,       hight:'-'  ,    lowtide:'21:00' , hight1:'-' ,    hightide:'21:00'},
  {date: '2016-11-09' , temperature: '23.84°C', wind: 'Gentle Breeze'  ,   cloudcover:'Scattered Clouds' , hight:'-'  ,    lowtide:'21:00' , hight1:'-' ,    hightide:'21:00'},
  {date: '2016-11-10', temperature: '24.43°C', wind: 'Gentle Breeze'  ,   cloudcover:'Scattered Clouds' , hight:'-'  ,    lowtide:'21:00' , hight1:'-' ,    hightide:'21:00'},
];