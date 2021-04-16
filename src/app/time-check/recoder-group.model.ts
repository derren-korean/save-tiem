import { Recoder } from './recoder.model';
import { StationInfo } from './station-info';

export class RecoderGroup {
  location: string;
  isDayTime: boolean;
  recoders: Recoder[];
  private info: StationInfo;

  constructor(location: string, info: StationInfo) { 
    this.location = location;
    this.isDayTime = info.isDayTime;
    this.recoders = [];
    this._setRecoders(info);
  }

  _setRecoders(info: StationInfo) {
    for (let index = 0; index < info.station.length; index++) {
      this.recoders.push(
        new Recoder(this._getStation(info.station[index], info.postfix), null, null)
      );
    }
  }

  _getStation(station: string, postfix: string) {
    return station.concat(postfix?postfix:"")
  }
}