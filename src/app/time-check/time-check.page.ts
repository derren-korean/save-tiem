import { Component, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular';

import { RecoderGroup } from './model/recoder-group.model';
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

  // todo: readMode일 경우, 저장되어있는 자료만 보여지도록 filteredGroups을 time-read로 옮긴다.
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
    // disable 유형 변경 로직 빠짐
  }

  _initRecordGroup() {
    let _temp: RecoderGroup[] = this._fetch(this.date);
    if (!_temp) {
      this._emptyRecorders(this.emptyRecoderGroups);
      _temp = this.emptyRecoderGroups;
    }
    if (this.isReadMode) {
      _temp = _temp.filter(group => {
        group.recoders = group.recoders.filter(record => {
          return record.checkTime != null || record.savedTime != null
        });
        return group.recoders.length > 0
      });
    }
    this._setRecoders([..._temp]);
  }

  _emptyRecorders(recoders: RecoderGroup[]) {
    this.recoderGroups.forEach(group => {
      group.recoders.forEach(recoder => {
        recoder.checkTime = null;
        recoder.savedTime = null;
      })
    })
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