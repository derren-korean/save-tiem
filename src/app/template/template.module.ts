import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';
import { FormsModule } from '@angular/forms';
import { DayTimePipe } from './day-time.pipe';
import { EditInfoPageModule } from './edit-info/edit-info.module';

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
    RouterModule.forChild(routes)
  ],
  declarations: [TemplateComponent, DayTimePipe]
})
export class TemplateModule { }
