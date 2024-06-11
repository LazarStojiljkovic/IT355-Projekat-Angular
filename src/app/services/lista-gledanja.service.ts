import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaGledanja, ListaGledanjaFilm } from '../models/listaGledanjaFilm.model'; 
import { KorisnikService } from './korisnik.service';

@Injectable({
  providedIn: 'root'
})
export class ListaGledanjaFilmService {
  private url = 'http://localhost:8080/listaGledanjaFilm';
  private url2 = 'http://localhost:8080/listaGledanja';

  constructor(private http: HttpClient, private korisnikService: KorisnikService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.korisnikService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addFilmToListaGledanja(listaGledanjaFilm: ListaGledanjaFilm): Observable<ListaGledanjaFilm> {
    const headers = this.getAuthHeaders();
    return this.http.post<ListaGledanjaFilm>(`${this.url}/create`, listaGledanjaFilm, { headers });
  }

  getListaGledanja(korisnikId: number): Observable<ListaGledanjaFilm[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<ListaGledanjaFilm[]>(`${this.url}/listaGledanja/${korisnikId}`, { headers });
  }

  getListaGledanjaByKorisnikId(korisnik_id: number): Observable<ListaGledanja> {
    const headers = this.getAuthHeaders();
    return this.http.get<ListaGledanja>(`${this.url2}/findByKorisnik_Id/${korisnik_id}`, { headers });
  }


  findListaGledanjaFilmByKorisnikId(userId: number): Observable<ListaGledanjaFilm[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<ListaGledanjaFilm[]>(
      `${this.url}/findByListaGledanja_Korisnik_Id/${userId}`,
      { headers }
    );
  }

  deleteListaGledanjaFilm(listaGledanjaFilmId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.url}/${listaGledanjaFilmId}`, {headers});
  }

  deleteAllListaGledanjaFilm(korisnik_id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.url}/deleteByListaGledanja_Korisnik_Id/${korisnik_id}`, { headers });
  }
  
}
