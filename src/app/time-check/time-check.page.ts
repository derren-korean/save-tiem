import { Component } from '@angular/core';
import { IonButton } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { RecoderGroup } from './model/recoder-group.model';
import { Recoder } from './model/recoder.model';
import { TimeCheckService } from './time-check.service';

const filledRecord = (recoder:Recoder) => !!recoder.checkTime || !!recoder.savedTime;

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
  filteredGroups: RecoderGroup[];
  daytimeStatus: boolean = true;
  nightTimeStatus: boolean = true;
  private _someListener: Subscription = new Subscription();
  private emptyRecoderGroups: RecoderGroup[] = [];
  private recoderGroups: RecoderGroup[];
  constructor(private tcService: TimeCheckService) {}

  ionViewDidEnter() {
    const _temp: RecoderGroup[] = this._fetch(this.date);
    this._someListener.add(
      this.tcService.fetchRecoders().subscribe(recoderGroups => {
        this.emptyRecoderGroups = [...recoderGroups];
        recoderGroups = _temp ? _temp : recoderGroups;
        this._setRecoders([...recoderGroups]);
      })
    );
  }

  ionViewWillLeave() {
    this._someListener.unsubscribe();
  }

  onDateChanged(event: {date: string}) {
    this.date = event.date;
    this.tcService.setDate(this.date);
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
    this.filteredGroups[data.groupIdx].hasFilledRecord = this.filteredGroups[data.groupIdx].recoders.some(filledRecord);
    this.tcService.save(this.date, this.recoderGroups);
  }

  _initRecordGroup() {
    let _temp: RecoderGroup[] = this._fetch(this.date);
    _temp = _temp ? _temp : this._emptyRecorders();
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
    } 
    let workTime = this.daytimeStatus || this.nightTimeStatus ? this.daytimeStatus : null
    this.filteredGroups = this.recoderGroups.filter(recoder => recoder.isDayTime == workTime);
  }

  _fetch(yyyyMMdd: string): RecoderGroup[] {
    return this.tcService.fatchDates(yyyyMMdd);
  }

  _setRecoders(recoders: RecoderGroup[]) {
    this.recoderGroups = recoders;
    this.filteredGroups = [...this.recoderGroups];
  }
}