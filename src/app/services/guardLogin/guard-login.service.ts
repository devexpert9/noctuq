import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { config } from '../../config';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginService implements CanActivate{
errors : any = ['',null,undefined,'undefined','null'];
  constructor(private router: Router, public userService: UserService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {

    var login_type = localStorage.getItem('userType')
    var redirection = login_type == 'user' ? '/home-list' : '/host-events';

    if(this.errors.indexOf(login_type) == -1){
      console.log('9')
      this.router.navigate([redirection]);
      return false;
    }
    else{
   
      return true;
    }
  }
}

