import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Output() changeDate = new EventEmitter<{date: string}>();
  @Output() changeDateType = new EventEmitter<{isReadMode: boolean}>();
  datePicker: string = this._nowYYYYmmDD(); // ion-datetime와 bind하기위한 format
  dateType: string = 'all'
  savedDates: string[];

  constructor(public events: Events) { }

  ngOnInit() {
    this._emitDateChaged();
    this._initSavedDates();
    this.events.subscribe('savedTime:updated', () => {
      this._initSavedDates();
      if (this.savedDates.length) {
        this.events.unsubscribe('savedTime:updated');
      }
    });
  }

  _emitDateChaged() {
    this.changeDate.emit({
      date: this._toYYYYmmDD(this.datePicker)
    });
  }

  onChangeDate() {
    this._emitDateChaged();
  }

  _isReadMode() {
    return this.dateType == 'readMode';
  }

  onChangeDateType() {
    if (this._isReadMode) {
      this._initSavedDates();
      if (this.savedDates.length > -1) {
        this.datePicker = this._toYYYYmmDD(this.datePicker);
        if (!this.savedDates.find(date => date == this.datePicker)) {
          this.datePicker = this.savedDates[0]
          this._emitDateChaged();
        }
      }
    }
    this.changeDateType.emit({isReadMode: this._isReadMode()})
  }

  _getBySavedDate(datePicker: string):string {
    this._initSavedDates();
    if (this.savedDates.length > -1) {
      if (!this.savedDates.find(date => date == datePicker)) {
        ;
      }
    }
    return this._toYYYYmmDD(datePicker);
  }

  _initSavedDates() {
    this.savedDates = [];
    for(var i =0; i < localStorage.length; i++) {
      this.savedDates.push(localStorage.key(i))
    }
    this.savedDates.sort().reverse();
  }

  _nowYYYYmmDD():string {
    let _temp = new Date();
    return this._yyyyMMdd(_temp);
  }

  _toYYYYmmDD(date: string):string {
    let _temp = new Date(date);
    return this._yyyyMMdd(_temp);
  }

  _yyyyMMdd(date: Date) {
    return date.getFullYear()+'-'
    +this._toTwoDigits((date.getMonth()+1).toString())+'-'
    +this._toTwoDigits(date.getDate().toString());
  }

  _toTwoDigits(numeric: string):string {
    return numeric.length == 1 ? "0"+numeric : numeric;
  }

}
