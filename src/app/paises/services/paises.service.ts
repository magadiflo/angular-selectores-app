import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  //* Retornaremos un nuevo arreglo (una copia) desestructurado, de tal forma que, 
  //* si accidentalmente modificamos la propiedad del getter nunca modificaremos 
  //* el atributo privado _regiones, esto por que como se recordará, todos los
  //* objetos en javaScript se pasan por referencia
  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor() { }
}
