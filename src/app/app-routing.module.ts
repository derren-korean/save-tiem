import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DayTimePipe } from './template/day-time.pipe';

const routes: Routes = [
  { path: '', redirectTo: 'time-check', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'time-check', loadChildren: './time-check/time-check.module#TimeCheckPageModule' },
  { path: 'template', loadChildren: './template/template.module#TemplateModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
