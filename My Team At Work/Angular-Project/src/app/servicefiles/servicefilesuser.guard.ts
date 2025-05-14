import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicefilesService } from './servicefiles.service';

@Injectable({
  providedIn: 'root'
})
export class ServicefilesuserGuard implements CanActivate{
  constructor(private auth: ServicefilesService, private router:Router){
  }
  canActivate(){
   if(this.auth.IsLoggedUser()){
    return true;
   }
   this.router.navigate(['']);
   return false;
}
  // canActivated(){
  //   if(this.auth.IsLoggedUserId()){
  //     return true;
  //    }
  // }
}
