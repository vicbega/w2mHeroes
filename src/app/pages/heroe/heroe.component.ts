import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  exampleForm: FormGroup;

  heroe: HeroeModel = new HeroeModel();

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.exampleForm = this.formBuilder.group({
      heroeIdFormControl: ['',],
      heroeNameFormControl: ['',],
      heroePowerFormControl: ['',]
    });
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {

      this.heroesService.getHeroe(id)
        .subscribe((resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
          this.exampleForm.get('heroeIdFormControl')?.setValue(this.heroe.id);
          this.exampleForm.get('heroeNameFormControl')?.setValue(this.heroe.nombre);
          this.exampleForm.get('heroePowerFormControl')?.setValue(this.heroe.poder);
        });

    }

  }

  guardar() {

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

    this.heroe.id = this.exampleForm.value.heroeIdFormControl;
    this.heroe.nombre = this.exampleForm.value.heroeNameFormControl;
    this.heroe.poder = this.exampleForm.value.heroePowerFormControl;

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {

      Swal.fire(
        this.heroe.nombre,
        'Se actualizó correctamente',
        'success'
      );

    });



  }

}
