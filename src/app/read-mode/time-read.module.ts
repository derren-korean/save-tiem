import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TimeReadComponent } from './time-read.component';
import { ShareFabComponent } from './share-fab/share-fab.component';

const routes: Routes = [
  {
    path: '',
    component: TimeReadComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TimeReadComponent, ShareFabComponent]
})
export class TimeReadModule { }
