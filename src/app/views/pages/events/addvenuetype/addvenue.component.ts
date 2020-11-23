import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../../config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../core/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';

@Component({
  selector: 'kt-addevent',
  templateUrl: './addvenue.component.html',
  styleUrls: ['./addvenue.component.scss']
})
export class AddvenueComponent implements OnInit {
addForm: FormGroup;
id:any;
showActions: boolean = false;
showActionss: boolean = true;
is_submit:boolean=false;
loading = false;
errors : any = ['',null,undefined];



		    
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private modalService: NgbModal,public userService: UserService, private cdr: ChangeDetectorRef, private router: Router) 
  {
  }

  ngOnInit() {
    this.initAddForm();
  }

  initAddForm(){
    this.addForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.addForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }


submit() {
    this.is_submit = true;
    const controls = this.addForm.controls;
    if (this.addForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
     this.finalSubmit(controls);

  }


  finalSubmit(controls){
    this.loading = true;
    const frmData = new FormData();  
    var dict = {
      name: controls['name'].value
    }
    this.userService.postData(dict,'add_venue_type').subscribe((result) => { 
        console.log(result);
        if(result.status == 1){
          this.loading = false;
          this.showSnackBar('Venue type has been created successfully');  
          this.addForm.reset();
          this.router.navigate(['/panel/venue_types']);    
        }
        else if(result.status == 2){
          this.loading = false;
          this.showSnackBar('Venue type name already exist,Please try with another one');
        }
        else{
          this.loading = false;
          this.showSnackBar('Error while adding venue type,Please try after some time');
        }
    },
    err => {
        this.showSnackBar('Technical error,Please try after some time');
    });
  }

showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }  

}
