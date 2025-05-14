import { Component, Input } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ServicefilesService } from '../servicefiles/servicefiles.service';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';

interface Day {
  dayOfMonth: number;
}

interface Week {
  days: Day[];
}
@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.scss']
})
export class RescheduleComponent {
isSelected(_t37: any) {
throw new Error('Method not implemented.');
}
  employeeList=[];
  employeeFirstName: any;
  employee: any;
  id: any;
  fn: any;
  empId: any;

  public weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public weeks: Week[] = [];
  public monthName = '';
  public year = 0;
  constructor(private router: Router, private route: ActivatedRoute,private serviceData:ServicefilesService, private form:FormBuilder){

  }
  ngOnInit(): void{
  this.id=  this.route.snapshot.params['id'];
  this.getEmployeeList();
  this.getEmployee();
  this.setMonthDates();

 const currentDate = new Date();

  }
  rescheduleForm= this.form.group({
    dates:['',[Validators.required]],
  })
  getEmployeeList(){
    // this.serviceData.getEmployeeList().subscribe((result: any)=>{
    //   this.employeeList= result;
    //   console.log(this.employeeList);
    //   console.log(this.id);
    // })
    this.employeeList=this.route.snapshot.data['data'];
    this.serviceData.getEmployeeList().subscribe((result: any)=>{
      this.employeeList= result;
      this.employeeFirstName = result.map((element: any)=>{
        return  new element.firstName;
      })
      console.log("fn is "+ this.employeeFirstName);
    })}

    getEmployee(){
      this.serviceData.getEmployee(this.id).subscribe((resp: any)=>{
        this.employee= resp; 
        this.fn=resp.firstName; 
        // console.log(this.temp);
        this.empId=resp.employeeId;
         
    // this.serviceData.getDates(this.empId).subscribe((resp: any)=>{
    //         this.countt=resp.length;
    //         // this.flagCreator();
    //       })
        }
      )}

      @Input()
      date:Date = new Date();
      monthDates = 0
      startingIndex = 0;
      startingValue=1;
      data :{[id:number]:any}={};
      Object=Object;
      
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
        // console.log(this.input);
        
      }
     

      
}
