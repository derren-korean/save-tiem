import { Component } from '@angular/core';
import { RecoderTemplate } from '../model/recoder-template.model';
import { RecoderGroup } from './model/recoder-group.model';
import { Recoder } from './model/recoder.model';
import { TimeCheckService } from './time-check.service';
import { DateFormatterSingleton } from '../model/date-formatter';

const filledRecord = (recoder:Recoder) => !!recoder.checkTime || !!recoder.savedTime;

export interface SaveData {
  groupIdx: number, 
  recoderIdx: number, 
  prop: string,  // checkTime, saveTime
  time: string
}

export interface WorkingTime {
  isDayTime: boolean | null;
}

@Component({
  selector: 'app-time-check',
  templateUrl: './time-check.page.html',
  styleUrls: ['./time-check.page.scss'],
})

export class TimeCheckPage {
  date: string;
  filteredGroups: RecoderGroup[];
  workingTime: WorkingTime;
  private emptyRecoderGroups: RecoderGroup[] = [];
  private recoderGroups: RecoderGroup[];
  constructor(private tcService: TimeCheckService) {}

  ionViewDidEnter() {
    let _temp: RecoderGroup[] = this._fetch(this.date);
    this.tcService.fetchRecoders().subscribe(httpRecoders => {
      if (!_temp || !_temp.length) {
        let templates: RecoderTemplate[] = this.tcService.fatchTemplate();
        _temp = this.tcService.toRecoders(templates);
        _temp = _temp ? _temp : httpRecoders;
      }
      this.emptyRecoderGroups = [..._temp];
      this._setRecoders([..._temp]);
      this.filterByWorkingTime();
    })
  }

  onWorkingTimeChanged(event:{workingTime: WorkingTime}) {
    this.workingTime = event.workingTime;
    this.filterByWorkingTime();
  }

  onDateChanged(event: {date: string}) {
    this.date = event.date;
    this.tcService.setDate(this.date);
    this._initRecordGroup();
    this.filterByWorkingTime();
  }

  filterByWorkingTime() {
    this.filteredGroups = [...this.recoderGroups];
    if (!this.workingTime) {
      return;
    } 
    this.filteredGroups = this.recoderGroups.filter(recoder => recoder.isDayTime == this.workingTime.isDayTime);
  }

  save(data: SaveData) {
    if (data.prop == 'savedTime') {
      this.filteredGroups[data.groupIdx].recoders[data.recoderIdx].savedTime = data.time;
    } else {
      this.filteredGroups[data.groupIdx].recoders[data.recoderIdx].checkTime = data.time;
    }
    this.filteredGroups[data.groupIdx].hasFilledRecord = this.filteredGroups[data.groupIdx].recoders.some(filledRecord);
    this.tcService.save(this.date, this.recoderGroups);
  }

  _initRecordGroup() {
    let _temp: RecoderGroup[] = this._fetch(this.date);
    if(!_temp || !_temp.length) {
      _temp = this.tcService.toRecoders(this.tcService.fatchTemplate());
      _temp ? _temp : [];
    } else {
      this._emptyRecorders();
    }
    this._setRecoders([..._temp]);
  }

  _setRecoders(recoders: RecoderGroup[]) {
    this.recoderGroups = recoders;
    this.filteredGroups = [...this.recoderGroups];
  }

  _emptyRecorders() {
    this.emptyRecoderGroups.forEach(group => {
      group.recoders.forEach(recoder => {
        recoder.checkTime = '';
        recoder.savedTime = '';
      })
    })
    return this.emptyRecoderGroups;
  }

  _fetch(yyyyMMdd: string): RecoderGroup[] {
    return this.tcService.fatchDates(DateFormatterSingleton.toYYYYmmDD(yyyyMMdd));
  }
}