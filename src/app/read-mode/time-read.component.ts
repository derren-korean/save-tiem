import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DateFormatterSingleton } from '../model/date-formatter';
import { RecoderGroup } from '../time-check/model/recoder-group.model';
import { Recoder } from '../time-check/model/recoder.model';
import { TimeCheckService } from '../time-check/time-check.service';

const filledRecord = (recoder:Recoder) => !!recoder.checkTime || !!recoder.savedTime;

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
    } else {
      this._initRecordGroup();
    }
  }

  ionViewWillLeave() {
    this._someListener.unsubscribe();
  }

  onChangeDate() {
    if (this.savedDates.length) {
      this.datePicker = DateFormatterSingleton.toYYYYmmDD(this.datePicker);
      if (!this.savedDates.find(date => date == this.datePicker)) {
        this.datePicker = this.savedDates[0]
      }
      this._initRecordGroup();
    }
  }

  _initSavedDates() {
    this.savedDates = [];
    for(var i =0; i < localStorage.length; i++) {
      if (localStorage.key(i).charAt(0) == 's') {
        continue;
      }
      this.savedDates.push(localStorage.key(i))
    }
    this.savedDates.sort().reverse();
  }

  _initRecordGroup() {
    let _temp: RecoderGroup[] = this.tcService.fatchDates(this.datePicker);
    if (_temp instanceof Array) {
      _temp = _temp.filter(group => group.hasFilledRecord)
      .filter(group => group.recoders = group.recoders.filter(filledRecord));
    } else {
      _temp = [];
    }
    this.recoderGroups = [..._temp];
  }

}
