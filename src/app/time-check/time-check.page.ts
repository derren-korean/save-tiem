import { Component, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular';
import { RecoderGroup } from './recoder-group.model';
import { TimeCheckService } from './time-check.service';

const FILTERED: string = "solid"

@Component({
  selector: 'app-time-check',
  templateUrl: './time-check.page.html',
  styleUrls: ['./time-check.page.scss'],
})

export class TimeCheckPage implements OnInit {

  filteredGroups: RecoderGroup[];
  private recoderGroups: RecoderGroup[];
  private _TIME_TYPE:string[] = ['check', 'save']
  constructor(private tcService: TimeCheckService) {}

  ngOnInit() {
    this.tcService.fetchRecoders().subscribe(recoders => {
      this.recoderGroups = recoders;
      this.filteredGroups = [...this.recoderGroups];
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

  _changeButtonState(button: IonButton) {
    button.disabled = !button.disabled;
    button.fill = button.fill == "outline" ? "solid" : "outline"; // 하.. enum 쓰고싶다 ㅠㅠ
  }

  _filterByDayTime(reset: boolean, isDayTime: boolean) {
    if (reset) {
      this._reset();
    } else {
      this.filteredGroups = this.recoderGroups.filter(recoder => recoder.isDayTime == isDayTime);
    }
  }

  _reset() {
    this.filteredGroups = [...this.recoderGroups];
  }
}