import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';
import { FormsModule } from '@angular/forms';
import { EditInfoPageModule } from './edit-info/edit-info.module';
import { DayTimePipeModule } from './day-time-pipe/day-time.pipe.module';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    EditInfoPageModule,
    DayTimePipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TemplateComponent]
})
export class TemplateModule { }
