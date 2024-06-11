import { Injectable } from '@angular/core';
import { KorisnikService } from './korisnik.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Direktor, Film, Glumac } from '../models/film.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilmService {


   private url = 'http://localhost:8080';


  constructor(private http: HttpClient, private korisnikService: KorisnikService) {}


  private getAuthHeaders(): HttpHeaders {
    const token = this.korisnikService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  uzmiDirektore(): Observable<Direktor[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Direktor[]>(`${this.url}/direktor/getAll`, {headers});
  }

  uzmiGlumce(): Observable<Glumac[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Glumac[]>(`${this.url}/glumac/getAll`, {headers});
  }

  create(film: Film): Observable<Film> {
    const headers = this.getAuthHeaders();
    return this.http.post<Film>(`${this.url}/film/create`, film, {headers});
  }
  createGlumac(glumac: Glumac): Observable<Glumac> {
    const headers = this.getAuthHeaders();
    return this.http.post<Glumac>(`${this.url}/glumac/create`, glumac, {headers});
  }

  uzmiFilmove(): Observable<Film[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Film[]>(`${this.url}/film/getAll`, {headers});
  }
  uzmiFilm(filmId: number): Observable<Film> {
    const headers = this.getAuthHeaders();
    return this.http.get<Film>(`${this.url}/film/${filmId}`, { headers });
  }
  updateFilm(film: Film): Observable<Film> {
    const headers = this.getAuthHeaders();
    return this.http.put<Film>(`${this.url}/film/update`, film, { headers });
  }

  deleteFilm(filmId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.url}/film/${filmId}`, { headers });
  }
  
}
