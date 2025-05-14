import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { ServicefilesService } from '../servicefiles/servicefiles.service';
import { HttpClient } from '@angular/common/http';
import { Router ,ActivatedRoute} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { trigger, state, style, transition, animate } from '@angular/animations'; 
import { ViewEncapsulation } from '@angular/core';
// import { MatDatepicker } from '@angular/material/datepicker';
import { MbscModule } from 'ack-angular-mobiscroll';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class EmployeeComponent {
[x: string]: any;
 id: any;
 employee:any;
 employeeList:any;
 employeedates:any;
 empId:any;
 temp:any;
 fn: any;
 successmsg:any;
  spinnerType:string;
 spinnerName:string;
  datesarr=[];
  flag:any;
  nos:any;
  countt: any;
  fromDialog!:string;
  selectedDates:any;
  ifValid =false;
  indexForCalendar=0;

  monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  d = new Date();
  monthName = this.monthNames[this.d.getMonth()];

  firstDate: any;
  lastDate: any;

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  
  @Input()
  date:Date = new Date();
  monthDates = 0
  startingIndex = 0;
  startingValue=1;
  data :{[id:number]:any}={};
  Object=Object;
 
 @ViewChild('dialogRef1')
  dialogRef1!: TemplateRef<any>;


  // employeeList:any;
  constructor(private datePipe: DatePipe,private matSnackBar: MatSnackBar,private spinner: NgxSpinnerService,private mbsc: MbscModule, private form:FormBuilder,private serviceData:ServicefilesService, private httpClient:HttpClient, private router: Router, private route: ActivatedRoute, public dialog: MatDialog){
    this.employeeList=[];
    this.employeedates=[];
    this.spinnerName="sp1";
    this.spinnerType="timer";
    this.spinner.show(this.spinnerName);
    setTimeout(() => {
      this.spinner.hide(this.spinnerName);
    }, 100);
  }
  
  ngOnInit(): void{
    
   this.id=  this.route.snapshot.params['id'];
   this.employeeList=[];
   this.employeedates=[];
   this.getEmployeeList();
   this.getEmployee();
   this.setMonthDates();
   this.sendDates();
   this.getDaysInMonth(this.month, this.year);``
  //  this.demo2();
  
  }


  postemployee = this.form.group({
    dates:[''],
  })
  daysSelected: any[] = [];
  daysToBeRemoved:any[]=[];
any: any;
days: any;
calendar:any;

isSelected:any = (event: any) => {
  const date =
    event.getFullYear() +
    "-" +
    ("00" + (event.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + event.getDate()).slice(-2)
  return this.daysSelected.find(x => x == date) ? "selected" : null;
};

flagForDatesTable=false;
select(event: any, calendar: any) {
  const date = 
    event.getFullYear() +
    "-" +
    ("00" + (event.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + event.getDate()).slice(-2);
  const index = this.daysSelected.findIndex(x => x == date);
  if (index < 0) this.daysSelected.push(date);
  else this.daysSelected.splice(index, 1);
  calendar.updateTodaysDate();
  console.log(this.daysSelected)
  console.log(this.alreadySelected);
  this.flagForDatesTable=true;
}
passTheDates(){
  console.log(this.daysToBeRemoved);
  console.log(this.daysSelected);
  console.log(this.alreadySelected); 

 this.alreadySelected.filter((result:any)=>{if(!this.daysSelected.includes(result)){
  this.daysToBeRemoved.push(result)
 }})
 console.log(this.daysToBeRemoved)
     this.serviceData.postDates(this.daysSelected,this.empId).subscribe((result: any)=>{
        console.log(result);
        console.log(this.fn);
        window.location.reload();
      
      })
      this.matSnackBar.open("DATES ADDED SUCCESSFULLY ...!✔👍", "Okay", {
        duration: 2500,
        horizontalPosition: "center",
        verticalPosition: "top",
        // direction: "rtl"
      })

      const dialogue= this.dialog.closeAll();
      // window.location.reload();

      
}
checkByEmployee:any;
employeeFirstName: any;

  getEmployeeList(){
    this.employeeList=this.route.snapshot.data['data'];
    this.serviceData.getEmployeeList().subscribe((result: any)=>{
      this.employeeList= result;
      this.employeeFirstName = result.map((element: any)=>{
        return  new element.firstName;
      })
      console.log("fn is "+ this.employeeFirstName);
    })}
employee2:any;
daysSelectedCount:any;
empdate:any;
alreadySelected:any;
tn:any;
  getEmployee(){
    this.serviceData.getEmployee(this.id).subscribe((resp: any)=>{
      this.employee= resp; 
      this.fn=resp.firstName;
      this.empId=resp.employeeId;
      this.tn= resp.teamName;
        this.serviceData.checkSpecificEmp(this.id,this.tn).subscribe((result: any)=>{
            this.checkByEmployee = result;
            console.log(this.checkByEmployee);
        })
      this.serviceData.getDates(this.empId).subscribe((result: any)=>{
        
        this.employee2=result;
        this.empdate=result;
        this.alreadySelected = this.empdate.map((element: any)=>{
      // return (element.date);
      return (this.datePipe.transform (new Date(element.date),'yyyy-MM-dd'));
    })
    console.log(this.alreadySelected);
    console.log(this.daysSelected);
    this.daysSelected=this.alreadySelected;
    console.log(this.daysSelected);
      })
      }
    )}



  getDates(){  
    this.serviceData.getDates(this.empId).subscribe((result: any)=>{
      console.log(this.empId);
      this.employeedates=result; 
      console.log(this.employeedates);
      
      this.selectedDates = result.map((element: any)=>{
        return  new Date(element.date);
      })
      // this.selectedDates=this.result.date;
      // console.log(this.selectedDates);
      // this.matSnackBar.open("RETRIEVED SUCCESSFULLY ...!✔👍", "Okay!", {
      //   duration: 3500,
      //   horizontalPosition: "center",
      //   verticalPosition: "top",
      //   // direction: "rtl"
        
      // })
      console.log(this.selectedDates)
      
      // console.log(this.dateref)
      
     
      // this.daysSelected=this.employee2;
      // this.daysSelected=(d: Date): boolean=> {
      //   const time=d.getTime();
      //   return !this.daysSelected.find(x=> x.getTime()==time);
      // }
    })
  }


  flag1(){
    this.ifValid = true;
  }

//   flagCreator(){
//     console.log("hello funct");
//     console.log("count is:"+this.countt);
//     this.nos=this.countt
//     console.log(this.nos);

//     switch(true){

//     case this.countt>=18 :
//         this.flag=0; //green flag
//         console.log("Green flag")
//         break;
//     case this.countt>=16:
//         this.flag=1;  //yellow flag
//         console.log("yellow flag")
//         break;
//     case this.countt<12:
//         this.flag=2;   //red flag
//         console.log("red flag")
//         break;
//     }
// }

 

  logout(){ 
    localStorage.removeItem('tokenuser');
    localStorage.removeItem('idd');
        this.router.navigate(['/']);
        this.matSnackBar.open("LOGGED OUT SUCCESSFULLY ...!✔👍", "Okay!", {
          duration: 2500,
          horizontalPosition: "center",
          verticalPosition: "top",
          // direction: "rtl"
        })
        const dialogue= this.dialog.closeAll();
   };

   openDialog1(){

  const dialogue= this.dialog.open(this.dialogRef1);
 
    
  }
  cancelDialog(){
  
    const dialogue= this.dialog.closeAll();
  }

  // iterateDatesOutOf(){

  //   let res = this.employeedates.map((element: any)=>{
  //     return new Date(element.date);
  //   })
  //   console.log(res)

  // }
  setMonthDates(){
    this.startingValue=1;
    this.monthDates =  new Date(this.date.getFullYear(),this.date.getMonth()+1,0).getDate()
    // this.date.setDate(1)
    this.startingIndex =  new Date(this.date.getFullYear(),this.date.getMonth(),1).getDay();
    console.log(this.startingIndex);
    
    this.data={}
    for(let i =0;i<42;i++){
      if(i<this.startingIndex || this.startingValue>this.monthDates){
        this.data[i] = null
      }else{
        this.data[i]={
          date:this.startingValue,
     
        }
        this.startingValue++;
      }
    }
    console.log(this.data);
    
  }
  bruh:any;

 
  
   openDialog2(){
  
    const dialogue= this.dialog.open(this.dialogRef);
   
      
    }

  sendDates(){


this.firstDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
this.lastDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);


//     for(let i=this.firstDate;i> this.monthDates;i++){

//       var dates= this.id;

//     }
this.bruh= [this.firstDate];

}

month: number = new Date().getMonth();

year : number = new Date().getFullYear();


matchedDates: any;
democount:any;
demo:any=["2023-03-01","2023-03-02"]
employeeCount: any;
employeeName: any;
wholeList: any;

//  demo2(){
// this.serviceData.matchingDates(this.demo).subscribe((result: any)=>{

//   // this.wholeList= result;
//    this.employeeName = result.map((element: any)=>{
//      return element.employeeName;})

//      console.log( "name is"+ this.employeeName)


//       this.employeeCount = result.map((element: any)=>{
//         return element.count;
//       })
//       console.log( "countis"+ this.employeeCount )
//     })
    
// }
   
dateOfCurrentMonth: any;
daysOfMonth: any;
totalNames: any;
getDaysInMonth(month: number, year: number) {
  this.dateOfCurrentMonth = new Date(year, month,1);
  console.log(this.dateOfCurrentMonth);
  this.daysOfMonth = [];
  console.log("this is "+this.dateOfCurrentMonth.getMonth() )
  while (this.dateOfCurrentMonth.getMonth() === month) {
    // this.daysOfMonth.push(new Date(this.dateOfCurrentMonth).toISOString().substring(0, 10));
    // this.dateOfCurrentMonth=this.datePipe.transform(this.dateOfCurrentMonth, 'yyyy-MM-dd');
    this.daysOfMonth.push(this.datePipe.transform (new Date(this.dateOfCurrentMonth),'yyyy-MM-dd'));
    this.dateOfCurrentMonth.setDate(this.dateOfCurrentMonth.getDate() +1);
  }
  console.log("The dates of current month are:" +this.daysOfMonth);
  this.serviceData.getEmployee(this.id).subscribe((resp: any)=>{
    this.employee= resp; 
    this.fn=resp.firstName;
    this.empId=resp.employeeId;
    this.tn= resp.teamName;
    console.log(this.tn);
  this.serviceData.matchingDates(this.daysOfMonth,this.tn).subscribe((result: any)=>{
    this.matchedDates = result;
    console.log("Heyyyyy"+ this.matchedDates)
    console.log(this.month)
   this.employeeName =result.map((element: any)=>{
    return element.employeeName;
   })
   console.log( "name is"+ this.employeeName)
     this.employeeCount =result.map((element: any)=>{
    return [element.count];
   })
   console.log( "countis"+ this.employeeCount )
  
}
  )
})
  console.log( "iahsicwsivg"+ this.employeeName)

}


}

