import { Component, OnInit , ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router ,Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../../config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../core/user/user.service';

@Component({
  selector: 'kt-eventtypes',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
isLoading = true;
  errors : any = ['',null,undefined];
  loading=false;
  IMAGES_URL:any = config.IMAGES_URL;
  displayedColumns = [ 'srno', 'user_name' ,'user_email' , 'comment' , 'flag', 'created'  , 'action'];
  dataSource : any = [];
  allVenues:[];
  modalRef:any;
  id:any;
   del_id:any=null;
   del_index:any=null;
  status_index:any=null;
  status_aid:any=null;
  status_val:any=null;

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

  //applyFilter(filterValue: string) {
  //  filterValue = filterValue.trim(); // Remove whitespace
  //  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //  this.dataSource.filter = filterValue;
  //}
  constructor(private _snackBar: MatSnackBar, private modalService: NgbModal,public userService: UserService, private cdr: ChangeDetectorRef,public activatedRoute: ActivatedRoute) 
  { 
    this.id = activatedRoute.snapshot.paramMap.get('id');
    this.getUsers(); 
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
    this.userService.postData({id:this.id},'get_comment_of_event').subscribe((result) => {
      console.log(result);
    this.dataSource = new MatTableDataSource(result);
    this.isLoading = false;
    this.cdr.markForCheck();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    },
    err => {
    this.isLoading = false;
    });
  }

  del_open(content,del_id,del_index) {
    this.modalRef = this.modalService.open(content);
    this.del_id = del_id;
    this.del_index = del_index;
  }

  removeFlag(content,del_id,del_index) {
    this.modalRef = this.modalService.open(content);
    this.del_id = del_id;
    this.del_index = del_index;
  }

  confirm_flag_remove(){
    this.loading = true;
    this.userService.postData({id:this.del_id},'remove_flag_comments').subscribe((result) => {
      this.loading = false;
   
      if(result.status == 1){
        this.modalRef.close();
        this.showSnackBar('Flag has been removed successfully.');
        this.dataSource.data[this.del_index]['flag_status'] = 1;
        this.dataSource.data[this.del_index]['flag'] = 0;
        this.cdr.markForCheck(); 
      }
      else{
        this.showSnackBar('Error while removing flag,Please try after some time');
      }
    },
    err => {
      this.loading = false;
      this.showSnackBar('Technical error,Please try after some time');
    });
  }

  confirm_delete(){
    this.loading = true;
    this.userService.postData({id:this.del_id},'delete_comment').subscribe((result) => {
      this.loading = false;
   
      if(result.status == 1){
        this.modalRef.close();
        this.showSnackBar('Comment has been deleted successfully.');
        this.getUsers();
      }
      else{
        this.showSnackBar('Error while deleting comment,Please try after some time');
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


  st_open(content,st_aid,status,i) {
    this.modalRef = this.modalService.open(content);
    this.status_index=i;
    this.status_aid=st_aid;
    this.status_val=status;
  }

  confirm_approve()
  {
    this.loading = true;
    var dict = {
      id:this.status_aid,
      status:this.status_val
    }
    this.userService.postData(dict,'update_comment_status').subscribe((result) => {
    this.loading = false;
    if(result.status == 1){
    this.modalRef.close();
    //this.dataSource.data[this.status_index]['status'] = this.status_val;
    //this.cdr.markForCheck();
    this.getUsers();  
    if(this.status_val=='1')
    {
    this.showSnackBar('Approve Successfully.');
    }else
    {
    this.showSnackBar('Disapprove Successfully.'); 
    }
    }
    },
    err => {
    this.isLoading = false;
    });
  }

}