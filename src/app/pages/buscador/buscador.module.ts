import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from './buscador.component';
import { BuscadorRoutingModule } from './buscador-routing.module';
import { HeroesModule } from '../heroes/heroes.module';



@NgModule({
  declarations: [
    BuscadorComponent
  ],
  imports: [
    CommonModule,
    BuscadorRoutingModule,
    HeroesModule
  ],
  exports: [BuscadorComponent]
})
export class BuscadorModule { }
