import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'kt-guidecategories',
  templateUrl: './guidecategories.component.html',
  styleUrls: ['./guidecategories.component.scss']
})
export class GuidecategoriesComponent implements OnInit {
displayedColumns = [ 'select' ,  'imageurl' ,'category' ,'action'];
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
  imageurl: string;
  category: string;
}
const ELEMENT_DATA: Element[] = [
  { imageurl: 'assets/img/sleep1.png' , category:  ' Accomodation ' },
  { imageurl: 'assets/img/eat1.png' , category:  ' Food ' },
  { imageurl: 'assets/img/fun1.png' , category:  ' Tourism ' },
  { imageurl: 'assets/img/buy1.png' , category:  ' Shopping ' }
];