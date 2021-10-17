import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroeComponent } from './heroe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UppercaseDirective } from 'src/app/directives/uppercase.directive';
import { HeroeRoutingModule } from './heroe-routing.module';



@NgModule({
  declarations: [
    HeroeComponent,
    UppercaseDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeroeRoutingModule
  ],
  exports: [HeroeComponent]
})
export class HeroeModule { }
