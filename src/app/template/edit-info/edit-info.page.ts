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
  private stationDummy: string[] = []; //버그가 있어서 close할때 recoderTemplate에 넣어야함
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.stationDummy = [...this.recoderTemplate.info.station];
  }

  addStation() {
    let tempName:string = '';
    if (!!this.recoderTemplate.info.postfix) {
      tempName += this.recoderTemplate.info.station.length+1 + this.recoderTemplate.info.postfix;
    }
    this.recoderTemplate.info.station.push(tempName);
    this.stationDummy.push(tempName);
  }

  deleteStation(index: number) {
    this.recoderTemplate.info.station.splice(index, 1);
    this.stationDummy.splice(index, 1);
  }

  updateStation(index: number, event:any) {
    this.stationDummy[index] = event.target.getElementsByTagName('input')[0].value;
  }

  closeModal() {
    this.recoderTemplate.info.station = [...this.stationDummy];
    if (this._isEmpty(this.recoderTemplate.info.station)) {
      return;
    }
    this.modalController.dismiss();
  }

  _isEmpty(station: string[]) {
    return !station.every(station=>!!station)
  }

}
