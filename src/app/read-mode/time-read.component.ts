import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DateFormatterSingleton } from '../model/date-formatter';
import { RecoderGroup } from '../time-check/model/recoder-group.model';
import { Recoder } from '../time-check/model/recoder.model';
import { TimeCheckService } from '../time-check/time-check.service';


@Component({
  selector: 'app-time-read',
  templateUrl: './time-read.component.html',
  styleUrls: ['./time-read.component.scss'],
})
export class TimeReadComponent {
  recoderGroups: RecoderGroup[];
  datePicker: string;
  savedDates: string[];
  private _someListener: Subscription = new Subscription();
  constructor(private tcService: TimeCheckService, public events: Events) {}

  ionViewDidEnter() {
    this._initSavedDates();
    this.datePicker = this.tcService.fetchDate();
    if (!this.datePicker) {
      this.onChangeDate();
    }
    this._initRecordGroup();
  }

  ionViewWillLeave() {
    this._someListener.unsubscribe();
  }

  onChangeDate() {
    if (this.savedDates.length > -1) {
      this.datePicker = DateFormatterSingleton.toYYYYmmDD(this.datePicker);
      if (!this.savedDates.find(date => date == this.datePicker)) {
        this.datePicker = this.savedDates[0]
      }
    }
    this._initRecordGroup();
  }

  _initSavedDates() {
    this.savedDates = [];
    for(var i =0; i < localStorage.length; i++) {
      this.savedDates.push(localStorage.key(i))
    }
    this.savedDates.sort().reverse();
  }

  _initRecordGroup() {
    let _temp: RecoderGroup[] = this.tcService.fatchDates(this.datePicker);
      let __has = (a: string): boolean => !!a
      let _has = (recoder: Recoder): boolean => __has(recoder.checkTime) || __has(recoder.savedTime);
      _temp = _temp.filter(group => {
        group.recoders = group.recoders.filter(recorder => _has(recorder));
        return group.recoders.length > 0;
      });
      this.recoderGroups = [..._temp];
  }
}
