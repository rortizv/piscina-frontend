import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from '../interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private API_URL: string;
  private headers: HttpHeaders;
  private jwt: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL_CORE;
    this.jwt = localStorage.getItem('JWT') || '{}';
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `${this.jwt}`)
      .set('Accept', 'application/json');
  }

  listarReservas(filter?: Date): Observable<Array<Reserva>> {
    const endpoint = `api/reservas/${filter}`;
    const url = `${this.API_URL}${endpoint}`;
    return this.http.get<Array<Reserva>>(url, { headers: this.headers });
  }

  eliminarReserva(id_reserva: number) {
    const endpoint = `api/reservas`;
    const url = `${this.API_URL}${endpoint}${id_reserva.valueOf}`;
    return this.http.delete<Reserva>(url, { headers: this.headers });
  }

  agregarReserva(reserva: Reserva): Observable<Reserva> {
    const endpoint = `api/reservas/crear-reserva`;
    const url = `${this.API_URL}${endpoint}`;
    return this.http.post<Reserva>(url, reserva, { headers: this.headers });
  }

}
