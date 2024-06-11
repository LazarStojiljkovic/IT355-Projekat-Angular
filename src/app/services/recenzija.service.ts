import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recenzija } from 'src/app/models/recenzija.model';
import { KorisnikService } from './korisnik.service';

@Injectable({
  providedIn: 'root'
})
export class RecenzijaService {
  private baseUrl = 'http://localhost:8080/recenzija';

  constructor(private http: HttpClient,private korisnikService: KorisnikService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.korisnikService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getRecenzijeByFilmId(filmId: number): Observable<Recenzija[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Recenzija[]>(`${this.baseUrl}/getByFilmId/${filmId}`,{headers});
  }

  createRecenzija(recenzija: Recenzija): Observable<Recenzija> {
    const headers = this.getAuthHeaders();
    return this.http.post<Recenzija>(`${this.baseUrl}/create`, recenzija,{headers});
  }
  deleteRecenzija(recenzijaId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/${recenzijaId}`,{headers});
  }

  
}
