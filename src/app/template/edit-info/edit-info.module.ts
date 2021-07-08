import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditInfoPage } from './edit-info.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [EditInfoPage],
  exports: [EditInfoPage]
})
export class EditInfoPageModule {}
