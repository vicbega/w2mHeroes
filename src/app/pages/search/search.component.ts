import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  heroes: any;
  heroes$: Observable<any[]> | undefined;
  termino: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService,
    private heroesService: HeroesService) {

  }

  ngOnInit() {

    // this.activatedRoute.params.subscribe(params => {
    //   this.termino = params['termino'];
    //   // this.heroes$ = this._heroesService.buscarHeroes( params['termino'] );

    //   this.heroes$.subscribe(
    //     data => {
    //       this.heroes = data;
    //       // this.effects = this.effects.map(x => x.name);
    //       // this.filteredOptions6 = this.effectFormControl.valueChanges.pipe(
    //       //   startWith(''),
    //       //   map(value => this._filter6(value))
    //       // );
    //     }
    //   );

    //   console.log(this.heroes);
    // });

  }

  searchHeroe(termino: string) {

    this.heroesService.searchHeroes(termino)
      .subscribe( resp => {
        this.heroes = resp;
      });

  }

}
