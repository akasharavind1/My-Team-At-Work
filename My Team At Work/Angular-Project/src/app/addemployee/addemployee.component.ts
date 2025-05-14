import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ServicefilesService } from '../servicefiles/servicefiles.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent {
  passwrong=false;
  passwordNotMatch =false;
  show_button: Boolean = false;
  show_eye: Boolean = false;
 


  constructor (private matSnackBar: MatSnackBar,private form:FormBuilder, 
               private service:ServicefilesService, private router: Router){}
    addEmployeeForm= this.form.group({
      firstName:['',[Validators.required]],
      lastName:[''],
      mailID:['',[Validators.required,Validators.email]],
      employeeId:['',[Validators.required]],
      teamId:['',[Validators.required]],
      password:['', [Validators.required,Validators.minLength(3)]],
      confirmPassword:['',[Validators.required]],
      roles: ['user']
    })
    ngOnInit(): void{
       this.addEmployeeForm.statusChanges.subscribe(data=>{
        console.log(data);
       })
      // this.details();
    
    }
  

    // validatePassword(){
    //   // console.log(this.addEmployeeForm.get('password')?.value)
    //   // console.log(this.addEmployeeForm.get('confirmPassword')?.value)
    //   if(this.addEmployeeForm.get('password')?.value == this.addEmployeeForm.get('confirmPassword')?.value){
    //     this.addEmployeeForm.get('confirmPassword')?.setValidators([Validators.requiredTrue])
    //   }
    // }

   
    
    onSubmit(){
      this.addEmployeeForm.markAllAsTouched();
      console.log(this.addEmployeeForm)
      if(true){
          let requestBody={
            firstName: this.addEmployeeForm.get('firstName')?.value,
            lastName: this.addEmployeeForm.get('lastName')?.value,
            mailID: this.addEmployeeForm.get('mailID')?.value,
            employeeId: this.addEmployeeForm.get('employeeId')?.value,
            teamId: this.addEmployeeForm.get('teamId')?.value,
            password: this.addEmployeeForm.get('password')?.value,
            confirmpassword: this.addEmployeeForm.get('confirmpassword')?.value,
            roles:this.addEmployeeForm.get('roles')?.value
         
          }
        
            // if(this.passwordNotMatch ==true){
              
              console.log("if cond")
              this.service.postEmployee(requestBody).subscribe((result: any)=>{
                console.log(result);
                this.router.navigate(['/']);
                this.matSnackBar.open("USER ADDED SUCCESSFULLY ...!✔👍", "Okay!", {
                  duration: 2500,
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  // direction: "rtl"
                })
              
              })
            // }
        // }
    }
  }

    // password(formGroup: FormGroup) {
    //   console.log("hii from if cond");
    //   const password = this.addEmployeeForm.get('password')?.value;
    //   const confirmpsw = this.addEmployeeForm.get('confirmpassword')?.value;
    //   if( password === confirmpsw ){
    //     this.passwordNotMatch =true;
    //   }
    // }
    showPassword() {
      this.show_button = !this.show_button;
      this.show_eye = !this.show_eye;
    }



}
