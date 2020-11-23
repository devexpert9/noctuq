import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../../../config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../../core/user/user.service';
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
  selector: 'kt-addvenue',
  templateUrl: './addvenue.component.html',
  styleUrls: ['./addvenue.component.scss']
})
export class AddvenueComponent implements OnInit {
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


private pickupdata = {
    'lat': 0,
    'lng': 0
  }

  private destidata = {
    'lat': 0,
    'lng': 0
  }

private locadata = {
    'lat': 0,
    'lng': 0
  }

 //public values: string = '<p>The RichTextEditor actions. </p>';
      
public tools1: object = {
 items: [
        'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
        'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
        'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
        'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
}; 

all_images:any=[];
product_images:any=[];
		    
  constructor(private fb: FormBuilder, public sanitizer:DomSanitizer, private _snackBar: MatSnackBar, private modalService: NgbModal,public userService: UserService, private cdr: ChangeDetectorRef, private router: Router) 
  {
    this.getVenues();
    this.getGenre();
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
      title: ['', Validators.compose([Validators.required])],
      venue_type: ['', Validators.compose([Validators.required])],
      genre_type: ['', Validators.compose([Validators.required])],
      price:  ['', Validators.compose([Validators.required, Validators.min(1)])],
      location: ['', Validators.compose([Validators.required])],
      description:['']
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
      if(this.pickupdata.lat == 0 || this.pickupdata.lat == null || this.pickupdata.lat == undefined)
      {
        this.addForm.controls['location'].setErrors({'incorrect': true});
      }
      return;
    }

     if(this.pickupdata.lat == 0 || this.pickupdata.lat == null || this.pickupdata.lat == undefined)
    {
     this.addForm.controls['location'].setErrors({'incorrect': true});
     return;
    }
     this.finalSubmit(controls);

  }


  finalSubmit(controls){
    this.loading = true;
    const frmData = new FormData();  
    
    for (var i = 0; i < this.all_images.length; i++) {  
      frmData.append("file", this.all_images[i]);  
    } 

    frmData.append("name", controls['title'].value);
    frmData.append("price", controls['price'].value);  
    frmData.append("venue_type", JSON.stringify(controls['venue_type'].value));
    frmData.append("genre", JSON.stringify(controls['genre_type'].value));
    frmData.append("address", controls['location'].value);
    frmData.append("lat", this.pickupdata.lat.toString());
    frmData.append("lng", this.pickupdata.lng.toString());
    frmData.append("status", '1');
    frmData.append("venue_description", controls['description'].value);

    if(this.all_images.length>10){
      this.showSnackBar('You can only upload up to 10 images.');
      this.loading = false;
    }else{
      this.userService.postData(frmData,'add_venue').subscribe((result) => { 
        console.log(result);
        if(result.status == 1){
          this.loading = false;
          this.showSnackBar('Venue has been created successfully');  
          this.addForm.reset();
          this.router.navigate(['/panel/venues']);    
        }
        else if(result.status == 2){
          this.loading = false;
          this.showSnackBar('Venue already exists,Please try with another one');
        }
        else{
          this.loading = false;
          this.showSnackBar('Error while adding venue,Please try after some time');
        }
    },
    err => {
        this.showSnackBar('Technical error,Please try after some time');
    });

    }
  
  }

getVenues(){ 
    this.userService.postData('','get_venues').subscribe((result) => {
      this.allVenues = result;
    });
  }

  getGenre(){ 
    this.userService.postData('','get_genre').subscribe((result) => {
      this.allGenre = result;
    });
  }
  

  onAutocompleteSelected(result: PlaceResult, type) {
    console.log('onAutocompleteSelected: ', result);
    this.addForm.controls['location'].setValue(this.pickid.nativeElement.value);
      this.addForm.patchValue({
          address: this.pickid.nativeElement.value
        });
  }

  onLocationSelected(location: Location, type) {
      this.pickupdata.lat = location.latitude;
      this.pickupdata.lng = location.longitude;
  }

  getDistance() {
    var self = this;
    var origins = String(this.pickupdata.lat) + ',' + String(this.pickupdata.lng);
    var destinations = String(this.destidata.lat) + ',' + String(this.destidata.lng);
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
        origins: [origins],
        destinations: [destinations],
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: false
    },
    function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
        } else {
            if(response.rows[0].elements[0].distance.value<1000){
              var distanceType = parseFloat( response.rows[0].elements[0].distance.text)/1000;
            }else{
              var distanceType = parseFloat( response.rows[0].elements[0].distance.text);
            }
            //console.log(distanceType);
            var distanceTime = response.rows[0].elements[0].duration.text;
            self.totaldistance = distanceType;
            self.totaltime = distanceTime;
            self.totalmin = response.rows[0].elements[0].duration.value;
            self.totaltraffictime = response.rows[0].elements[0].duration_in_traffic.text  ;
            self.cdr.markForCheck();
           
        }
    });
  }

  

showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

 onKey(values)
 {
   this.pickupdata.lat = 0;
   this.pickupdata.lng = 0;
 }

  // uploadLicense(event,type){
  //   this.license_error = false;
  //   var self = this;
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     var image_file = event.target.files[0];
  //     image_file.action=type;
  //     if(self.allowedMimes.indexOf(image_file.type) == -1){
  //       this.license_error = true;
  //     }
  //     else{
  //       if(type=='profile'){
  //         self.license_file = image_file;
  //         self.license_image_url = window.URL.createObjectURL(image_file);
  //         self.is_license_uploaded = true;
  //       }
  //     }
  //   }
  // }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  images(){
    this.license_error = false;
    this.product_images = [];
    var files = this.uploader.queue;
    console.log(files)
    var inc = files.length;
    for(var i=1;i<=inc;i++){
      if(this.product_images.length == 0){
        if(config.IMAGE_EXTENSIONS.indexOf(files[i-1]._file.type) >= 0){
          this.product_images.push(files[i-1]._file);
          this.product_images[i-1]['url'] = window.URL.createObjectURL(this.product_images[i-1]);
        }
        else{
          this.license_error = true;
        }
      }
      else{
        if(config.IMAGE_EXTENSIONS.indexOf(files[i-1]._file.type) >= 0){
          this.product_images.push(files[i-1]._file);
          this.product_images[this.product_images.length - 1]['url'] = window.URL.createObjectURL(this.product_images[i-1]);

        }
        else{
          this.license_error = true;
        }
      }
    }
    this.all_images = this.all_images.concat(this.product_images);
    this.uploader.queue = [];
    console.log(this.all_images)
  }

  delete_image(index){
    this.all_images.splice(index,1);
  }

}
