import { Component, Input, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/services/loading.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  @Input() heroes: any | undefined;
  // cargando = false;
  loading: boolean = false;


  constructor(
    private heroesService: HeroesService,
    private _loading: LoadingService
  ) { }

  ngOnInit() {

    this.listenToLoading();

    // this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe(resp => {
        this.heroes = resp;
        // this.cargando = false;
      });

  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  deleteHeroe(heroe: HeroeModel, i: number) {

    Swal.fire(
      '¿Está seguro?',
      `Está seguro que desea borrar a ${heroe.name}`,
      'question'
    ).then(resp => {

      if (resp.value) {
        this.heroes.splice(i, 1);
        this.heroesService.deleteHeroe(heroe.id).subscribe();
      }

    });



  }


}
