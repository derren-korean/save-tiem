import { Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appShiftFocus]',
  host: {'(keyup)': 'onkeyup()'}
})
export class ShiftFocusDirective {

  private _ID_SEPARATOR: string = '-';
  @Input('appShiftFocus') TIME_TYPE: string[];
  constructor(private el: ElementRef) {}

  onkeyup() {
    // const _el = this.el.nativeElement.firstElementChild; legacy code for ionic 7 migration
    const _el = this.el.nativeElement;
    if (_el.maxlength == _el.value.length) {
      this._shiftFocusIfHasNext(this.el.nativeElement.id, this.el.nativeElement.getAttribute('hasNext'));
    }
  }
  
  _removeLastString(el: any) {
    el.value = el.value.substring(0, el.value.length-1);
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
    return document.getElementById(id.replace(from, to))?.firstElementChild as HTMLInputElement;
  }
}
