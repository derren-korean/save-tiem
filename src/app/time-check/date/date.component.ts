import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateFormatterSingleton } from 'src/app/model/date-formatter';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Output() changeDate = new EventEmitter<{date: string}>();
  datePicker: string = DateFormatterSingleton.nowYYYYmmDD(); // ion-datetime와 bind하기위한 format

  constructor() { }

  ngOnInit() {
    this._emitDateChaged();
  }

  _emitDateChaged() {
    this.changeDate.emit({
      date: DateFormatterSingleton.toYYYYmmDD(this.datePicker)
    });
  }

  onChangeDate() {
    this._emitDateChaged();
  }
  
}
