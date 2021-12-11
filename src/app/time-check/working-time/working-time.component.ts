import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WorkingTime } from '../time-check.page';

@Component({
  selector: 'app-working-time',
  templateUrl: './working-time.component.html',
  styleUrls: ['./working-time.component.scss'],
})

export class WorkingTimeComponent implements OnInit {
  @Output() workingTime = new EventEmitter<{workingTime: WorkingTime}>();
  result: WorkingTime

  dayTime: boolean = true;
  nightTime: boolean = true;
  constructor() { }

  // 9-18시면 야간이 off 그 외는 주간이 off.
  ngOnInit() {
    let now = new Date().getHours();
    this.changeWorkingTime(8<now && now<19 ? false : true);
  }

  changeWorkingTime(isDayTime: boolean) {
    this._setDayTime(isDayTime);
    this._setResult();
    this.workingTime.emit({
      workingTime: this.result
    });
  }

  _setDayTime(isDayTime: boolean): void {
    if(isDayTime) {
      this.dayTime = !this.dayTime;
    } else {
      this.nightTime = !this.nightTime;
    }
  }

  // result == null 이라면, 필터할 필요없이 전부 표시하는 상태
  // WorkingTime.isDaytime == null 이라면, 주/야 아무것도 선택하지 않은 상태.
  _setResult(): void {
    if (this.dayTime && this.nightTime) {
      this.result = null;
    } else if (this.dayTime || this.nightTime) {
      this.result = {isDayTime: this.dayTime}
    } else {
      this.result = {isDayTime: null}
    }
  }

}
