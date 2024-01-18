import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecoderTemplate } from 'src/app/model/recoder-template.model';

const DEFAULT_ALARM_MSG: string = "장소가 비어있습니다. 글자를 입력해주세요."
@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss'],
})
export class AddTemplateComponent  {

  constructor() { }
  @Input() locations: string[];
  @Input() index: number;
  @Output() newLocation = new EventEmitter<{template: RecoderTemplate, index: number}>();

  location: string;
  locationAlarm: string = DEFAULT_ALARM_MSG;
  errOnLocationName: boolean = false;

  onLocationChanged(location: string) {
    if(!!location) {
      this.errOnLocationName = false;
    }
  }

  _has(location: string):boolean {
    return !!this.locations.find(_location => _location === location);
  }

  addLocation(location: string, index: number) {
    if(!location || this._has(location)) {
      this.locationAlarm = this._has(location) ? "동일한 장소가 존재합니다." : DEFAULT_ALARM_MSG;
      this.location = "";
      this.errOnLocationName = true;
      return;
    }
    this.newLocation.emit({
      template: new RecoderTemplate(location, {isDayTime: true, station: []}),
      index
    });
    this.location = "";
  }

}
