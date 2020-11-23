import { Component, OnInit  , ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'kt-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
 displayedColumns = [ 'select' , 'imageurl' , 'name' , 'action'];
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
  imageurl: string;
}
const ELEMENT_DATA: Element[] = [
  { name: 'Eat' , imageurl: 'assets/img/eat.jpg'},
  { name: 'Sleep' , imageurl: 'assets/img/sleep-bg.jpg'},
  { name: 'Fun' , imageurl: 'assets/img/fun.jpg'},
  { name: 'Services' , imageurl: 'assets/img/services-bg.jpg'},
  { name: 'Buy' , imageurl: 'assets/img/buy-bg.jpg'},
];