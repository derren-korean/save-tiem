import { Injectable} from '@angular/core';
import { StationInfo } from 'src/app/model/station-info';
import { RecoderGroup } from './model/recoder-group.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RecoderTemplate } from '../model/recoder-template.model';

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
  private recoderGroups:RecoderGroup[] = [];

  constructor(private http: HttpClient) {}

  fetchRecoders() {
    return this.http
    .get<JsonData>(this._dataURL)
    .pipe(
      map(res => {
        res.data.forEach((_data)=> this._setGroupMap(_data.location, _data.info));
        return [...this.recoderGroups];
      })
    );
  }

  toRecoders(templates: RecoderTemplate[]) {
    this.recoderGroups = [];
    templates.forEach(template => this._setGroupMap(template.location, template.info));
    return this.recoderGroups;
  }

  _setGroupMap(location: string, info: StationInfo) {
    if (!info.station.length) return
    this.recoderGroups.push(new RecoderGroup(location, info));
  }

  save(yyyyMMdd: string, recoders: RecoderGroup[]) {
    window.localStorage.setItem(yyyyMMdd, JSON.stringify(recoders));
  }

  saveTemplate(recoders: RecoderTemplate[]) {
    window.localStorage.setItem(
      'save-time-template', 
      JSON.stringify(recoders)
    );
  }

  fatchTemplate(): RecoderTemplate[] {
    let _temp: RecoderTemplate[];
    _temp = JSON.parse(window.localStorage.getItem('save-time-template'));
    return _temp ? _temp : [];
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
