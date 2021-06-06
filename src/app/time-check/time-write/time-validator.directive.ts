import { Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appTimeValidator]',
  host: { '(keyup)': 'onkeyup()'}
})
export class TimeValidatorDirective {

  constructor(private el: ElementRef) {}

  onkeyup() {
    const _el = this.el.nativeElement.firstElementChild;
    if (_el.value != _el.value.trim() || !this.isHHmm(_el.value)){
      this._removeLastString(_el);
      return;
    }
    if (_el.maxLength < _el.value.length) {
      this._removeLastString(_el);
      return;
    }
  }
  
  _removeLastString(el: any) {
    el.value = el.value.substring(0, el.value.length-1);
  }

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
}
