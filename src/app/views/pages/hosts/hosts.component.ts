import { Component, OnInit , ViewChild, ChangeDetectorRef} from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../core/user/user.service';
import { config } from '../../../config';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'kt-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.scss']
})
export class HostsComponent implements OnInit {
isLoading = true;
errors : any = ['',null,undefined];
modalRef:any;
del_id:any=null;
del_index:any=null;
status_index:any=null;
status_aid:any=null;
status_val:any=null;
loading=false;
IMAGES_URL:any = config.IMAGES_URL;
displayedColumns = [ 'image', 'name', 'email', 'phone', 'events' ,'action'];
dataSource : any = [];
user_name:any
user_email:any;
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   
  constructor(private _snackBar: MatSnackBar,private modalService: NgbModal,public userService: UserService, private cdr: ChangeDetectorRef) { 
   this.getUsers(); 
  }

  ngOnInit() {}

  open(content) 
  {
        this.modalService.open(content).result.then((result) => {       
        });
   }

   getUsers(){
    this.isLoading = true;
    this.userService.postData({},'get_all_hosts').subscribe((result) => {
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
    this.userService.postData({id:this.del_id},'delete_host').subscribe((result) => {
      this.loading = false;
   
      if(result.status == 1){
        this.modalRef.close();
        this.dataSource.data.splice(this.del_index,1);
        this.cdr.markForCheck();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSnackBar('Host has been deleted successfully.');
      }
      else{
        this.showSnackBar('Error while deleting host,Please try after some time');
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

  st_open(content,st_aid,status,i,user_name,user_email) {
    this.modalRef = this.modalService.open(content);
    this.status_index=i;
    this.status_aid=st_aid;
    this.status_val=status;
    this.user_name = user_name;
    this.user_email = user_email
  }

  confirm_approve()
  {
    this.loading = true;
    var dict = {
      userId:this.status_aid,
      status:this.status_val,
      apiUrl: config.API_URL,
      baseUrl: config.BASE_URL,
      user_name: this.user_name,
      user_email: this.user_email
    }
    this.userService.postData(dict,'update_host_status').subscribe((result) => {
    this.loading = false;
    if(result.status == 1){
    this.modalRef.close();
    console.log('11111');
    console.log(this.dataSource.data);
    this.dataSource.data[this.status_index]['status'] = this.status_val;
    this.cdr.markForCheck(); 
    if(this.status_val=='1')
    {
    this.showSnackBar('Account activated successfully.');
    }else
    {
    this.showSnackBar('Account in-activated successfully.'); 
    }
    }
    },
    err => {
    this.isLoading = false;
    });
  }

}
