import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayTime'
})
export class DayTimePipe implements PipeTransform {

  transform(value: boolean): string {
    return !!value ? '주간' : '야간';
  }

}
