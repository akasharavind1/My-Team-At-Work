import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicefilesService } from './servicefiles.service';

@Injectable({
  providedIn: 'root'
})
export class ServicefilesuseridcheckGuard implements CanActivateChild {
  constructor(private auth: ServicefilesService, private router:Router){
  }
  canActivateChild(){
   if(this.auth.IsLoggedUserId()){
    return true;
   }
   this.router.navigate(['']);
   return false;
}
}
