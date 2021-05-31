import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecoderGroup } from '../model/recoder-group.model';
import { Recoder } from '../model/recoder.model';

@Component({
  selector: 'app-time-write',
  templateUrl: './time-write.component.html',
  styleUrls: ['./time-write.component.scss'],
})
export class TimeWriteComponent implements OnInit {
  @Input() filteredGroups: RecoderGroup[];
  @Input() readonly: boolean;
  @Output() save = new EventEmitter<void>();
  _TIME_TYPE:string[] = ['check', 'save'];
  constructor() { }

  ngOnInit() {}

  onSave(recoder:Recoder, prop:string) {
    if (this._hasMisType(recoder, prop)) {
      return;
    }
    this.save.emit();
  }

  // 만들고 싶지 않았지만 요청이 있었다ㅠㅠ
  // 오타 방지용 같은경우는 여러키가 동시에 눌리는 경우 버그가 날 수 밖에 없다.
  // 입력을 event preventdefault해야하는데 생각만큼 만만하지 않다.
  _hasMisType(recoder:Recoder, prop:string):boolean {
    if (!recoder[prop]) return true;
    const time = recoder[prop];
    if (time.length == 1 && Number(time) > 2) {
        recoder[prop] = null;
        return true;
    } else if (time.length == 2 && Number(time) > 23) {
        this._cancelTyped(recoder, prop, 1);
        return true;
    } else if (time.length == 3 && Number(time.substring(2,3) > 5)) {
        this._cancelTyped(recoder, prop, 2);
        return true;
    } else if (time.length == 4 && Number(time.substring(2)) > 59) {
        this._cancelTyped(recoder, prop, 3);
        return true;
    }
    return false;
  }

  _cancelTyped(recoder:Recoder, prop:string, index: number) {
    recoder[prop] = recoder[prop].substring(0, index);
  }
}
