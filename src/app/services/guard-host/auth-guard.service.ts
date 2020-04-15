import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { config } from '../../config';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardHostService implements CanActivate{
errors : any = ['',null,undefined,'undefined','null'];
  constructor(private router: Router, public userService: UserService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    var token = localStorage.getItem('niteowl_host_auth_token');
    var userId = this.userService.decryptData(token,config.ENC_SALT);
    if(userId != 0 && this.errors.indexOf(userId) == -1){
      return true;
    }
    else{
      this.router.navigate(['/login/host']);
      return false;
    }
  }
}
