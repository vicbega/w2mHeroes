import { Component, Input, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  @Input() heroes: any | undefined;
  cargando = false;


  constructor( private heroesService: HeroesService ) { }

  ngOnInit() {

    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe( resp => {
        this.heroes = resp;
        this.cargando = false;
      });

  }

  deleteHeroe( heroe: HeroeModel, i: number ) {

    Swal.fire(
      '¿Está seguro?',
      `Está seguro que desea borrar a ${ heroe.name }`,
      'question'
    ).then( resp => {

      if ( resp.value ) {
        this.heroes.splice(i, 1);
        this.heroesService.deleteHeroe( heroe.id ).subscribe();
      }

    });



  }


}
