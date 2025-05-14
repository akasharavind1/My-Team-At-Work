import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtersSample'
})
export class FiltersSamplePipe implements PipeTransform {

  transform(value: any, nameFilter: string ): any {
    if(nameFilter===""){
      return value;
    }
    const storeArray:any[]=[];
    // for(let i=0;i<=value.length;i++){
    //     let emp_Name:string=value[i].firstName;
    //     if(emp_Name.startsWith(nameFilter)){
    //        storeArray.push(value[i])
    //     }
    // }
    return storeArray;
  }

}
