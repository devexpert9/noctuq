import { Component, OnInit , ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/user/user.service';
// Angular
import { shuffle } from 'lodash';
// Services
// Widgets model
import { LayoutConfigService, SparklineChartOptions } from '../../../core/_base/layout';
@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {  
  isLoading = true;
  errors : any = ['',null,undefined];
  loading=false;
  IMAGES_URL:any = config.IMAGES_URL;
  displayedColumns = [ 'image', 'title', 'venue_type'  , 'price', 'comments'  , 'created'  , 'action'];
  dataSource : any = [];
  allVenues:[];
  modalRef:any;
   del_id:any=null;
   del_index:any=null;
   total_users:any=0;
   total_events:any=0;
   total_comments:any=0;
   total_hosts:any=0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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

 
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
	    this.dataSource.sort = this.sort;
  }

  getVenues(){ 
    this.userService.postData('','get_venues').subscribe((result) => {
      this.allVenues = result;
    });
  }
  //applyFilter(filterValue: string) {
  //  filterValue = filterValue.trim(); // Remove whitespace
  //  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //  this.dataSource.filter = filterValue;
  //}
  constructor(private _snackBar: MatSnackBar, private modalService: NgbModal,public userService: UserService, private cdr: ChangeDetectorRef) 
  { 
    this.getUsers(); 
    this.getVenues();
  }

  ngOnInit(){
		 this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
	}

open(content) {
        this.modalService.open(content).result.then((result) => {       
        });
    }


  getUsers(){
    this.isLoading = true;
    this.userService.postData({},'get_dashboard_data').subscribe((result) => {
      console.log(result[0]);
    this.dataSource = new MatTableDataSource(result[0]);
    this.isLoading = false;
    this.cdr.markForCheck();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.total_users=result[1];
    this.total_events=result[2];
    this.total_comments=result[3];
    this.total_hosts=result[4];
    },
    err => {
    this.isLoading = false;
    });
  }

  showSnackBar(message){
      this._snackBar.open(message, 'Close', {
        duration: 3000,
      });
    }

}

