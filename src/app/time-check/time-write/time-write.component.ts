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
  @Output() save = new EventEmitter<void>();
  _TIME_TYPE:string[] = ['check', 'save'];
  constructor() { }

  ngOnInit() {}

  onSave(event: any, recoder:Recoder, prop:string) {
    if (!event.keyCode) return;
    if (event.target.value != recoder[prop]) {
      recoder[prop] = event.target.value;
      return;
    }
    this.save.emit();
  }
}