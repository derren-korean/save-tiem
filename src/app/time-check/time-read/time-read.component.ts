import { Component, Input, OnInit } from '@angular/core';
import { RecoderGroup } from '../model/recoder-group.model';
import { Recoder } from '../model/recoder.model';

@Component({
  selector: 'app-time-read',
  templateUrl: './time-read.component.html',
  styleUrls: ['./time-read.component.scss'],
})
export class TimeReadComponent implements OnInit {
  @Input() filteredGroups: RecoderGroup[];
  @Input() _TIME_TYPE:string[];
  constructor() { }

  ngOnInit() {}
}
