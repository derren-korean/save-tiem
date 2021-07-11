export namespace DateFormatterSingleton {  

    export function nowYYYYmmDD():string {
        let _temp = new Date();
        return _yyyyMMdd(_temp);
    }

    export function toYYYYmmDD(date: string):string {
        let _temp = new Date(date);
        return _yyyyMMdd(_temp);
    }

    function _yyyyMMdd(date: Date) {
        return date.getFullYear()+'-'
        +_toTwoDigits((date.getMonth()+1).toString())+'-'
        +_toTwoDigits(date.getDate().toString());
    }

    function _toTwoDigits(numeric: string):string {
        return numeric.length == 1 ? "0"+numeric : numeric;
    }
}