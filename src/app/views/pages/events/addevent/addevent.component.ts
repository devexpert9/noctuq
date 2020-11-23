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
  selector: 'kt-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent implements OnInit {
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
minDate:any;
 //public values: string = '<p>The RichTextEditor actions. </p>';
      
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
    this.get_venues_genres();
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
      date: ['', Validators.compose([Validators.required])],
      end_date: ['', Validators.compose([Validators.required])],
      start_time: ['', Validators.compose([Validators.required])],
      end_time: ['', Validators.compose([Validators.required])],
      description:['']
      // is_hot:[''],
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

      console.log('invalid',this.addForm.value)
    
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      // if(this.pickupdata.lat == 0 || this.pickupdata.lat == null || this.pickupdata.lat == undefined)
      // {
      //   this.addForm.controls['location'].setErrors({'incorrect': true});
      // }
      return;
    }

    //  if(this.pickupdata.lat == 0 || this.pickupdata.lat == null || this.pickupdata.lat == undefined)
    // {
    //   console.log('1invalid')
    //  this.addForm.controls['location'].setErrors({'incorrect': true});
    //  return;
    // }
    console.log('2invalid')
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
      // if(controls['is_hot'].value == true)
      // {
      //   frmData.append("is_hot", '0');
      // }else{dd
      //  frmData.append("is_hot", '1');
      // }
    frmData.append("is_hot", '1');
    frmData.append("title", controls['title'].value);
    frmData.append("price", controls['price'].value);  
    frmData.append("venue_type", controls['venue_type'].value);
    frmData.append("genre", JSON.stringify(controls['genre_type'].value));
    // frmData.append("address", controls['location'].value);
    frmData.append("date", start_date);
    frmData.append("end_date", end_date);
    frmData.append("start_time", this.convertTime(this.addForm.value.start_time));
    frmData.append("end_time", this.convertTime(this.addForm.value.end_time));
    frmData.append("lat", this.pickupdata.lat.toString());
    frmData.append("lng", this.pickupdata.lng.toString());
    frmData.append("venue_description", controls['description'].value);


   this.userService.postData(frmData,'add_event/'+'12345'+'/'+this.convertTime(this.addForm.value.start_time)+'/'+start_date+'/'+this.convertTime(this.addForm.value.end_time)+'/'+ end_date+'/'+controls['venue_type'].value+'/'+momemnt.tz.guess()).subscribe((result) => { 
        console.log(result);
        if(result.status == 1){
          this.loading = false;
          this.showSnackBar('Event has been created successfully');  
          this.addForm.reset();
          this.router.navigate(['/panel/events/']);    
        }
        else if(result.status == 2){
          this.loading = false;
          this.showSnackBar('Event name already exist,Please try with another one');
        }else if(result.status == 5){
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
          this.showSnackBar('Error while adding event,Please try after some time');
        }
    },
    err => {
        this.loading = false;
        this.showSnackBar('Technical error,Please try after some time');
    });
  }

get_venues_genres(){
    this.userService.postData({},'get_venues_genres').subscribe((result) => {
      this.allGenre = result.genres;
      this.allVenues = result.venues_list;
    },
    err => {
      this.allGenre = [];
      this.allVenues = [];
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

  

}
