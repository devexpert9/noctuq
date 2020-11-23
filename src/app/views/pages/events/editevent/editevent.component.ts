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
import * as momemnt from 'moment-timezone';
@Component({
  selector: 'kt-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.scss']
})
export class EditeventComponent implements OnInit {
@ViewChild('pickid',{static:true}) pickid: ElementRef;
@ViewChild('dropid',{static:true}) dropid: ElementRef;
@ViewChild('toolsRTE1',{static:true}) public rteObj: RichTextEditorComponent;

// public miniDate: Date = new Date ("05/07/2017");
// public maxDate: Date = new Date ("05/27/2017");
// public dateValue: Date = new Date ("05/16/2017");

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
host_id: any;
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
minDate:any;
 public values: string;
      
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
        
  constructor(private fb: FormBuilder, public sanitizer:DomSanitizer, private _snackBar: MatSnackBar, private modalService: NgbModal,public userService: UserService, private cdr: ChangeDetectorRef, private router: Router,public activatedRoute: ActivatedRoute) 
  {
   
    this.id = activatedRoute.snapshot.paramMap.get('id');
    this.get_venues_genres();
    this.getGenre();
    this.getData();
    this.minDate = new Date();
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
      // location: ['', Validators.compose([Validators.required])],
      description:[''],
      // is_hot:[''],
      date: ['', Validators.compose([Validators.required])],
      end_date: ['', Validators.compose([Validators.required])],
      start_time: ['', Validators.compose([Validators.required])],
      end_time: ['', Validators.compose([Validators.required])]
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
    this.finalSubmit(controls);
  }

  convertTime(val){
    var time = val;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if(AMPM == "pm" && hours<12) hours = hours+12;
    // if(AMPM == "am" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
  }

  reConvertTime(val){
   
    const [sHours, minutes] = val.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'am' : 'pm';
    const hours = +sHours % 12 || 12;
  
    return `${hours}:${minutes} ${period}`;
   
  }

 

  finalSubmit(controls){
    this.loading = true;
    var current = new Date(controls['date'].value);
    var endDate = new Date(controls['end_date'].value);
    var start_date = current.getFullYear()+'-'+(((current.getMonth()+1) < 10 ? '0'+(current.getMonth()+1) : (current.getMonth()+1)))+'-'+(current.getDate() < 10 ? '0'+current.getDate() : current.getDate());


    var end_date = endDate.getFullYear()+'-'+(((endDate.getMonth()+1) < 10 ? '0'+(endDate.getMonth()+1) : (endDate.getMonth()+1)))+'-'+(endDate.getDate() < 10 ? '0'+endDate.getDate() : endDate.getDate());


    const frmData = new FormData();  
      if(this.license_file=='')
      {
      frmData.append("file", "");
      }else{
      frmData.append("file", this.license_file);  
      }

    var sTime = this.convertTime(this.addForm.value.start_time)
    var eTime = this.convertTime(this.addForm.value.end_time)
    frmData.append("is_hot", '1');
    frmData.append("title", controls['title'].value);
    frmData.append("price", controls['price'].value);  
    frmData.append("venue_type", controls['venue_type'].value);
    frmData.append("genre", JSON.stringify(controls['genre_type'].value));
    // frmData.append("address", controls['location'].value);
    frmData.append("lat", this.pickupdata.lat.toString());
    frmData.append("lng", this.pickupdata.lng.toString());
    frmData.append("venue_description", controls['description'].value);
    frmData.append("date", start_date);
    frmData.append("end_date", end_date);
    frmData.append("start_time", sTime);
    frmData.append("end_time", eTime);
    frmData.append("id", this.id);

    this.userService.postData(frmData,'edit_event/'+this.host_id+'/'+sTime+'/'+start_date+'/'+eTime+'/'+end_date+'/'+controls['venue_type'].value+'/'+this.id+'/'+momemnt.tz.guess()).subscribe((result) => { 
        console.log(result);
        if(result.status == 1){
          this.loading = false;
          this.showSnackBar('Event has been updated successfully');  
          this.addForm.reset();
          this.router.navigate(['/panel/events/']);    
        }
        else if(result.status == 2){
          this.loading = false;
          this.showSnackBar('Event name already exist,Please try with another one');
        } else if(result.status == 5){
          this.loading = false;
          this.showSnackBar('You can not add event on past date and time');
          
        }
        else if(result.status == 7){
          this.loading = false;
          this.showSnackBar('End date should be greater than start date');
          
        }
        else if(result.status == 6){
          this.loading = false;
          this.showSnackBar('End time should be greater than start time');
        
        }
        else if(result.status == 9){
          this.loading = false;
          this.showSnackBar('Event already exists in selected dates');
        
        }
        else{
          this.loading = false;
          this.showSnackBar('Error while updating event,Please try after some time');
        }
    },
    err => {
        this.loading = false;
        this.showSnackBar('Technical error,Please try after some time');
    });
  }

// getVenues(){ 
//     this.userService.postData('','get_venues').subscribe((result) => {
//       this.allVenues = result;
//     });
//   }

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
  uploadLicense(event,type){
    this.license_error = false;
    var self = this;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var image_file = event.target.files[0];
      image_file.action=type;
      if(self.allowedMimes.indexOf(image_file.type) == -1){
        this.license_error = true;
      }
      else{
        if(type=='profile'){
          self.license_file = image_file;
          self.license_image_url = window.URL.createObjectURL(image_file);
          self.is_license_uploaded = true;
        }
      }
    }
  }

  getData(){
    this.userService.postData({id: this.id},'get_single_event').subscribe((result) => {
   console.log(result);
   
    this.post=result;
    this.images1=result.images;
    this.isLoading = false;
    this.values = result.venue_description;
    console.log(result.genre);
    
    if(result.is_hot == 0)
    {
      this.checkval = true;
    }
    this.addForm.patchValue({
      title: this.post.title,
     location: this.post.address,
     price: this.post.price,
     date: this.post.date.split("-")[1]+'/'+this.post.date.split("-")[2]+'/'+this.post.date.split("-")[0],
     end_date: this.post.end_date.split("-")[1]+'/'+this.post.end_date.split("-")[2]+'/'+this.post.end_date.split("-")[0],
    //  start_time: this.post.time,
     start_time: this.reConvertTime(this.post.time),
     end_time: this.reConvertTime(this.post.end_time),
     genre_type: result.genre,
     venue_type: result.venue_type,
     is_hot: this.checkval,
    });

    this.host_id = this.post.hostId

   

    // this.startTime = this.post.time
    // this.endTime = this.post.end_time

      if(this.addForm.controls['description'].value == '')
      {
         this.addForm.controls['description'].setValue(result.venue_description);
      }
   

    // this.pickupdata.lat = this.post.cords.coordinates[1];
    // this.pickupdata.lng = this.post.cords.coordinates[0];
      this.isLoading = false;
    this.cdr.markForCheck();
    console.log('lat ---- lng');
    console.log(this.pickupdata);
    },
    err => {
    this.isLoading = false;
    });
  }

  get_venues_genres(){
    this.userService.postData({},'get_venues_genres').subscribe((result) => {
 
      this.allVenues = result.venues_list;
    },
    err => {
      this.allGenre = [];
      this.allVenues = [];
    });
  }

}