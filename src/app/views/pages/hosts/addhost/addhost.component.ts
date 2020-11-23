import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer } from '@angular/platform-browser';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-addhost',
  templateUrl: './addhost.component.html',
  styleUrls: ['./addhost.component.scss']
})
export class AddhostComponent implements OnInit {
  is_submit:boolean=false;
  is_license_uploaded:boolean=false;
  license_image_url:any;
  loading = false;
  license_error:boolean=false;
  addForm: FormGroup;
  places = new FormControl();
  public uploader:FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOver:boolean = false;
  timestamp:any;
  allowedMimes:any = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg'];
  license_file:any;
  errors : any = ['',null,undefined];
  password:any;
  confirmpassword:any; 
 
  placeList: string[] = ['KATU', 'Kembali', 'La Cabane Bar Marcaipe', 'La Caverna', 'La Creperie' , 'La Rocca' , 'La Ursa'];

  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef, public sanitizer:DomSanitizer,public userService: UserService, private _snackBar: MatSnackBar, private router: Router, private modalService: NgbModal) {
    this.timestamp = new Date().getTime();
   }

  ngOnInit() 
  {
  	this.initAddForm();
  }

  initAddForm(){
  	this.addForm = this.fb.group({
	  email: ['', Validators.compose([
				Validators.required,
				Validators.email
			])
			],
	  name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      password:  ['', Validators.compose([Validators.required])],
      confirmpassword:  ['', Validators.compose([Validators.required])],
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
    else{
		if(this.password == this.confirmpassword){
			this.finalSubmit(controls);
		}
    }

  }


  finalSubmit(controls){
    this.loading = true;
    const frmData = new FormData();  
    if(this.license_file=='')
	{
      frmData.append("file", "");
	}else{
	  frmData.append("file", this.license_file);	
	}

    frmData.append("name", controls['name'].value);
    frmData.append("phone", controls['phone'].value);  
    frmData.append("password", controls['password'].value);
    frmData.append("email", controls['email'].value);
   
    this.userService.postData(frmData,'add_host').subscribe((result) => { 
        if(result.status == 1){
          
		this.loading = false;

		this.showSnackBar('Host has been added successfully');  
		this.addForm.reset();
        this.router.navigate(['/panel/hosts']);		
          
        }
        else if(result.status == 2){
          this.loading = false;
          this.showSnackBar('Email already exist,Please try with another one');
        }
        else{
          this.loading = false;
          this.showSnackBar('Error while adding user,Please try after some time');
        }
    },
    err => {
        this.showSnackBar('Technical error,Please try after some time');
    });
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

  showSnackBar(message){
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

}
