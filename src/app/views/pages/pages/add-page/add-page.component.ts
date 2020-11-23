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
  selector: 'kt-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
 @ViewChild('pickid',{static:true}) pickid: ElementRef;
@ViewChild('dropid',{static:true}) dropid: ElementRef;
@ViewChild('toolsRTE1',{static:true}) public rteObj: RichTextEditorComponent;

allVenues:[];
allGenre:[];
addForm: FormGroup;
public latitude: number;
public longitude: number;
public selectedAddress: PlaceResult;
totaldistance:any;
totaltime:any;
id:any;
totalmin:any;
totaltraffictime:any;
total:number;
showActions: boolean = false;
showActionss: boolean = true;

venue_type = new FormControl('');
genre_type = new FormControl('');
description = new FormControl('');



is_submit:boolean=false;
is_license_uploaded:boolean=false;
license_image_url:any;
loading = false;
license_error:boolean=false;
places = new FormControl();
public uploader:FileUploader = new FileUploader({url: ''});
public hasBaseDropZoneOver:boolean = false;
timestamp:any;
allowedMimes:any = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg'];
license_file:any;
errors : any = ['',null,undefined];

selectedVenue: string;
somePlaceholder:string = 'Venue Type';
  
     public tools: object = {
         items: [
                'Bold', ' Italic', 'Underline', 'StrikeThrough', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
                'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
                'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
                'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
        }; 
         public tools1: object = {
         items: [
                'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
                'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
                'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
                'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
        }; 
        
  constructor(private fb: FormBuilder, public sanitizer:DomSanitizer, private _snackBar: MatSnackBar, private modalService: NgbModal,public userService: UserService, private cdr: ChangeDetectorRef, private router: Router) 
  {
  }

  public maxLength: number = 6000;
  public textArea: HTMLElement;
  public myCodeMirror: any;
  ngAfterViewInit(): void {
  let rteObj: RichTextEditorComponent = this.rteObj;
  setTimeout(() => { this.textArea = rteObj.contentModule.getEditPanel() as HTMLElement; }, 600);
  }

  ngOnInit() {
    this.initAddForm();
  }

  initAddForm(){
    this.addForm = this.fb.group({
      name: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]+$')])], 
      title: ['', Validators.compose([Validators.required])],
      description:[''],
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
    console.log(controls);
    this.loading = true;
     var dict = {
      name: controls['name'].value,
      title: controls['title'].value,
      description: controls['description'].value,
    }
    console.log(dict);
    this.userService.postData(dict,'add_page').subscribe((result) => { 
        console.log(result);
        if(result.status == 1){
          this.loading = false;
          this.showSnackBar('Page has been created successfully');  
          this.router.navigate(['/panel/pages/']);    
        }
        else if(result.status == 2){
          this.loading = false;
          this.showSnackBar('Page name already exist,Please try with another one');
        }
        else{
          this.loading = false;
          this.showSnackBar('Error while adding page,Please try after some time');
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
