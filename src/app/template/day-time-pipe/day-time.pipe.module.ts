import { NgModule } from "@angular/core";
import { DayTimePipe } from "./day-time.pipe";

@NgModule({
    imports: [],
    declarations: [DayTimePipe],
    exports: [DayTimePipe]
})
export class DayTimePipeModule { }