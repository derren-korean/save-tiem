import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditInfoPage } from './edit-info.page';
import { DayTimePipeModule } from '../day-time-pipe/day-time.pipe.module';

const routes: Routes = [
  {
    path: 'edit-info',
    component: EditInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DayTimePipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditInfoPage],
  exports: [EditInfoPage]
})
export class EditInfoPageModule {}
