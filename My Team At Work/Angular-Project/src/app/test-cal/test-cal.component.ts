import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-cal',
  templateUrl: './test-cal.component.html',
  styleUrls: ['./test-cal.component.scss']
})
export class TestCalComponent implements OnInit {


  @Input()
  date:Date = new Date();
  monthDates = 0
  startingIndex = 0;
  startingValue=1;
  data :{[id:number]:any}={};
  Object=Object;
  ngOnInit(){
    this.setMonthDates();
  }
  setMonthDates(){
    this.startingValue=1;
    this.monthDates =  new Date(this.date.getFullYear(),this.date.getMonth()+1,0).getDate();
    console.log(this.monthDates);
    // this.date.setDate(1)
    this.startingIndex =  new Date(this.date.getFullYear(),this.date.getMonth(),1).getDay();
    console.log(this.startingIndex);
    
    this.data={}
    for(let i =0;i<35;i++){
      if(i<this.startingIndex || this.startingValue>this.monthDates){//0<1 || 1>
        this.data[i] = null
        console.log(this.data[i]);
      }else{
        this.data[i]={
          date:this.startingValue,
          employeeList:[
            'Gowtham',
            'Akash',
            
          ]
        }
        this.startingValue++;
      }
    }
    console.log(this.data);
    
  }
}
