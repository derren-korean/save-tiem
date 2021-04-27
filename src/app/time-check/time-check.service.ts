import { Injectable} from '@angular/core';
import { StationInfo } from './station-info';
import { RecoderGroup } from './recoder-group.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  private _dataURL = '../../assets/data.json';
  private recoders:RecoderGroup[] = [];

  constructor(private http: HttpClient) {}

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
  }

  fatchDates(yyyyMMdd: string) :RecoderGroup[] {
    return JSON.parse(window.localStorage.getItem(yyyyMMdd));
  }
}
