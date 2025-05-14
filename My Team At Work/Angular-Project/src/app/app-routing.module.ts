import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent} from '../app/admin/admin.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EmployeeComponent } from './employee/employee.component';
import { UpdateComponent } from './update/update.component';
import { ServicefilesGuard } from './servicefiles/servicefilesadmin.guard';
import { ServicefilesuserGuard } from './servicefiles/servicefilesuser.guard';
import { ServicefilesuseridcheckGuard } from './servicefiles/servicefilesuseridcheck.guard';
import { DetailemployeeComponent } from './detailemployee/detailemployee.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ResolveGuardGuard } from './servicefiles/resolve-guard.guard';
import { TestCalComponent } from './test-cal/test-cal.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
// import { DialogComponent } from './dialog/dialog.component';
const routes: Routes = [

  // {
  //   path:'DialogComponent', component:DialogComponent
  // },
  { 
    path:'', component: HomeComponent
  },
 
  {
    path:'addemployee',component: AddemployeeComponent
  },

  {
    path:'employee/:id',component: EmployeeComponent,canActivate:[ServicefilesuserGuard],
    resolve:{
      data: ResolveGuardGuard,
    }
  },
 
  {
    path:'update/:id',component: UpdateComponent,canActivate:[ServicefilesGuard]
  },
  {
    path:'admin/:id', component:AdminComponent,canActivate:[ServicefilesGuard]
  },
  {
    path:'detailemployee/:id',component: DetailemployeeComponent
  },
  { 
    path:'test-cal', component: TestCalComponent,
  },
  {
    path:'employeeprofile/:id', component: EmployeeProfileComponent, 
  },
  { 
    path:'**', component: PagenotfoundComponent,
  },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
