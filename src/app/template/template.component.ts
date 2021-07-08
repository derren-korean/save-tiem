import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecoderTemplate } from '../model/recoder-template.model';
import { StationInfo } from '../model/station-info';
import { EditInfoPage } from './edit-info/edit-info.page';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {

  location: string = "";
  locationArray: RecoderTemplate[] = [];
  constructor(public modalController: ModalController) { 
  }

  ngOnInit() {}

  addLocation(location: string) {
    if(!location || this._has(location)) {
      this.location = "";
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

    modal.onDidDismiss().then((res:any) => {
      if (res !== null) {
        console.log('Modal Sent Data : '+ res.data);
      }
    });

    return await modal.present();
  }

}