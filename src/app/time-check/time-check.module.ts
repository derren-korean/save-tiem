import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TimeCheckPage } from './time-check.page';
import { TimeValidatorDirective } from './time-write/time-validator.directive';
import { ShiftFocusDirective } from './time-write/shift-focus.directive';
import { TimeWriteComponent } from './time-write/time-write.component';
import { DateComponent } from './date/date.component';
import { WorkingTimeComponent } from './working-time/working-time.component';

const routes: Routes = [
  {
    path: '',
    component: TimeCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TimeCheckPage, TimeValidatorDirective, ShiftFocusDirective, TimeWriteComponent, DateComponent, WorkingTimeComponent]
})
export class TimeCheckPageModule {}
