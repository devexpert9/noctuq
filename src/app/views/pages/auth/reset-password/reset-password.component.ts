// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Auth
import { AuthNoticeService, AuthService } from '../../../../core/auth';
import { UserService } from '../../../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'kt-forgot-password',
	templateUrl: './reset-password.component.html',
	encapsulation: ViewEncapsulation.None
})
export class ResetpasswordComponent implements OnInit, OnDestroy {
	// Public params
	forgotPasswordForm: FormGroup;
	loading = false;
	errors: any = [];
	opttoken:any = null;

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param authService
	 * @param authNoticeService
	 * @param translate
	 * @param router
	 * @param fb
	 * @param cdr
	 */
	constructor(
		private authService: AuthService,
		public authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private fb: FormBuilder,
		public userService: UserService,
		private cdr: ChangeDetectorRef,
	    private _snackBar: MatSnackBar,

	) {
		if(localStorage.otp_token == undefined)
       {
       	  this.router.navigate(['/forgot-password']);
       }else
       {
          this.opttoken = localStorage.otp_token;
       	  localStorage.removeItem('otp_token');
       }

		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.authNoticeService.setNotice(null);
		this.initRegistrationForm();
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegistrationForm() {
		this.forgotPasswordForm = this.fb.group({
			 password: ['', Validators.compose([Validators.required])],
         confirmpassword: ['', Validators.compose([Validators.required])]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
    const controls = this.forgotPasswordForm.controls;
    if (this.forgotPasswordForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    else{
    if(controls['confirmpassword'].value == controls['password'].value){
      this.finalSubmit(controls);
    }
      
    }

  }

  finalSubmit(controls){
    this.loading = true;
   var dict = {
    password:controls['password'].value,
    otp:this.opttoken,
    email:localStorage.otp_email
	}
    this.userService.postData(dict,'reset_adminpanel_password').subscribe((result) => {   
    
        if(result.status == 1){
		this.loading = false;
		this.showSnackBar('Your Password has been updated successfully');  
		this.forgotPasswordForm.reset();
        this.router.navigate(['/login']);		
        } 
        else{
          this.loading = false;
          this.showSnackBar('Error while updating password ,Please try after some time');
		  this.forgotPasswordForm.reset();
        this.router.navigate(['/login']);	
        }
    },
    err => {
        this.showSnackBar('Technical error,Please try after some time');
    });
  }  

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.forgotPasswordForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}


	finalsubmit(email) {
		this.loading = true;

		const authData = {
			email: email,
		};   

		this.userService.postData(authData,'admin_forgot_password').subscribe((result) => {
			this.loading = false;
			if(result.status == 1){
				
	          this.router.navigate(['/panel']);
		    }
		   // else if(result.status == 3)
		   // {
           //   this.authNoticeService.setNotice('Your account has been deactivated by admin', 'danger');
		   // }
		    else{
		        this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.NOT_FOUND', {name: this.translate.instant('AUTH.INPUT.EMAIL')}), 'danger');
		    }
		});
	}

	showSnackBar(message){
    	this._snackBar.open(message, 'Close', {
      	duration: 3000,
    	});
  	}
}
