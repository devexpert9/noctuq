import { Component, OnInit , ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../../config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../core/user/user.service';

@Component({
  selector: 'kt-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {
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
   change_status:any=null;
   update_venue_title:any;

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

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

open(content) {
        this.modalService.open(content).result.then((result) => {       
        });
    }


  getUsers(){
    this.isLoading = true;
    this.userService.postData({genres : [], venues : [], is_admin : '1'},'get_venues_list').subscribe((result) => {
      console.log(result);
    this.dataSource = new MatTableDataSource(result.data);
    this.isLoading = false;
    this.cdr.markForCheck();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    },
    err => {
    this.isLoading = false;
    });
  }

  del_open(content,del_id,del_index,status=null) {
    this.modalRef = this.modalService.open(content);
    this.del_id = del_id;
    this.del_index = del_index;
    this.change_status = status;
    if(this.change_status == 0){
      this.update_venue_title = 'Dis-approve';
    }
    else{
      this.update_venue_title = 'Approve';
    }
    console.log(this.del_index)
  }

  confirm_approve_disapprove(){
    this.loading = true;
    this.userService.postData({id:this.del_id, status : this.change_status},'update_venue_status').subscribe((result) => {
      this.loading = false;
   
      if(result.status == 1){
        this.dataSource.data[this.del_index]['status'] = this.change_status;
        this.cdr.markForCheck();
        this.change_status = null;
        this.del_id = null;
        this.del_index = null;
        this.modalRef.close();
        this.showSnackBar('Venue has been '+this.update_venue_title+'ed.');
      }
      else{
        this.showSnackBar('Error while deleting venue,Please try after some time');
      }
    },
    err => {
      this.loading = false;
      this.showSnackBar('Technical error,Please try after some time');
    });
  }

  confirm_delete(){
    this.loading = true;
    this.userService.postData({id:this.del_id},'delete_venue').subscribe((result) => {
      this.loading = false;
   
      if(result.status == 1){
        this.modalRef.close();
        this.del_id = null;
        this.del_index = null;
        this.showSnackBar('Venue has been deleted successfully.');
        this.getUsers();
      }
      else{
        this.showSnackBar('Error while deleting venue,Please try after some time');
      }
    },
    err => {
      this.loading = false;
      this.showSnackBar('Technical error,Please try after some time');
    });
  }

  showSnackBar(message){
      this._snackBar.open(message, 'Close', {
        duration: 3000,
      });
    }
}
