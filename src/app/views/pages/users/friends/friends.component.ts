import { Component, OnInit , ViewChild, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router ,Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../core/user/user.service';
import { config } from '../../../../config';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface PeriodicElement {
  image: string;
  name: string;
  email: string;
  phone: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'kt-users',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  isLoading = true;
  errors : any = ['',null,undefined];
  modalRef:any;
  del_id:any=null;
  id:any=null;
  del_index:any=null;
  status_index:any=null;
  status_aid:any=null;
  status_val:any=null;
  loading=false;
  IMAGES_URL:any = config.IMAGES_URL;
  displayedColumns = [ 'image', 'name', 'email', 'phone'];
 dataSource : any = [];

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
   
  constructor(private _snackBar: MatSnackBar,public activatedRoute: ActivatedRoute,private modalService: NgbModal,public userService: UserService, private cdr: ChangeDetectorRef) { 
   this.id = activatedRoute.snapshot.paramMap.get('id');
   this.getUsers(); 
  }

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }

  open(content) 
  {
        this.modalService.open(content).result.then((result) => {       
        });
   }

   getUsers(){
    this.isLoading = true;
    this.userService.postData({id:this.id},'get_all_friends').subscribe((result) => {
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
  confirm_delete(){
    this.loading = true;
    this.userService.postData({id:this.del_id},'delete_user').subscribe((result) => {
      this.loading = false;
   
      if(result.status == 1){
        this.modalRef.close();
        this.dataSource.data.splice(this.del_index,1);
        this.cdr.markForCheck();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSnackBar('User has been deleted successfully.');
      }
      else{
        this.showSnackBar('Error while deleting user,Please try after some time');
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
      userId:this.status_aid,
      status:this.status_val
    }
    this.userService.postData(dict,'update_user_status').subscribe((result) => {
    this.loading = false;
    if(result.status == 1){
    this.modalRef.close();
    console.log('11111');
    console.log(this.dataSource.data);
    this.dataSource.data[this.status_index]['status'] = this.status_val;
    this.cdr.markForCheck(); 
    if(this.status_val=='1')
    {
    this.showSnackBar('Active Successfully.');
    }else
    {
    this.showSnackBar('Inactive Successfully.'); 
    }
    }
    },
    err => {
    this.isLoading = false;
    });
  }

}




