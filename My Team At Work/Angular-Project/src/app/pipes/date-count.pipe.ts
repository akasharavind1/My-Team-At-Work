import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCount'
})
export class DateCountPipe implements PipeTransform {
  tempValue: any;

  transform(value: unknown): unknown {
    this.tempValue=value;
console.log(this.tempValue.length);

    return value;
  }

}
