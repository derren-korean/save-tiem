import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecoderTemplate } from 'src/app/model/recoder-template.model';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.page.html',
  styleUrls: ['./edit-info.page.scss'],
})
export class EditInfoPage implements OnInit {
  
  @Input() recoderTemplate: RecoderTemplate;
  postfix: string = "";
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  addStation() {
    let tempName:string = '';
    if (!!this.postfix) {
      tempName += this.recoderTemplate.info.station.length+1 + this.postfix;
    }
    this.recoderTemplate.info.station.push(tempName);
  }

  deleteStation(index: number) {
    this.recoderTemplate.info.station.splice(index, 1);
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
