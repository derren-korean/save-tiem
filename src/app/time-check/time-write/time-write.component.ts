import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecoderGroup } from '../model/recoder-group.model';
import {SaveData} from '../time-check.page';

@Component({
  selector: 'app-time-write',
  templateUrl: './time-write.component.html',
  styleUrls: ['./time-write.component.scss'],
})
export class TimeWriteComponent implements OnInit {
  @Input() filteredGroups: RecoderGroup[];
  @Output() save = new EventEmitter<SaveData>();
  _TIME_TYPE:string[] = ['check', 'save'];
  constructor() { }

  ngOnInit() {}

  onSave(event: any, groupIdx: number, recoderIdx: number, prop:string) {
    if (!event.keyCode) return;
    const time = event.target.value
    this.save.emit({groupIdx, recoderIdx, prop, time});
  }
}