import { Injectable} from '@angular/core';
import { StationInfo } from 'src/app/model/station-info';
import { RecoderGroup } from './model/recoder-group.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Events } from '@ionic/angular';

interface JsonData {
  data: InnerData[];
}

interface InnerData {
  location: string;
  info: StationInfo;
}

@Injectable({
  providedIn: 'root'
})
export class TimeCheckService {

  private date: string = '';
  private _dataURL = '../../assets/data.json';
  private recoders:RecoderGroup[] = [];
  private _firstTime = true;

  constructor(private http: HttpClient, public events: Events) {}

  fetchRecoders() {
    return this.http
    .get<JsonData>(this._dataURL)
    .pipe(
      map(res => {
        res.data.forEach((_data)=> {
          this._setGroupMap(_data.location, _data.info);
        });
        return [...this.recoders];
      })
    );
  }

  _setGroupMap(location: string, info: StationInfo) {
    if (!info.station.length) return
    this.recoders.push(new RecoderGroup(location, info));
  }

  save(yyyyMMdd: string, recoders: RecoderGroup[]) {
    window.localStorage.setItem(yyyyMMdd, JSON.stringify(recoders));
    if (this._firstTime) { //엄청 마음에 안드는 방법인데 ㅠㅠ 이것밖에 방법이 없댜;;;
      this._firstTime = false;
      this.events.publish('savedTime:updated');
    }
  }

  fatchDates(yyyyMMdd: string) :RecoderGroup[] {
    return JSON.parse(window.localStorage.getItem(yyyyMMdd));
  }

  fetchDate() {
    return this.date;
  }

  setDate(date: string) {
    this.date = date;
  }
}
