import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { HeroesModule } from '../heroes/heroes.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    HeroesModule,
    TranslateModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
