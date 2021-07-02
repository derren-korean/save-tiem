import { Component, Input, OnInit } from '@angular/core';
import { StationInfo } from 'src/app/model/station-info';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.page.html',
  styleUrls: ['./edit-info.page.scss'],
})
export class EditInfoPage implements OnInit {
  // todo: input으로 변경
  // page(navigation)방식으로 할지, component로 펼치기 식으로 할지 정하기
  postfix: string = "";
  location: string = "foo";
  stationInfo: StationInfo = {station: [], isDayTime: true}
  constructor() { }

  ngOnInit() {
  }

  addStation() {
    let tempName:string = '';
    if (!!this.postfix) {
      tempName += this.stationInfo.station.length+1 + this.postfix;
    }
    this.stationInfo.station.push(tempName);
  }

  deleteStation(index: number) {
    this.stationInfo.station.splice(index, 1);
  }

}
