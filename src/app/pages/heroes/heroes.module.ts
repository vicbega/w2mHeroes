import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes.component';



@NgModule({
  declarations: [HeroesComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeroesComponent]
})
export class HeroesModule { }
