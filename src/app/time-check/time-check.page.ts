import { Component } from '@angular/core';
import { IonButton } from '@ionic/angular';

import { RecoderGroup } from './model/recoder-group.model';
import { Recoder } from './model/recoder.model';
import { TimeCheckService } from './time-check.service';

const FILTERED: string = "solid"

@Component({
  selector: 'app-time-check',
  templateUrl: './time-check.page.html',
  styleUrls: ['./time-check.page.scss'],
})

export class TimeCheckPage {
  date: string;
  isReadMode: boolean = false;
  filteredGroups: RecoderGroup[];
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
  }

  onDateTypeChanged(event: {isReadMode: boolean}) {
    this.isReadMode = event.isReadMode;
    this._initRecordGroup();
  }

  // 선택한 state만 보기!
  // default: a, b 둘다 보인다. (반대로 둘다 안보이는 상황은 없다)
  // a를 클릭하면, b를 hide.(반대도 동일하게 1개만 선택가능)
  // a를 다시 누르면 a,b 둘다 보인다.
  // b가 hide 상태에서 b을 누를 수 없도록 disabled한다. (반대도 동일함)
  // 클릭시 fill은 "solid" -> "outline"으로 변경 된다.
  filterGroups(sibling: IonButton, isDayTime: boolean) {
    this._changeButtonState(sibling)
    this._filterByDayTime(sibling.fill == FILTERED, isDayTime)
  }

  save() {
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
    button.disabled = !button.disabled;
    button.fill = button.fill == "outline" ? "solid" : "outline"; // 하.. enum 쓰고싶다 ㅠㅠ
  }

  _filterByDayTime(all: boolean, isDayTime: boolean) {
    this.filteredGroups = all ? 
      [...this.recoderGroups] : 
      this.recoderGroups.filter(recoder => recoder.isDayTime == isDayTime);
  }

  _fetch(yyyyMMdd: string): RecoderGroup[] {
    return this.tcService.fatchDates(yyyyMMdd);
  }

  _setRecoders(recoders: RecoderGroup[]) {
    this.recoderGroups = recoders;
    this.filteredGroups = [...this.recoderGroups];
  }
}