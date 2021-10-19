import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  // {
  //   path: 'search',
  //   loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
  // },
  {
    path: 'heroes',
    loadChildren: () => import('./pages/heroes/heroes.module').then(m => m.HeroesModule)
  },
  {
    path: 'heroe/:id',
    loadChildren: () => import('./pages/heroe/heroe.module').then(m => m.HeroeModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    TranslateModule
  ]
})
export class AppRoutingModule { }
