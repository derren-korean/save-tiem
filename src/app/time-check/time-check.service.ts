import { Injectable, OnInit } from '@angular/core';

import { Recoder } from './recoder.model';
import { RecoderGroup } from './recoder-group.model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from 'events';
import { map } from 'rxjs/operators';

interface JsonData {
  data: InnerData[];
}
interface InnerData {
  location: string;
  total: number;
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
          this._setGroupMap(_data.location, _data.total);
        });
        return [...this.recoders];
      })
    );
  }

  _setGroupMap(location: string, stationNumber: number) {
    this.recoders.push(
      new RecoderGroup(location, this._getOrderdRecoders(location, stationNumber))
    );
  }

  _getOrderdRecoders(location:string, number:number):Recoder[] {
    const _temp:Recoder[] = [];
    while(0 < number) {
      _temp.push(new Recoder(location, ""+number--, null, null));
    }
    return _temp.reverse();
  }
}
