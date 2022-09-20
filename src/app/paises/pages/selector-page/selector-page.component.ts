import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs';

import { PaisesService } from '../../services/paises.service';
import { PaisSmall, Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]],
  });

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];

  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    //* Cuando cambie la región
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap(region => this.miFormulario.get('pais')?.reset('')),
        switchMap(region => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe((paises: PaisSmall[]) => this.paises = paises);

    //* Cuando cambie el país
    this.miFormulario.get('pais')?.valueChanges
        .pipe(
          tap(codigo => {
            this.miFormulario.get('frontera')?.reset('');
            this.fronteras = [];
          }),
          switchMap(codigo => this.paisesService.getPaisPorCodigo(codigo))
        )
        .subscribe((pais: Pais) => this.fronteras = pais.borders);
  }

  guardar(): void {
    console.log(this.miFormulario.value);
  }

}
