import { Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appShiftFocus]',
  host: { '(keyup)': 'onkeyup($event)'}
})
export class ShiftFocusDirective {

  private _INPUT_MAX: number = 4;
  private _ID_SEPARATOR: string = '-';
  @Input('appShiftFocus') TIME_TYPE: string[];
  constructor(private el: ElementRef) {}

  onkeyup(event: KeyboardEvent) {
    const _el = this.el.nativeElement.firstElementChild;
    if (_el.value != _el.value.trim()) {
      this._removeLastString(_el);
      return;
    }
    if (this._INPUT_MAX !== _el.value.length) {
      if (!this.isHHmm(_el.value)) {
        this._removeLastString(_el);
      }
      return;
    }
    if (event.key != "Backspace") {
      this._shiftFocusIfHasNext(_el.id, _el.getAttribute('hasNext'));
    }
  }
  
  _removeLastString(el: any) {
    el.value = el.value.substring(0, el.value.length-1);
  }

  // 입력한 시간이 23:59 이내로만 입력되어야 함. 여기에 넣기 진짜 싫은데 ㅠㅠ
  // 안그러면 onkey event 불러올 때 충돌이 발생한다.
  isHHmm(time: any): boolean {
    let _isHHmm = true;
    if (Number.isNaN(Number(time))) {
      _isHHmm = false;
    } else if (time.length == 1 && Number(time) > 2 || 
      time.length == 2 && Number(time) > 23 || 
      time.length == 3 && Number(time.substring(2,3) > 5) ||
      time.length == 4 && Number(time.substring(2)) > 59) {
        _isHHmm = false;
    } 
    return _isHHmm;
  }

  _shiftFocusIfHasNext(id: string, hasNext:string) {
    if (hasNext !== 'true') {
      this.el.nativeElement.firstElementChild.blur();
      return;
    } 
    
    if (this.TIME_TYPE[0] === id.split(this._ID_SEPARATOR)[0]) {
      this._shiftEl(id, this.TIME_TYPE[0], this.TIME_TYPE[1]).focus();
    } else {
      this._shiftEl(this._incId(id), this.TIME_TYPE[1], this.TIME_TYPE[0]).focus();
    }
  }

  _incId(id: string) {
    let _arr = id.split(this._ID_SEPARATOR);
    _arr[_arr.length-1] = ""+(+_arr[_arr.length-1]+1);
    return _arr.join(this._ID_SEPARATOR);
  }

  _shiftEl(id: string, from: string, to: string):HTMLInputElement {
    return document.getElementById(id.replace(from, to)).firstElementChild as HTMLInputElement;
  }
}
