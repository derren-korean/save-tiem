import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';
import { FormsModule } from '@angular/forms';
import { DayTimePipe } from './day-time.pipe';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    // children: [
    //   { path: 'edit-info', loadChildren: './template/edit-info/edit-info.module#EditInfoPageModule' },
    // ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TemplateComponent, DayTimePipe]
})
export class TemplateModule { }
