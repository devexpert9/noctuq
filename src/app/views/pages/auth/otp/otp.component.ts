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

@Component({
	selector: 'kt-forgot-password',
	templateUrl: './otp.component.html',
	encapsulation: ViewEncapsulation.None
})
export class OtpComponent implements OnInit, OnDestroy {
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
			otp: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(4) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.forgotPasswordForm.controls;
		/** check form */
		if (this.forgotPasswordForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		

		const otp = controls['otp'].value;
       if(otp != this.opttoken)
       {
          this.authNoticeService.setNotice('Please enter a valid OTP', 'danger');
		    
       	}else
       	{   this.authNoticeService.setNotice(null);
       		localStorage.setItem('otp_token',this.opttoken);
		    this.router.navigate(['/reset-password']);
       	}
          return;
		
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
}
