import { Injectable} from '@angular/core';
import { StationInfo } from 'src/app/model/station-info';
import { RecoderGroup } from './model/recoder-group.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RecoderTemplate } from '../model/recoder-template.model';
import { DateFormatterSingleton } from 'src/app/model/date-formatter';

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

  fetchRecoders(): Observable<RecoderGroup[]> {
    return this.http
    .get<JsonData>(this._dataURL)
    .pipe(
      map(res => {
        if(!res.data.length) return [];
        res.data.forEach((_data)=> this._setGroupMap(_data.location, _data.info));
        return [...this.recoderGroups];
      }),
      catchError(this.handleError<RecoderGroup[]>('fetch Recoders', []))
    );
  }

  toRecoders(templates: RecoderTemplate[]) {
    this.recoderGroups = [];
    templates.forEach(template => this._setGroupMap(template.location, template.info));
    return this.recoderGroups;
  }

  _setGroupMap(location: string, info: StationInfo) {
    if (info&&!info.station.length) return
    this.recoderGroups.push(new RecoderGroup(location, info));
  }

  save(date: string, recoders: RecoderGroup[]) {
    window.localStorage.setItem(DateFormatterSingleton.toYYYYmmDD(date), JSON.stringify(recoders));
  }

  saveTemplate(recoders: RecoderTemplate[]) {
    window.localStorage.setItem(
      'save-time-template', 
      JSON.stringify(recoders)
    );
  }

  fatchTemplate(): RecoderTemplate[] {
    let _temp: RecoderTemplate[];
    _temp = JSON.parse(window.localStorage.getItem('save-time-template') ?? '{}');
    return _temp ? _temp : [];
  }

  fatchDates(date: string) :RecoderGroup[] {
    return JSON.parse(window.localStorage.getItem(DateFormatterSingleton.toYYYYmmDD(date))??'[]');
  }

  fetchDate() {
    return DateFormatterSingleton.toYYYYmmDD(this.date);
  }

  setDate(date: string) {
    this.date = date;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
