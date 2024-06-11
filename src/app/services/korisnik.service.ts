import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Korisnik } from '../models/korisnik.model';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  private apiUrl = 'http://localhost:8080/korisnik';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  login(korisnik: Korisnik): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, korisnik);
  }

  registracija(korisnik: Korisnik): Observable<Korisnik> {
    return this.http.post<Korisnik>(`${this.apiUrl}/create`, korisnik);
  }

  proveraEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/proveraEmail`, { params: { email } });
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('korisnik');
  }

  azurirajKorisnika(korisnik: Korisnik): Observable<Korisnik> {
    const headers = this.getAuthHeaders();
    return this.http.put<Korisnik>(`${this.apiUrl}/update`, korisnik, {headers});
  }
  uzmiKorisnike(): Observable<Korisnik[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Korisnik[]>(`${this.apiUrl}/getAll`, {headers});
  }
  obrisiKorisnika(KorisnikId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${KorisnikId}`, {headers});
  }
  
  
  getCurrentKorisnikId(): number | null {
    const korisnik = localStorage.getItem('korisnik');
    return korisnik ? JSON.parse(korisnik).id : null;
  }

  uzmiKorisnika(korisnikId: number): Observable<Korisnik> {
    const headers = this.getAuthHeaders();
    return this.http.get<Korisnik>(`${this.apiUrl}/${korisnikId}`, { headers });
  }



}
