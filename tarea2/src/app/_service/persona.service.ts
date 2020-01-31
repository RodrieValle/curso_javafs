import { Injectable } from '@angular/core';
import { Persona } from '../_model/persona';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaCambio = new Subject<Persona[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/personas`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Persona[]>(this.url);
  }

  listarPorId(idPersona: number) {
    return this.http.get<Persona>(`${this.url}/${idPersona}`);
  }

  registrar(persona: Persona) {
    return this.http.post(this.url, persona);
  }

  modificar(persona: Persona) {
    return this.http.put(this.url, persona);
  }

  eliminar(idPersona: number) {
    return this.http.delete(`${this.url}/${idPersona}`);
  }
}
