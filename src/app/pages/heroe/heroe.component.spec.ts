import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { HeroesService } from 'src/app/services/heroes.service';

import { HeroeComponent } from './heroe.component';

describe( 'Formularios', () => {

  let componente: HeroeComponent;
  const spy = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) })
  const servicio = new HeroesService(spy);

  beforeEach( () => {
      componente = new HeroeComponent( servicio, undefined, new FormBuilder(), undefined );

  });

  it('El nombre debe de ser obligatorio', () => {

    const control = componente.heroeForm?.get('heroeNameFormControl');
    control!.setValue('');
    expect(control!.valid).toBeFalsy();

  });

  it('El email debe de ser un correo válido', () => {

    const control = componente.heroeForm?.get('heroeNameFormControl');
    control!.setValue('fernando@gmail.com');
    expect(control!.valid).toBeTruthy();

  });
});
