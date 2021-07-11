import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecoderTemplate } from '../model/recoder-template.model';
import { StationInfo } from '../model/station-info';
import { TimeCheckService } from '../time-check/time-check.service';
import { EditInfoPage } from './edit-info/edit-info.page';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {

  location: string = "";
  locationArray: RecoderTemplate[] = [];
  errOnLocationName: boolean = false;
  locationAlarm: string = "장소가 비어있습니다. 글자를 입력해주세요.";
  constructor(public modalController: ModalController, private saveService: TimeCheckService) { }

  ngOnInit() {}

  onLocationChanged(location: string) {
    if(!!location) {
      this.errOnLocationName = false;
    }
  }

  addLocation(location: string) {
    if(!location || this._has(location)) {
      this.locationAlarm = this._has(location) ? "동일한 장소가 존재합니다." : "장소가 비어있습니다. 글자를 입력해주세요.";
      this.location = "";
      this.errOnLocationName = true;
      return;
    }
    let info: StationInfo = {isDayTime: true, station: []};
    let temp: RecoderTemplate = new RecoderTemplate(location, info);
    this.locationArray.push(temp);
    this.location = "";
  }

  deleteLocation(index: number) {
    this.locationArray.splice(index, 1);
  }

  saveTemplate() {
    this.saveService.saveTemplate(this.locationArray);
  }

  _has(location: string):boolean {
    return !!this.locationArray.find(template => template.location === location);
  }
  
  async presentModal(location: string) {
    const modal = await this.modalController.create({
      component: EditInfoPage,
      componentProps: {
        'recoderTemplate': this.locationArray.find(template => template.location === location),
      }
    });
    return await modal.present();
  }

}