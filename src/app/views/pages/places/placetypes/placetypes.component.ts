import { Component, OnInit , ViewChild } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'kt-placetypes',
  templateUrl: './placetypes.component.html',
  styleUrls: ['./placetypes.component.scss'],
})
export class PlacetypesComponent implements OnInit {

  
 displayedColumns = [ 'select' ,  'name'  , 'action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    selection = new SelectionModel<Element>(true, []);
	/** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }
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
 constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  open(content) {
        this.modalService.open(content).result.then((result) => {       
        });
    }
}

export interface Element {
  name: string;
}
const ELEMENT_DATA: Element[] = [
  { name: 'Restaurants'},
  { name: 'Bars'},
  { name: 'Pizzarias'},
  { name: 'Sushi'},
  { name: 'Burger Bar'},
  { name: 'Snack Bar'},
  { name: 'Wine House'},
  { name: 'Ice Cream Shop'},
  { name: 'Cafes'},
  { name: 'Tidbits & Snacks'},
  { name: 'Cachacaria'},
  { name: 'Beach Bars'},
  { name: 'Delivery'},
  { name: 'Disabled Access'},
];