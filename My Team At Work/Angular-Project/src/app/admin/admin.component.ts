import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicefilesService } from '../servicefiles/servicefiles.service';
import {MatDialog} from '@angular/material/dialog';
// import { DialogComponent } from '../dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  fromDialog!:string;
  deleteEmployee: any;
  spinnerType:string;
  spinnerName:string;

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;
id: any;
  @ViewChild('dialogRef1')
  dialogRef1!: TemplateRef<any>;
   datesarr=[];
    employeeList:any;
    details:any;
    searchtext:any;
  constructor(private matSnackBar: MatSnackBar,private spinner: NgxSpinnerService,public dialog: MatDialog,private serviceData:ServicefilesService, private httpClient:HttpClient, private router: Router,private route: ActivatedRoute,private form:FormBuilder){
    this.employeeList=[];
    // this.details=[];
    this.spinnerName="sp1";
    this.spinnerType="timer";
    // this.spinner.show(this.spinnerName);
    // setTimeout(() => {
    //   this.spinner.hide(this.spinnerName);
    // }, 1250);
  }

  ngOnInit(): void{
    this.id=  this.route.snapshot.params['id'];
    // this.getEmployeeList();
    this.getEmployee();
    
    // this.getEmployee();
    // this.details();
    this.fromDialog= "I am the dialog";
 
  }

  addTeamForm=this.form.group({
    teamId: ['',[Validators.required]],
    teamName: ['',[Validators.required]],
  })

  employee:any;
  fn:any;
  empId:any;
  teamId:any;
  flag=false;
  getEmployee(){
    this.serviceData.getEmployee(this.id).subscribe((resp: any)=>{
      this.employee= resp; 
      this.fn=resp.firstName; 
      this.teamId=this.employee.teamId;
      console.log(this.teamId);
      this.empId=resp.employeeId;
      this.spinner.show(this.spinnerName);


      this.serviceData.getEmployeeListByTeam(this.teamId).subscribe((result: any)=>{
        this.employeeList= result;
        this.id=result.id;
        console.log(this.id);
        console.log(this.employeeList);
      })
      this.spinner.hide(this.spinnerName);
    }
    )}

  
//   getEmployeeList(){

   
// } 
    
// employee: any;
// empId: any;
// countt: any;
// getEmployee(){

//   this.serviceData.getEmployee(this.id).subscribe((result: any)=>{
//     // this.employee= result;  
//     this.empId=result.employeeId;
//     this.serviceData.getDates(this.empId).subscribe((result: any)=>{
//       console.log(this.empId);
//     //   this.employee2=result;
//       // console.log(this.employee2)
//       this.countt=result.length;
//       console.log(result.length);
//     })
//   })
// }

// getdetails(individual:any){
//   this.serviceData.getdetails(individual.id).subscribe((result: any)=>{
//     this.details= result;
// })
// }

delete(employees: any){

  console.log("delete",employees)

  this.serviceData.deleteEmployee(employees.deleteEmployee.id).subscribe((Response) => {
      console.log(Response);
      this.getEmployee();
    } )
    this.matSnackBar.open("DELETED SUCCESSFULLY ...!✔👍", "Okay!", {
      duration: 2500,
      horizontalPosition: "center",
      verticalPosition: "top",
      // direction: "rtl"
    })
    const dialogue= this.dialog.closeAll();
}
logout(){
  localStorage.removeItem('tokenadmin');
      this.router.navigate(['/']);
      this.matSnackBar.open("LOGGED OUT SUCCESSFULLY ...!✔👍", "Okay!", {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: "top",
        // direction: "rtl"
      })
      const dialogue= this.dialog.closeAll();

 };
// snack(){
//  this.matSnackBar.open("USER DETAILS✔👍", "Okay!", {
//   duration: 2500,
//   horizontalPosition: "center",
//   verticalPosition: "top",
//   // direction: "rtl"
// })
// }
 cancelDialog(){
  
  const dialogue= this.dialog.closeAll();
}


 openDialog1(){

  const dialogue= this.dialog.open(this.dialogRef1);
 
    
  }



 openDialog(employee: any){
  this.deleteEmployee = employee
  console.log(this.deleteEmployee)

  const dialogue= this.dialog.open(this.dialogRef);
  
}

addTeam(){

  let requestBody={
    teamId: this.addTeamForm.get('teamId')?.value,
    teamName: this.addTeamForm.get('teamName')?.value
  }

  this.serviceData.addTeam(requestBody).subscribe((result: any)=>{


  })

}


}
