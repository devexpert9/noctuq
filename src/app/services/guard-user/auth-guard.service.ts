import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { config } from '../../config';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
errors : any = ['',null,undefined,'undefined','null'];
  constructor(private router: Router, public userService: UserService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    var token = localStorage.getItem('niteowl_auth_token');
    var token1 = localStorage.getItem('niteowl_host_auth_token');
    var userId = this.userService.decryptData(token,config.ENC_SALT);
    var hostId = this.userService.decryptData(token1,config.ENC_SALT);
    if((userId != 0 && this.errors.indexOf(userId) == -1)|| (hostId != 0 && this.errors.indexOf(hostId) == -1)){
      console.log(route.url.length)
      console.log(route.url[0]['path'])
      console.log('3')
      return true;
    }
    else{
      console.log('4')
      console.log(route.url.length)
      console.log(route.url[0]['path'])
      if(route.url.length > 0 && route.url[0]['path'] == 'host-events'){
        console.log('5')
        var token = localStorage.getItem('niteowl_host_auth_token');
        var userId = this.userService.decryptData(token,config.ENC_SALT);
        if(userId != 0 && this.errors.indexOf(userId) == -1){
          console.log('6')
          console.log('user-pass')
          return true;41
          "?;"
        }
        else{
          console.log('7')
          console.log('user-fail')
          this.router.navigate(['/login/host']);
          return false;
        }
      }
      else{
        console.log('8')
        console.log('user-fail23')
        this.router.navigate(['/login']);
        return false;
      }
        
    }
  }
}