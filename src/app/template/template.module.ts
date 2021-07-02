import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';

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
    RouterModule.forChild(routes)
  ],
  declarations: [TemplateComponent]
})
export class TemplateModule { }
