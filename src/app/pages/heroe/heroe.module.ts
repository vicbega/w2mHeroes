import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroeComponent } from './heroe.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UppercaseDirective } from 'src/app/directives/uppercase.directive';



@NgModule({
  declarations: [
    HeroeComponent,
    UppercaseDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [HeroeComponent]
})
export class HeroeModule { }
