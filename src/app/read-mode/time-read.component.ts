import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateFormatterSingleton } from '../model/date-formatter';
import { RecoderGroup } from '../time-check/model/recoder-group.model';
import { Recoder } from '../time-check/model/recoder.model';
import { TimeCheckService } from '../time-check/time-check.service';
import { Share } from './share-fab/share-fab.component';

const filledRecord = (recoder:Recoder) => !!recoder.checkTime || !!recoder.savedTime;

@Component({
  selector: 'app-time-read',
  templateUrl: './time-read.component.html',
  styleUrls: ['./time-read.component.scss'],
})
export class TimeReadComponent {
  recoderGroups: RecoderGroup[] = [];
  datePicker: string = ''
  savedDates: string[] = [];
  share: Share = {
    title: "date",
    text: "recoders",
    url:""
  }
  private _someListener: Subscription = new Subscription();  
  constructor(private tcService: TimeCheckService) {}

  ionViewDidEnter() {
    this._initSavedDates();
    this.datePicker = this.tcService.fetchDate();
    if (!this.datePicker) {
      this.onChangeDate();
    } else {
      this._initRecordGroup();
    }
    this._updateShareData();
  }

  ionViewWillLeave() {
    this._someListener.unsubscribe();
  }

  onChangeDate() {
    if (this.savedDates.length) {
      let formatedDate = DateFormatterSingleton.toYYYYmmDD(this.datePicker);
      if (!this.savedDates.find(date => date == formatedDate)) {
        this.datePicker = new Date(this.savedDates[0]).toISOString();
      }
      this._initRecordGroup();
    }
    this._updateShareData();
  }

  _initSavedDates() {
    this.savedDates = [];
    for(var i =0; i < localStorage.length; i++) {
      if (localStorage.key(i)!.charAt(0) == 's') {
        continue;
      }
      this.savedDates.push(localStorage.key(i)!)
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

  _updateShareData() {
    this.share.title = DateFormatterSingleton.toYYYYmmDD(this.datePicker);
    if(this.recoderGroups) {
      this.share.text = this._recoderToJson();
    }
  }

  _recoderToJson():string {
    let temp: string = ''
    for (const group of this.recoderGroups) {
      temp += group.location += '\n';
        for (const recoder of group.recoders) {
          let checkTime = recoder.checkTime ? recoder.checkTime : '점검시간';
          let savedTime = recoder.savedTime ? recoder.savedTime : '체크시간';
          temp += recoder.station + ': ' + checkTime + ' ' + savedTime + '\n';
      }
    }
    return temp;
  }
  
}
