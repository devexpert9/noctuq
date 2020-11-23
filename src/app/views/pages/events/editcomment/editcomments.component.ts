import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../../config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../core/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/Observable';
import PlaceResult = google.maps.places.PlaceResult;
import * as $ from 'jquery';
import { FileUploader } from 'ng2-file-upload';
import { RichTextEditorComponent, CountService} from '@syncfusion/ej2-angular-richtexteditor';
import { createElement } from '@syncfusion/ej2-base';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'kt-editevent',
  templateUrl: './editcomments.component.html',
  styleUrls: ['./editcomments.component.scss']
})
export class EditcommentsComponent implements OnInit {
addForm: FormGroup;
id:any;
ids:any;
post:any;
showActions: boolean = false;
showActionss: boolean = true;
isLoading = false;
loading = false;
is_submit:boolean=false;
errors : any = ['',null,undefined];
        
  constructor(private fb: FormBuilder, public sanitizer:DomSanitizer, private _snackBar: MatSnackBar, private modalService: NgbModal,public userService: UserService, private cdr: ChangeDetectorRef, private router: Router,public activatedRoute: ActivatedRoute) 
  {
    this.id = activatedRoute.snapshot.paramMap.get('id');
    this.ids = activatedRoute.snapshot.paramMap.get('ids');
    this.getData();
  }

  ngOnInit() {
    this.initAddForm();
  }

  initAddForm(){
    this.addForm = this.fb.group({
      comment: ['', Validators.compose([Validators.required])],
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

  arrayOne(n: number): any[] {
   return Array(n);
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
      comment: controls['comment'].value,
      id: this.id
    }
    this.userService.postData(dict,'edit_comment').subscribe((result) => { 
        console.log(result);
        if(result.status == 1){
          this.loading = false;
          this.showSnackBar('Comment has been updated successfully');  
          this.addForm.reset();
          this.router.navigate(['/panel/events/comments/'+this.ids]);    
        }
        else if(result.status == 2){
          this.loading = false;
          this.showSnackBar('Comment type name already exist,Please try with another one');
        }
        else{
          this.loading = false;
          this.showSnackBar('Error while updating comment,Please try after some time');
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

  getData(){
    this.userService.postData({id: this.id},'get_single_comment').subscribe((result) => {
   console.log(result);
    this.post=result;
    this.isLoading = false;
    this.addForm.patchValue({
      comment: this.post.comment,
    });
      
    this.isLoading = false;
    this.cdr.markForCheck();
    },
    err => {
    this.isLoading = false;
    });
  }

}