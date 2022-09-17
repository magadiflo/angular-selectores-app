import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

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

  getPaisPorCodigo(codigo: string): Observable<Pais[]> {
    if (!codigo) {
      //* EMPTY, un Observable simple que no emite elementos al Observador e inmediatamente emite una notificación completa.
      //* EMPTY, un Observable simple que solo emite la notificación completa. 
      return EMPTY;
    }
    const url = `${this._baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais[]>(`${url}`);
  }

}
