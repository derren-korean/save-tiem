import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'time-check', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'template', loadChildren: './template/template.module#TemplateModule' },
  { path: 'time-check', loadChildren: './time-check/time-check.module#TimeCheckPageModule' },
  { path: 'time-read', loadChildren: './read-mode/time-read.module#TimeReadModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
