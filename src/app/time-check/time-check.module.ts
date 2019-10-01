import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TimeCheckPage } from './time-check.page';
import { ShiftFocusDirective } from './shift-focus.directive';

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
  declarations: [TimeCheckPage, ShiftFocusDirective]
})
export class TimeCheckPageModule {}
