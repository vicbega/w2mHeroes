import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AssertNotNull } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'http://localhost:3000/';


  constructor(private http: HttpClient) { }


  crearHeroe(heroe: HeroeModel) {

    return this.http.post(`${this.url}heroes`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );

  }

  actualizarHeroe(heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}heroes/${heroe.id}`, heroeTemp);


  }

  borrarHeroe(id: string | null | undefined) {

    return this.http.delete(`${this.url}heroes/${id}`);

  }


  getHeroe(id: string | null) {

    return this.http.get(`${this.url}heroes/${id}`);

  }


  getHeroes() {
    return this.http.get(`${this.url}heroes`);
    // .pipe(
    //   map(this.crearArreglo),
    //   delay(0)
    // );
  }

  // private crearArreglo(heroesObj: object) {

  //   const heroes: HeroeModel[] = [];

  //   Object.keys(heroesObj).forEach(key => {

  //     const heroe: HeroeModel = heroesObj[key];
  //     heroe.id = key;

  //     heroes.push(heroe);
  //   });


  //   return heroes;

  // }

  buscarHeroes(termino: string) {

    let heroesArr: any[] = [];
    termino = termino.toLowerCase();

    // for (let i = 0; i < this.heroes.length; i++) {

    //   let heroe = this.heroes[i];

    //   let nombre = heroe.nombre.toLowerCase();

    //   if (nombre.indexOf(termino) >= 0) {
    //     heroe.idx = i;
    //     heroesArr.push(heroe)
    //   }

    // }

    return this.http.get(`${this.url}heroes?nombre_like=` + termino);

  }


}
