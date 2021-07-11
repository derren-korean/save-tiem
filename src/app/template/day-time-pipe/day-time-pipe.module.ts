import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DayTimePipe } from './day-time.pipe';

const routes: Routes = [
  {
    path: '',
    component: DayTimePipe,
    data: {preload: true},
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DayTimePipe],
  exports: [DayTimePipe]
})
export class DayTimePipeModule { }
