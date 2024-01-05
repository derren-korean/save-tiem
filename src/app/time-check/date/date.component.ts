import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateFormatterSingleton } from 'src/app/model/date-formatter';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Output() changeDate = new EventEmitter<{date: string}>();
  datePicker: string = new Date().toISOString();
  date: string= DateFormatterSingleton.toYYYYmmDD(this.datePicker);

  constructor() { }

  ngOnInit() {
    this._emitDateChaged();
  }

  _emitDateChaged() {
    this.changeDate.emit({
      date: this.datePicker
    });
  }

  onChangeDate() {
    this._emitDateChaged();
    this.date = DateFormatterSingleton.toYYYYmmDD(this.datePicker);
  }
}
