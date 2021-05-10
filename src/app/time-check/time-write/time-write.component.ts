import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecoderGroup } from '../model/recoder-group.model';

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

  onSave() {
    this.save.emit();
  }
}
