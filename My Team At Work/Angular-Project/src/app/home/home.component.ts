import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicefilesService } from '../servicefiles/servicefiles.service';
import { AdminComponent } from '../admin/admin.component';
import { EmployeeComponent } from '../employee/employee.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
click: any;
  classList: any;
  id:any;
  spinnerType:string;
  spinnerName:string;
  // isdarktheme=true;
  constructor (private matSnackBar: MatSnackBar,private spinner: NgxSpinnerService,private route: ActivatedRoute, private form:FormBuilder,private router:Router, private serviceData:ServicefilesService){
    this.employeeList=[];
    this.spinnerName="sp1";
    this.spinnerType="timer";
    this.spinner.show(this.spinnerName);
    setTimeout(() => {
      this.spinner.hide(this.spinnerName);
    }, 1250);
  }
  ngOnInit(): void{
    

    this.id=  this.route.snapshot.params['id'];
    this.getEmployeeList()
  }
  employeeList:any;
    //this is formbuilder method 
      passwrong=false;
    detailswrong=false;
    schedule=false;
  
    validateemployee = this.form.group({
      mailID:['', Validators.required],
      password:['',Validators.required]

    })
   
    
    login(): void{

      if(true){
          let requestBody={
            mailID: this.validateemployee.get('mailID')?.value,
            password: this.validateemployee.get('password')?.value,
          }
          this.serviceData?.postLogin(requestBody).subscribe((result: any)=>{
            console.log(result);
           if(result.statusCodeValue==200 && result.body.roles=="admin" &&  result.body.message=="User retrieved successfully"){
            console.log(result);
            localStorage.setItem('tokenadmin',"AH2EjtcmoURSXm2RhZ8ihnJrsty");
          //  localStorage.setItem('ROLE','ADMIN')
          this.matSnackBar.open("LOGGINED SUCCESSFULLY ...!✔👍", "Okay!", {
            duration: 1500,
            horizontalPosition: "center",
            verticalPosition: "top",
            // direction: "rtl"
          })
            this.router.navigateByUrl('/admin/'+result.body.id);
          }
          else if(result.statusCodeValue==200 && result.body.roles=="user" &&  result.body.message=="User retrieved successfully"){
            console.log(result);
            localStorage.setItem('tokenuser',"7Ewm3NEnJDM")
           localStorage.setItem('idd',result.body.id);
           
          //  if(this.id==localStorage.getItem('idd')){
            
              this.matSnackBar.open("LOGGINED SUCCESSFULLY ...!✔👍", "Okay!", {
                duration: 1500,
                horizontalPosition: "center",
                verticalPosition: "top",
                // direction: "rtl"
              })
            
           
           this.router.navigateByUrl('/employee/'+result.body.id);  
           console.log(result.body.id);
           this.schedule==true;
          //  }
          }
          else if(result.statusCodeValue==200 && result.body=="Password Mismatch"){
            this.passwrong=true;
            this.matSnackBar.open("PASSWORD MISMATCH ...!✔👍", "Okay!", {
              duration: 1500,
              horizontalPosition: "center",
              verticalPosition: "top",
              // direction: "rtl"
            })
          

            }
            else if(result.statusCodeValue==404){
            this.detailswrong=true;
            this.matSnackBar.open("INVALID CREDENTIALS ...!✔👍", "Okay!", {
              duration: 1500,
              horizontalPosition: "center",
              verticalPosition: "top",
              // direction: "rtl"
            })
          
            }
        
          })
        }
    }
    getEmployeeList(){
    
      this.serviceData.getEmployeeList().subscribe((result: any)=>{
        this.employeeList= result;
        
      })
  }  
  //   show = false;
  //   password() {
  //     this.show = !this.show;
  // }
  }
