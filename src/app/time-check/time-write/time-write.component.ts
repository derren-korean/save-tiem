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
  showLoations:string[] = [];
  constructor() { }

  ngOnInit() {
  }

  toggle(event: any, location:string) {
    if(event.detail.checked) {
      this.showLoations.push(location)
    } else {
      this.showLoations = this.showLoations.filter(_lo => _lo != location);
    }    
  }

  show(location: string) {
    return !!this.showLoations.find(lo => lo == location);
  }
  
  reverseOrder(location: string) {
    this.filteredGroups.forEach(group => {
      if(group.location == location) {
        group.recoders = group.recoders.reverse();
      }
    })
  }

  onSave(event: any, groupIdx: number, recoderIdx: number, prop:string) {
    if (!event.keyCode) return;
    const time = event.target.value
    this.save.emit({groupIdx, recoderIdx, prop, time});
  }

}