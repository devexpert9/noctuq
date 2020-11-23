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
  selector: 'kt-editvenue',
  templateUrl: './editvenue.component.html',
  styleUrls: ['./editvenue.component.scss']
})
export class EditvenueComponent implements OnInit {
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
images1:any=[];
post:any;
totalmin:any;
totaltraffictime:any;
total:number;
showActions: boolean = false;
showActionss: boolean = true;

venue_type = new FormControl('');
genre_type = new FormControl('');
description = new FormControl('');
isLoading = false;
IMAGES_URL:any = config.IMAGES_URL;


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

checkval: any = false;

selectedVenue: string;
selected: string[];
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

 public values: string;

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

deleted_imgs:any=[];
deleted_files:any=[];
        
  constructor(private fb: FormBuilder, public sanitizer:DomSanitizer, private _snackBar: MatSnackBar, private modalService: NgbModal,public userService: UserService, private cdr: ChangeDetectorRef, private router: Router,public activatedRoute: ActivatedRoute) 
  {
    this.id = activatedRoute.snapshot.paramMap.get('id');
    this.getVenues();
    this.getGenre();
    this.getData();
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
      if(this.errors.indexOf(this.all_images[i]['_id']) >= 0){ 
      	frmData.append("file", this.all_images[i]);  
  	  }
    }

     
    frmData.append("name", controls['title'].value);
    frmData.append("price", controls['price'].value);  
    frmData.append("venue_type", JSON.stringify(controls['venue_type'].value));
    frmData.append("genre", JSON.stringify(controls['genre_type'].value));
    frmData.append("deleted_imgs", JSON.stringify(this.deleted_imgs));
    frmData.append("deleted_files", JSON.stringify(this.deleted_files));
    frmData.append("address", controls['location'].value);
    frmData.append("lat", this.pickupdata.lat.toString());
    frmData.append("lng", this.pickupdata.lng.toString());
    frmData.append("venue_description", controls['description'].value);
    frmData.append("id", this.id);

    if(this.all_images.length>10){
      this.showSnackBar('You can only upload up to 10 images.');
      this.loading = false;
    }else{
      
      this.userService.postData(frmData,'edit_venue').subscribe((result) => { 
        console.log(result);
        if(result.status == 1){
          this.loading = false;
          this.showSnackBar('Venue has been updated successfully');  
          this.addForm.reset();
          this.router.navigate(['/panel/venues']);    
        }
        else if(result.status == 2){
          this.loading = false;
          this.showSnackBar('Venue already exists,Please try with another one');
        }
        else{
          this.loading = false;
          this.showSnackBar('Error while updating venue,Please try after some time');
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

  getData(){
    this.userService.postData({venue_id: this.id},'get_venue_details').subscribe((result) => {
   console.log(result);
   
    this.post=result.venue;
    this.all_images=result.images;
    this.isLoading = false;
    this.values = result.venue_description;
    var all_venues = [];
    if(this.post.venue_type.length > 0){
    	this.post.venue_type.forEach(function(ven){
    		all_venues.push(ven._id);
    	});
    }


    this.addForm.patchValue({
      title: this.post.name,
     location: this.post.address,
     price: this.post.price,
     genre_type: this.post.genre,
     venue_type: all_venues,
     description: this.post.venue_description
    });

    this.pickupdata.lat = this.post.cords.coordinates[1];
    this.pickupdata.lng = this.post.cords.coordinates[0];
      this.isLoading = false;
    this.cdr.markForCheck();
    console.log('lat ---- lng');
    console.log(this.pickupdata);
    },
    err => {
    this.isLoading = false;
    });
  }

  delete_image(index,img){
  	this.all_images.splice(index,1);
    this.cdr.markForCheck();
    if(this.errors.indexOf(img._id) == -1){
      this.deleted_imgs.push(img._id);
      this.deleted_files.push(img.file_name);
    }
    console.log(this.deleted_imgs)
  }

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

}
