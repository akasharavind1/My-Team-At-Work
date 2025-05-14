import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicefilesService } from '../servicefiles/servicefiles.service';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder,  Validators } from '@angular/forms';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})

export class EmployeeProfileComponent {

  @Input() editable: boolean = false;
  id:any;
  employee: any;
  fn: any;
  empId: any;
  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  constructor( private router: Router, private route: ActivatedRoute, private service: ServicefilesService, private matDialog: MatDialog, private form: FormBuilder , private matSnackBar: MatSnackBar){}
  
  updatePasswordForm= this.form.group({
    firstName:['',[Validators.required, Validators.minLength(2)]],
    lastName:[''],
    mailID:['',[Validators.required]],
    employeeId:['',[Validators.required]],
    roles:['',[Validators.required]]
    })

    passwordMatch=this.form.group({
      password:['',[Validators.required]],
    })

    passwordChange=this.form.group({
      password:['',[Validators.required]],
    })

  ngOnInit(): void{
    this.id=  this.route.snapshot.params['id'];
    this.getEmployee();
  }

  getEmployee(){
    this.service.getEmployee(this.id).subscribe((resp: any)=>{
      this.employee= resp; 
      this.fn=resp.firstName; 
      // console.log(this.temp);
      this.empId=resp.employeeId;

      this.updatePasswordForm.patchValue({
        firstName: resp.firstName,
        lastName: resp.lastName,
        employeeId: resp.employeeId,
        mailID: resp.mailID,
        roles: resp.roles,       
      })
      }
    )}

    validateSuccess=false;
    validateFail=false;
    validatePassword(){
      let requestBody={
        mailID: this.updatePasswordForm.get('mailID')?.value,
        password: this.passwordMatch.get('password')?.value,
      }
      this.service.postLogin(requestBody).subscribe((result:any)=>{
        if(result.statusCodeValue==200 && result.body.message=="User retrieved successfully"){
          this.validateSuccess=true;
        }
        else if(result.statusCodeValue==200 && result.body=="Password Mismatch"){
          this.validateFail=true;  
        }
      })
    }

    openDialog(){

      const dialogue= this.matDialog.open(this.dialogRef);
      
     
       }

    cancelDialog(){
  
        const dialogue= this.matDialog.closeAll();

      }

    updatePassword(){

      // this.passwordChange.patchValue({
      //   newPassword:this.passwordChange.get('newPassword')?.value,
      // })
      let requestBody={
        firstName: this.updatePasswordForm.get('firstName')?.value,
        lastName: this.updatePasswordForm.get('lastName')?.value,
        mailID: this.updatePasswordForm.get('mailID')?.value,
        employeeId: this.updatePasswordForm.get('employeeId')?.value,
        roles: this.updatePasswordForm.get('roles')?.value,
        password:this.passwordChange.get('password')?.value,
      }
      if(requestBody.password!=null){
        this.service.updatePassword(this.id,requestBody).subscribe((result:any)=>{
          this.matSnackBar.open("UPDATED SUCCESSFULLY ...!✔👍", "Okay!", {
            duration: 1500,
            horizontalPosition: "center",
            verticalPosition: "top",
            // direction: "rtl"
          })
          this.router.navigate(['/employeeprofile/{{employee.id}}']);
          })
          this.cancelDialog();
        }
        window.location.reload();
      }



}
