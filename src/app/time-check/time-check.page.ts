import { Component } from '@angular/core';
import { IonButton } from '@ionic/angular';

import { RecoderGroup } from './model/recoder-group.model';
import { Recoder } from './model/recoder.model';
import { TimeCheckService } from './time-check.service';

export interface SaveData {
  groupIdx: number, 
  recoderIdx: number, 
  prop: string, 
  time: string
}
const ACTIVE: string = "solid"

@Component({
  selector: 'app-time-check',
  templateUrl: './time-check.page.html',
  styleUrls: ['./time-check.page.scss'],
})

export class TimeCheckPage {
  date: string;
  isReadMode: boolean = false;
  filteredGroups: RecoderGroup[];
  daytimeStatus: boolean = true;
  nightTimeStatus: boolean = true;
  private emptyRecoderGroups: RecoderGroup[] = [];
  private recoderGroups: RecoderGroup[];
  constructor(private tcService: TimeCheckService) {}

  ionViewDidEnter() {
    const _temp: RecoderGroup[] = this._fetch(this.date);
    this.tcService.fetchRecoders().subscribe(recoders => {
      this.emptyRecoderGroups = [...recoders];
      recoders = _temp ? _temp : recoders;
      this._setRecoders([...recoders]);
    });
  }

  onDateChanged(event: {date: string}) {
    this.date = event.date;
    this._initRecordGroup();
    this._filterByDayTime();
  }

  onDateTypeChanged(event: {isReadMode: boolean}) {
    this.isReadMode = event.isReadMode;
    this._initRecordGroup();
    this._filterByDayTime();
  }

  filterGroups(button: any, isDayTime: boolean) {
    this._changeButtonState(button);
    if (isDayTime) {
      this.daytimeStatus = button.fill == ACTIVE;
      this.nightTimeStatus = button.nextElementSibling.fill == ACTIVE
    } else {
      this.daytimeStatus = button.previousElementSibling.fill == ACTIVE;
      this.nightTimeStatus = button.fill == ACTIVE;
    }
    this._filterByDayTime();
  }

  save(data: SaveData) {
    this.filteredGroups[data.groupIdx].recoders[data.recoderIdx][data.prop] = data.time;
    this.tcService.save(this.date, this.recoderGroups);
  }

  _initRecordGroup() {
    let _temp: RecoderGroup[] = this._fetch(this.date);
    _temp = _temp ? _temp : this._emptyRecorders();
    if (this.isReadMode) { 
      let __has = (a: string): boolean => !!a
      let _has = (recoder: Recoder): boolean => __has(recoder.checkTime) || __has(recoder.savedTime);

      _temp = _temp.filter(group => {
        group.recoders = group.recoders.filter(recorder => _has(recorder));
        return group.recoders.length > 0;
      });
    }
    this._setRecoders([..._temp]);
  }

  _emptyRecorders() {
    this.emptyRecoderGroups.forEach(group => {
      group.recoders.forEach(recoder => {
        recoder.checkTime = null;
        recoder.savedTime = null;
      })
    })
    return this.emptyRecoderGroups;
  }

  _changeButtonState(button: IonButton) {
    button.fill = button.fill == "outline" ? "solid" : "outline"; // 하.. enum 쓰고싶다 ㅠㅠ
  }

  _filterByDayTime() {
    this.filteredGroups = [...this.recoderGroups];
    if (this.daytimeStatus && this.nightTimeStatus) {
      return;
    } else {
      let workTime = this.daytimeStatus || this.nightTimeStatus ? this.daytimeStatus : null
      this.filteredGroups = this.recoderGroups.filter(recoder => recoder.isDayTime == workTime);
    }
  }

  _fetch(yyyyMMdd: string): RecoderGroup[] {
    return this.tcService.fatchDates(yyyyMMdd);
  }

  _setRecoders(recoders: RecoderGroup[]) {
    this.recoderGroups = recoders;
    this.filteredGroups = [...this.recoderGroups];
  }
}