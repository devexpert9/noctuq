import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'kt-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

 displayedColumns = [ 'select' ,  'name' ,'owner'   , 'status', 'created' , 'modified' , 'action'];
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
  owner: string;
  status: string;
  created: string;
  modified: string;
}
const ELEMENT_DATA: Element[] = [
  { name: 'Vendo Linda Pousada' , owner: 'Public Place' , status: 'published'  , modified: '19/09/2016 18:27:22'  , created: '19/09/2016 18:27:22'},
  { name: 'Lote Biera Mar de Porto de Galinhas 02' , owner: 'Juraci Pereira' , status: 'published'  , modified: '20/09/2016 18:27:22'  , created: '20/09/2016 18:27:22'},
  {name: 'Linda Em Porto de Galinhas Ipojuca PE' , owner: 'Vanessa'  , status: 'published'   , modified: '22/09/2016 18:27:22'  , created: '22/09/2016 18:27:22'},
  {name: 'Linda Casa Em Porto de Galinhas Ipojuca PE' , owner: 'Juraci Pereira' , status: 'published'  , modified: '23/09/2016 18:27:22'  , created: '23/09/2016 18:27:22'},
  { name: 'Land In Cabo de Santo Agostinho' , owner: 'Juraci Pereira'  , status: 'published' , modified: '24/09/2016 18:27:22'  , created: '24/09/2016 18:27:22'},
];