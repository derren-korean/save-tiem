import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'time-check', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'template', loadChildren: () => import('./template/template.module').then( m => m.TemplateModule)},
  { path: 'time-check', loadChildren: () => import('./time-check/time-check.module').then( m => m.TimeCheckPageModule)},
  { path: 'time-read', loadChildren: () => import('./read-mode/time-read.module').then( m => m.TimeReadModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
