import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, of, combineLatest } from 'rxjs';

import { Pais, PaisSmall } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseUrl: string = 'https://restcountries.com/v2';
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  //* Retornaremos un nuevo arreglo (una copia) desestructurado, de tal forma que, 
  //* si accidentalmente modificamos la propiedad del getter nunca modificaremos 
  //* el atributo privado _regiones, esto por que como se recordará, todos los
  //* objetos en javaScript se pasan por referencia
  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) { }

  //* https://restcountries.com/v2/region/americas?fields=alpha3Code,name
  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    const url = `${this._baseUrl}/region/${region}?fields=alpha3Code,name`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo(codigo: string): Observable<Pais> {
    if (!codigo) {
      //* EMPTY, un Observable simple que no emite elementos al Observador e inmediatamente emite una notificación completa.
      //* EMPTY, un Observable simple que solo emite la notificación completa. 
      return EMPTY;
    }
    const url = `${this._baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais>(`${url}`);
  }

  getPaisPorCodigoSmall(codigo: string): Observable<PaisSmall> {
    if (!codigo) {
      return EMPTY;
    }
    const url = `${this._baseUrl}/alpha/${codigo}?fields=alpha3Code,name`;
    return this.http.get<PaisSmall>(`${url}`);
  }

  getPaisesPorCodigos(borders: string[]): Observable<PaisSmall[]> {
    if(!borders) {
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = []; //* Tenemos un arreglo de Observables que cada uno emitirá un objeto del tipo PaisSmall
    borders.forEach(codigo => {
        const peticion = this.getPaisPorCodigoSmall(codigo); //* Solo estamos almacenando la petición en la constante. Si usáramos el .subscribe allí sí lo llamaríamos, pero por ahora eso no queremos
        peticiones.push(peticion);
    });

    return combineLatest(peticiones); //* combineLatest, regresa un arreglo con el producto de cada una de las peticiones internas
  }

}
