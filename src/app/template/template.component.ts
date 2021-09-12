import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecoderTemplate } from '../model/recoder-template.model';
import { StationInfo } from '../model/station-info';
import { RecoderGroup } from '../time-check/model/recoder-group.model';
import { Recoder } from '../time-check/model/recoder.model';
import { TimeCheckService } from '../time-check/time-check.service';
import { EditInfoPage } from './edit-info/edit-info.page';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {

  templateArray: RecoderTemplate[] = [];
  constructor(public modalController: ModalController, private dao: TimeCheckService) { }

  ngOnInit() {
    this.templateArray = this.dao.fatchTemplate();
    this.dao.fetchRecoders().subscribe(recoders => {
      if (!this.templateArray || !this.templateArray.length) {
        this.templateArray = this.toTemplate(recoders);
      }
    })
  }

  onAddLocation(event:{template: RecoderTemplate, index: number}) {
    this.templateArray.splice(event.index, 0, event.template);
  }

  deleteLocation(index: number) {
    this.templateArray.splice(index, 1);
  }

  saveTemplate() {
    this.dao.saveTemplate(this.templateArray);
  }

  toTemplate(recoders: RecoderGroup[]): RecoderTemplate[] {
    if (!recoders || !recoders.length) { 
      return [];
    }
    let temp = [];
    recoders.forEach(recoder => {
      let info: StationInfo = {isDayTime: recoder.isDayTime, station: this._toStationArray(recoder.recoders)};
      temp.push(new RecoderTemplate(recoder.location, info));
    })
    return temp;
  }

  _toStationArray(recoders: Recoder[]) {
    return recoders.map(recoder => recoder.station);
  }

  getLocations():string[] {
    return this.templateArray.map(template=>template.location);
  }
  
  async presentModal(location: string) {
    const modal = await this.modalController.create({
      component: EditInfoPage,
      componentProps: {
        'recoderTemplate': this.templateArray.find(template => template.location === location),
      }
    });
    return await modal.present();
  }

}