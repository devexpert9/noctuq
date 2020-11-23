// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';
import { config } from '../../../../config';
import { UserService } from '../../../../core/user/user.service';
import * as $ from 'jquery';
/**
 * ! Just example => Should be removed in development
 */
//const DEMO_PARAMS = {
//	EMAIL: 'admin@demo.com',
//	PASSWORD: 'demo'
//};

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params

    password:any;
	confirmpassword:any;
	addreset: FormGroup;
	addform: FormGroup;
	addotp: FormGroup;
    BASE_URL:any = config.BASE_URL;
	otpId:any;
	userid:any;


	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		public userService: UserService
	) {
		
		if(localStorage.apart_admin_auth_token != undefined)
       {
       	  this.router.navigate(['/panel']);
       }

		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	  loginback()
	 {
		 $('.form-login').show();
		 $('.form-forgot').hide(); 
	 }
	 forgot()
	 {
		 $('.form-login').hide();
		 $('.form-forgot').show();
		 $('.form-otp').hide();
		 $('.form-reset').hide();
	 }

	ngOnInit(): void {
		this.authNoticeService.setNotice(null);
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params['returnUrl'] || '/';
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		this.addform = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email
			])
			]
		});
		this.addotp = this.fb.group({
			otp: ['', Validators.compose([
				Validators.required
			])
			]
			
		});
		this.addreset = this.fb.group({
			password: ['', Validators.compose([
				Validators.required
			])
			],
			confirmpassword: ['', Validators.compose([
				Validators.required
			])
			]
			
		});
		this.loginForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email
			])
			],
			password: ['', Validators.compose([
				Validators.required
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submitreset()
	{
		const controls = this.addreset.controls; 
		console.log(controls);
		if (this.addreset.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		if(this.password == this.confirmpassword){
		 this.loading = true;
		  const Fordata = {
			id:this.userid,
			user_type:2,
			password:controls['password'].value,
		};
		
		this.userService.postData(Fordata,'reset_subadmin_password').subscribe((result) => {
			this.loading = false;
			if(result.status == 1){
	       
	           this.authNoticeService.setNotice('Password updated successfully!', 'success');
			   $('.form-login').show();
			   $('.form-reset').hide();
		    }
		    else{
		        this.authNoticeService.setNotice('Error Occured!', 'danger');
		    }
		});
		}
	}	

	 submitotp()
	 {
		const controls = this.addotp.controls; 
		console.log(controls);
		if (this.addotp.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		
		 this.loading = true;
		 const Fordata = {
			otp_id:this.otpId,
			otp: controls['otp'].value,
		};
		
		this.userService.postData(Fordata,'verify_otp').subscribe((result) => {
			this.loading = false;
			if(result.status == 1){
	        this.userid=result.data.userId;
	           this.authNoticeService.setNotice('OTP is correct!', 'success');
			   $('.form-reset').show();
			   $('.form-otp').hide();
		    }
		    else{
		        this.authNoticeService.setNotice('OTP is incorrect!', 'danger');
		    }
		});
	 }
	
	 
	 
	 
	 
	 submitforgot()
	 {
		const controls = this.addform.controls; 
		console.log(controls);
		if (this.addform.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		
		 this.loading = true;
		 const Fordata = {
			baseUrl:this.BASE_URL,
			email: controls['email'].value,
		};
		
		this.userService.postData(Fordata,'forgot_password_admin').subscribe((result) => {
			this.loading = false;
			if(result.status == 1){
	          this.otpId=result.data.otpId;
	           this.authNoticeService.setNotice('OTP for password reset has been send to your email!', 'success');
			   $('.form-forgot').hide();
			   $('.form-otp').show();
		    }else if(result.status==2)
			{
			 this.authNoticeService.setNotice('Email does not exists!', 'danger');	
				
			}
		    else{
		        this.authNoticeService.setNotice('Error occured!', 'danger');
		    }
		});
	 }
	submit() {
		console.log('------');
		console.log(this.BASE_URL);
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			email: controls['email'].value,
			password: controls['password'].value
		};
		console.log(authData);
     

		this.userService.postData(authData,'admin_login').subscribe((result) => {
			this.loading = false;
			if(result.status == 1){
				console.log("done");
	          this.authNoticeService.setNotice('Logged in successfully!', 'success');
	          var userId = this.userService.encryptData(result.data._id,config.ENC_SALT);
	          // this.store.dispatch(new Login({authToken: 'access-token-' +userId}));
    		  localStorage.setItem('apart_admin_auth_token',userId);
    		  localStorage.setItem('apart_admin_name',result.data.name);
    		  localStorage.setItem('apart_admin_email',result.data.email);
    		  localStorage.setItem('apart_admin_image',result.data.image);
    		  localStorage.setItem('apart_admin_phone',result.data.phone);
	          this.router.navigate(['/panel']);
		    }else if(result.status == 3)
		    {
              this.authNoticeService.setNotice('Your account has been deactivated by admin', 'danger');
		    }
		    else{
		        this.authNoticeService.setNotice('Invalid credentials!', 'danger');
		    }
		});



		
		// this.auth
		// 	.login(authData.email, authData.password)
		// 	.pipe(
		// 		tap(user => {
		// 			if (user) {
		// 				this.store.dispatch(new Login({authToken: user.accessToken}));
		// 				this.router.navigateByUrl(this.returnUrl); // Main page
		// 			} else {
		// 				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		// 			}
		// 		}),
		// 		takeUntil(this.unsubscribe),
		// 		finalize(() => {
		// 			this.loading = false;
		// 			this.cdr.markForCheck();
		// 		})
		// 	)
		// 	.subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError2(controlName: string, validationType: string): boolean {
		const control = this.addotp.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	} 
	 
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
	 
	isControlHasError3(controlName: string, validationType: string): boolean {
		const control = this.addreset.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
	isControlHasError1(controlName: string, validationType: string): boolean {
		const control = this.addform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
