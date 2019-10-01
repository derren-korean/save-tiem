import { Component, OnInit } from '@angular/core';
import { RecoderGroup } from './recoder-group.model';
import { TimeCheckService } from './time-check.service';

@Component({
  selector: 'app-time-check',
  templateUrl: './time-check.page.html',
  styleUrls: ['./time-check.page.scss'],
})
export class TimeCheckPage implements OnInit {

  recoderGroups:RecoderGroup[];
  private _TIME_TYPE:string[] = ['check', 'save']
  constructor(private tcService: TimeCheckService) {}

  ngOnInit() {
    this.tcService.fetchRecoders().subscribe(recoders => {
      this.recoderGroups = recoders;
    });
  }

}
