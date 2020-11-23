// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Auth reducers and selectors
import { AppState} from '../../../core/reducers/';
import { isLoggedIn } from '../_selectors/auth.selectors';
import { config } from '../../../config';
import { UserService } from '../../../core/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
      errors : any = ['',null,undefined,'undefined','null'];
    constructor(private store: Store<AppState>, private router: Router, public userService: UserService) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree  {
     var token = localStorage.getItem('apart_admin_auth_token');
      var userId = this.userService.decryptData(token,config.ENC_SALT);
       if(userId != 0 && this.errors.indexOf(userId) == -1){
          return true;
        }
        else{
          return this.router.navigate(['/']);
        }
       // return this.store
        //    .pipe(
         //       select(isLoggedIn),
         //       tap(loggedIn => {
          //          if (!loggedIn) {
         //               this.router.navigateByUrl('/auth/login');
           //         }
          //      })
           // );
    }
}
