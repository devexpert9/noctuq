import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'kt-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
 displayedColumns = [ 'select'  , 'category' , 'questions' ,'options' , 'action'];
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
  questions: string;
  options: string;
  category: string;
}
const ELEMENT_DATA: Element[] = [
  { questions: 'Pousada' , options: 'Close to the sea' , category: 'Accomodation' },
 { questions: 'Pousada' , options: 'Central'  , category: 'Accomodation' },
  { questions: 'Pousada' , options: 'Ecological'  , category: ' Accomodation ' },
  { questions: 'Pousada' , options: 'Pets accepted'  , category: 'Accommodation' },
  { questions: 'Hotel' , options: 'Accessible'  , category: 'Accommodation' },
  { questions: 'Hotel' , options: 'Accessible'  , category: 'Accommodation' },
  { questions: 'Hotel' , options: 'Close to the sea'  , category: 'Accommodation' },
  { questions: 'Hotel' , options:'Close to the sea'  , category: 'Accommodation' },
  { questions: 'Hostel' , options: 'Accessible'  , category: 'Accommodation' },
  { questions: 'Bars' , options: 'Close to the sea'  , category: 'Food' },
  { questions: 'Bars' , options: 'Close to the sea'  , category: 'Food' },
  { questions: 'Tours' , options: 'Aquatic'  , category: 'Tourism' },
];