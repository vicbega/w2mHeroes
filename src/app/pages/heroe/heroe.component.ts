import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/services/loading.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroeForm: FormGroup;

  heroe: HeroeModel;

  loading: boolean = false;

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _loading: LoadingService
  ) {
    this.heroeForm = this.formBuilder.group({
      heroeIdFormControl: ['',],
      heroeNameFormControl: ['',],
      heroePowerFormControl: ['',]
    });
    this.heroe = {};
  }

  ngOnInit() {

    this.listenToLoading();

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {

      this.heroesService.getHeroe(id)
        .subscribe((resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
          this.heroeForm.get('heroeIdFormControl')?.setValue(this.heroe.id);
          this.heroeForm.get('heroeNameFormControl')?.setValue(this.heroe.name);
          this.heroeForm.get('heroePowerFormControl')?.setValue(this.heroe.power);
        });

    }

  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  save() {

    // if (form.invalid) {
    //   console.log('Formulario no válido');
    //   return;
    // }

    Swal.fire(
      'Espere',
      'Guardando información',
      'info'
    );
    Swal.showLoading();

    this.heroe.id = this.heroeForm.value.heroeIdFormControl;
    this.heroe.name = this.heroeForm.value.heroeNameFormControl;
    this.heroe.power = this.heroeForm.value.heroePowerFormControl;

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.updateHeroe(this.heroe);
    } else {
      peticion = this.heroesService.createHeroe(this.heroe);
    }

    peticion.subscribe(resp => {

      Swal.fire(
        this.heroe.name,
        'Se actualizó correctamente',
        'success'
      );

    });



  }

}
