import { Component, Input } from '@angular/core';
import { ServicefilesService } from '../servicefiles/servicefiles.service';
import { HttpClient } from '@angular/common/http';
import { Router ,ActivatedRoute, defaultUrlMatcher} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ViewEncapsulation } from '@angular/core';
import { MbscModule } from 'ack-angular-mobiscroll';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Day } from "../models/model";
import { CalendarCreator } from "../servicefiles/calendarService";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detailemployee',
  templateUrl: './detailemployee.component.html',
  styleUrls: ['./detailemployee.component.scss']
})
export class DetailemployeeComponent {
  id: any;
  countt:number=0;
  employee:any;
  employee2:any;
  empId:any;
  admin:any;
  flag:any;
  nos:any;
  
  // //calendar:
  // public monthDays!: Day[];

  // public monthNumber!: number;
  // public year!: number;

  // public weekDaysName : string[] = [];

  @Input()
  date:Date = new Date();
  monthDates = 0
  startingIndex = 0;
  startingValue=1;
  data :{[id:number]:any}={};
  Object=Object;
  
  constructor(private datePipe: DatePipe,private serviceData:ServicefilesService, private httpClient:HttpClient, private router: Router, private route: ActivatedRoute, public calendarCreator: CalendarCreator){
  }
  ngOnInit(): void{
    this.id=  this.route.snapshot.params['id'];
    this.setMonthDates();
    this.getEmployee();
    this.admin="admin";
  
     this.getDaysInMonth(this.month, this.year);
    //  this.matchingDatesForDisplay();
    // this.nos=this.countt;
    // this.setMonthDays(this.calendarCreator.getCurrentMonth());

    // this.weekDaysName.push("Mo");
    // this.weekDaysName.push("Tu");
    // this.weekDaysName.push("We");
    // this.weekDaysName.push("Th");
    // this.weekDaysName.push("Fr");
    // this.weekDaysName.push("Sa");
    // this.weekDaysName.push("Su");
  
 }
 
  flagCreator(){
    console.log("hello funct");
    console.log("count is:"+this.countt);
    this.nos=this.countt
    console.log(this.nos);
    switch(true){
    case this.countt>=14 :
        this.flag=0; //green flag
        console.log("Green flag")
        break;
    case this.countt>=9:
        this.flag=1;  //yellow flag
        console.log("yellow flag")
        break;
    case this.countt<5:
        this.flag=2;   //red flag
        console.log("red flag")
        break;
    }
}

setMonthDates(){
  this.startingValue=1;
  this.monthDates =  new Date(this.date.getFullYear(),this.date.getMonth()+1,0).getDate()
  // this.date.setDate(1)
  this.startingIndex =  new Date(this.date.getFullYear(),this.date.getMonth(),1).getDay();
  console.log(this.startingIndex);
  
  this.data={}
  for(let i =0;i<35;i++){
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

dateOfCurrentMonth: any;
daysOfMonth: any;
totalNames: any;

matchedDates:any;

month: number = new Date().getMonth();

year : number = new Date().getFullYear();

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

  // this.serviceData.matchingDates(this.daysOfMonth,this.tn).subscribe((result: any)=>{
  //   this.matchedDates = result;
  
  
// })



}

monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
d = new Date();
monthName = this.monthNames[this.d.getMonth()];

dummy1:any;
daysSelectedCount:any;
tn:any;
getEmployee(){
  this.serviceData.getEmployee(this.id).subscribe((result: any)=>{
    this.employee= result;
    this.empId=result.employeeId;
    this.tn=result.teamName;
    this.serviceData.getDates(this.empId).subscribe((result: any)=>{
    this.employee2=result;
    this.daysSelectedCount= result.length;

    console.log(this.empId)
     if(this.empId!=null){
      this.matchingDatesForDisplay();
    }

    })

  })

}

  // getDates(){
   
  //   console.log(this.dummy1);

   

  //   this.serviceData.getDates(this.dummy1).subscribe((result: any)=>{

  //     this.employee2=result;

     
  //     // this.countt=result.length;
  //     // console.log(result.length);
  //   })
  //   this.matchingDatesForDisplay();
  // }

  displayList:any;
  dummy:any;
  q:any;
  matchingDatesForDisplay(){
    this.displayList=[];
    
    this.dummy = this.employee2.map((element: any)=>{
      return  this.datePipe.transform (element.date,'yyyy-MM-dd');
    })
    console.log(this.dummy)

    for(this.q=0;this.q<=this.daysOfMonth.length;this.q++){
      if(this.dummy.includes(this.daysOfMonth[this.q])){
          this.displayList.push(1);
      }
      else{
        this.displayList.push(0);
      }

    }
    console.log("displaylist is igkufufkuf:"+ this.displayList)
  }
  // getDatesSelected(){
  //   this.serviceData.getDates(this.empId).subscribe((result: any)=>{
  //     console.log(this.empId);
  //     this.employee2=result;
  //     console.log(this.employee2)
  //     this.countt=result.length;
  //     console.log(result.length);
  //   })
  // }
  // back(){
  //   if(this.admin=  this.route.snapshot.params[this.admin]){
  //     this.router.navigateByUrl('/admin');
  //   }
  //   this.router.navigateByUrl('/employee/'+this.employee.id);
  // }

//   dateArr = [
//     {
//         date: "2023-02-12",
        
//     },
//     {
//         date: "2023-02-19",
       
//     }
// ]

// dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
//     const index = this.dateArr.findIndex(x => new Date(x.date).toLocaleDateString() === cellDate.toLocaleDateString());
//     if (index > -1) {
//         if (true) {
//             return "date-red";
//         } else if (true) {
//             return "date-green";
//         }
//     }

//     return '';
// };

// onNextMonth(): void {
//   this.monthNumber++;

//   if (this.monthNumber == 13) {
//     this.monthNumber = 1;
//     this.year++;
//   }

//   this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
// }

// onPreviousMonth() : void{
//   this.monthNumber--;

//   if (this.monthNumber < 1) {
//     this.monthNumber = 12;
//     this.year--;
//   }

//   this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
// }
// private setMonthDays(days: Day[]): void {
//   this.monthDays = days;
//   this.monthNumber = this.monthDays[0].monthIndex;
//   this.year = this.monthDays[0].year;
// }



}