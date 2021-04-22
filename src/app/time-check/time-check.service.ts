import { Injectable} from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Recoder } from './recoder.model';
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

export interface SaveData {
  date: string;
  location: string;
  recoders: Recoder[];
}

@Injectable({
  providedIn: 'root'
})
export class TimeCheckService {

  private _dataURL = '../../assets/data.json';
  private recoders:RecoderGroup[] = [];

  constructor(private http: HttpClient, private nativeStorage: NativeStorage) {}

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

  // todo
  save(recoder: SaveData) {
    this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }

  // todo
  load() {
    this.nativeStorage.getItem('myitem')
    .then(
      data => console.log(data),
      error => console.error(error)
    );
  }
}
