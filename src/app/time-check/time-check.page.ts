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

export class TimeCheckPage implements OnInit {

  filteredGroups: RecoderGroup[];
  dateType: string = 'all'
  datePicker: string; //format: yyyy-mm-dd
  savedDates: string[];
  private clearRecoderGroups: RecoderGroup[];
  private recoderGroups: RecoderGroup[];
  constructor(private tcService: TimeCheckService) {}

  ngOnInit() {
    this._initSavedDates();
    this.datePicker = this._nowYYYYmmDD();
    const _temp: RecoderGroup[] = this._fetch(this.datePicker);
    this.tcService.fetchRecoders().subscribe(recoders => {
      this.clearRecoderGroups = [...recoders];
      recoders = _temp ? _temp : recoders;
      this._setRecoders(recoders);
    });
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
    this.tcService.save(this.datePicker, this.recoderGroups);
    if (!this.savedDates.length) {
      this._initSavedDates();
    }
  }

  onChangeDateType(datePicker: string, dateType: string) {
    if (dateType == 'savedOnly') {
      this.datePicker = this._getBySavedDate(datePicker);
    }
    this._initRecordGroup(this.datePicker, dateType == 'savedOnly');
  }

  _getBySavedDate(datePicker: string):string {
    this._initSavedDates();
    if (this.savedDates.length > -1) {
      if (!this.savedDates.find(date => date == datePicker)) {
        datePicker = this._maxDateOf([...this.savedDates]);
      }
    }
    return datePicker;
  }

  _maxDateOf(dates: string[]):string {
    return dates.sort().reverse()[0];
  }

  _initRecordGroup(date: string, savedOnly: boolean) {
    if(!date) {
      date = this._nowYYYYmmDD();
    }
    let _temp: RecoderGroup[] = this._fetch(date);
    if (!_temp) {
      _temp = [...this.clearRecoderGroups];
    }
    if (savedOnly) {
      _temp = _temp.filter(group => {
        group.recoders = group.recoders.filter(record => {
          return record.checkTime != null || record.savedTime != null
        });
        return group.recoders.length > 0
      });
    }
    this._setRecoders(_temp);
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

  _nowYYYYmmDD():string {
    let _temp = new Date();
    return _temp.getFullYear()+'-'
      +this._toTwoDigits((_temp.getMonth()+1).toString())+'-'
      +this._toTwoDigits(_temp.getDate().toString());
  }

  _toTwoDigits(numeric: string):string {
    return numeric.length == 1 ? "0"+numeric : numeric;
  }

  _initSavedDates() {
    this.savedDates = [];
    for(var i =0; i < localStorage.length; i++) {
      this.savedDates.push(localStorage.key(i))
    }
  }

  _setRecoders(recoders: RecoderGroup[]) {
    this.recoderGroups = recoders;
    this.filteredGroups = [...this.recoderGroups];
  }
}