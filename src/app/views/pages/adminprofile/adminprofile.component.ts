// Angular
import { Component, OnInit, OnDestroy ,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router ,Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../core/reducers';
import { DomSanitizer } from '@angular/platform-browser';
import { config } from '../../../config';
import { UserService } from '../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubheaderService, LayoutConfigService } from '../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../core/_base/crud';
import * as $ from 'jquery';
@Component({
  selector: 'kt-edituser',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminprofileComponent implements OnInit {
is_license_uploaded:boolean=false;

		id:any;
		type:any;
		pass:any;
		errors : any = ['',null,undefined];
		post:any;
		license_error:boolean=false;
		IMAGES_URL:any = config.IMAGES_URL;
		isLoading = true;
		is_submit:boolean=false;
		loading = false;
		password:any;
		confirmpassword:any;
		allowedMimes:any = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg'];
		license_file:any;
   
		license_image_url:any;
    
		all_images:any=[];
		images1:any=[];
		deleted_images:any=[];
		deleted_files:any=[];
		selectedTab: number = 0;
		loading$: Observable<boolean>;
		public uploader:FileUploader = new FileUploader({url: ''});
		public hasBaseDropZoneOver:boolean = false;
		addForm: FormGroup;
		changeForm: FormGroup;
    all_countries:[];
  allVehicles:[];
  allMakes:any=[];
  totalpages:number;
  token:any = null;

		constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef, public sanitizer:DomSanitizer,public userService: UserService, private _snackBar: MatSnackBar, private router: Router,public activatedRoute: ActivatedRoute) {
	console.log('dsdsdsdds');
  	this.token = localStorage.getItem('apart_admin_email');
console.log('token = '); console.log(this.token);
    this.id = activatedRoute.snapshot.paramMap.get('id');
		this.type = activatedRoute.snapshot.paramMap.get('type'); 
		
		this.getData();

   	this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
        }

          if (event instanceof NavigationEnd) {
            this.id = activatedRoute.snapshot.paramMap.get('id');
			      this.type = activatedRoute.snapshot.paramMap.get('type');  
			      this.getData();
          }

            if (event instanceof NavigationError) {
                console.log(event.error);
            }
        });
	
			}

		ngOnInit() {
		this.initAddForm();
   
  //  this.cdr.markForCheck();
		}

		initAddForm(){
    this.addForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
    });


    this.changeForm = this.fb.group({
      oldpassword: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmpassword: ['', Validators.compose([Validators.required])]
     
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
   isControlHasError1(controlName: string, validationType: string): boolean {
    const control = this.changeForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }


  arrayOne(n: number): any[] {
   return Array(n);
  }

  submit1() {
  
    this.is_submit = true;
    const controls = this.changeForm.controls;
    if (this.changeForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    else{
    if(this.password == this.confirmpassword){
      this.finalSubmit1(controls);
    }
      
    }

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
      this.finalSubmit(controls);
    }

  }

  finalSubmit(controls){
    
    this.loading = true;
       
   var dict = {
      name: controls['name'].value,
      email: controls['email'].value,
      phone: controls['phone'].value,
      id: this.id
    }
    this.userService.postData(dict,'admin_profile_update').subscribe((result) => { 
        this.loading = false;
        if(result.status == 1){
          this.cdr.markForCheck();
          localStorage.setItem('apart_admin_name',controls['name'].value);
          localStorage.setItem('apart_admin_email',controls['email'].value);
    this.showSnackBar('Admin profile has been updated successfully'); 
       // this.router.navigate(['/panel/users/']);
          
        } else if(result.status == 2){
        this.showSnackBar('Email already exists!');
      }
        else{
          this.loading = false;
          this.showSnackBar('Error while updating profile,Please try after some time');
        }
    },
    err => {
        this.showSnackBar('Technical error,Please try after some time');
    });
  }
     
  

   finalSubmit1(controls){
	
    this.loading = true;
   var dict = {
    password:controls['password'].value,
    oldpassword:controls['oldpassword'].value,
    id:this.id
	}
	
    this.userService.postData(dict,'reset_admin_password').subscribe((result) => {   
    
        if(result.status == 1){
		this.loading = false;
		this.showSnackBar('Admin Password updated successfully');  
		this.changeForm.reset();
    this.cdr.markForCheck();
        this.router.navigate(['/panel/profile/']);		
        }else if(result.status == 2){
          this.loading = false;
          this.showSnackBar('Old Password is incorrect');  
        } 
        else{
          this.loading = false;
          this.showSnackBar('Error while updating password ,Please try after some time');
		  this.addForm.reset();
        this.router.navigate(['/panel/profile/']);	
        }
    },
    err => {
        this.showSnackBar('Technical error,Please try after some time');
    });
  }  
  
  getData(){
		this.userService.postData({email: this.token},'admin_profile').subscribe((result) => {
		this.post=result;
		this.isLoading = false;
		this.addForm.patchValue({
			name: this.post.name,
			phone: this.post.phone,
			email: this.post.email,
     
		});
    this.id = this.post._id,
	    this.isLoading = false;
    this.cdr.markForCheck();
		},
		err => {
		this.isLoading = false;
		});
	}
	showSnackBar(message){
    	this._snackBar.open(message, 'Close', {
      	duration: 3000,
    	});
  	}
}
