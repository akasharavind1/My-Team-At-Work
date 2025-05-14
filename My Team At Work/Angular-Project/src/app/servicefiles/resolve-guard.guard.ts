import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicefilesService } from '../servicefiles/servicefiles.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuardGuard implements Resolve<any> {
  constructor(private servicefilesService:ServicefilesService){}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  resolve(){
     return this.servicefilesService.getEmployeeList();
  }
}
