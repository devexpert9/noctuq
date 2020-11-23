import { Component, OnInit , ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../../config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../core/user/user.service';

@Component({
  selector: 'kt-eventtypes',
  templateUrl: './genretypes.component.html',
  styleUrls: ['./genretypes.component.scss']
})
export class GenretypesComponent implements OnInit {
isLoading = true;
  errors : any = ['',null,undefined];
  loading=false;
  IMAGES_URL:any = config.IMAGES_URL;
  displayedColumns = [ 'name'  , 'action'];
  dataSource : any = [];
  allVenues:[];
  modalRef:any;
   del_id:any=null;
   del_index:any=null;

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
  
  constructor(private _snackBar: MatSnackBar, private modalService: NgbModal,public userService: UserService, private cdr: ChangeDetectorRef) 
  { 
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
    this.userService.postData({},'get_genre').subscribe((result) => {
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
    this.userService.postData({id:this.del_id},'delete_genre_type').subscribe((result) => {
      this.loading = false;
   
      if(result.status == 1){
        this.modalRef.close();
        this.showSnackBar('Genre type has been deleted successfully.');
        this.getUsers();
      }
      else if(result.status == 2){
        this.modalRef.close();
        this.showSnackBar("This genre type exists in event, Enable to delete this genre type.");
      }
      else{
        this.showSnackBar('Error while deleting genre type,Please try after some time');
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