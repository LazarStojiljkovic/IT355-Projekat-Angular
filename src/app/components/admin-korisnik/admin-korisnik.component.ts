import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik.model';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-admin-korisnik',
  templateUrl: './admin-korisnik.component.html',
  styleUrls: ['./admin-korisnik.component.css']
})
export class AdminKorisnikComponent implements OnInit{
  korisnici: Korisnik[] = [];
  selektovanKorisnik: Korisnik | null = null;

  constructor(private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.uzmiKorisnike();
  }

  uzmiKorisnike(): void {
    this.korisnikService.uzmiKorisnike().subscribe((data: Korisnik[]) => {
      this.korisnici = data;
    });
  }

  azurirajKorisnika(id: number): void {
    this.selektovanKorisnik = this.korisnici.find(k => k.id === id) || null;
  }

  obrisiKorisnika(id: number): void {
    this.korisnikService.obrisiKorisnika(id).subscribe(() => {
      this.korisnici = this.korisnici.filter(k => k.id !== id);
    });
  }

  potvrdiAzuriranje(): void {
    if (this.selektovanKorisnik) {
      this.korisnikService.azurirajKorisnika(this.selektovanKorisnik).subscribe((updatedKorisnik: Korisnik) => {
        const index = this.korisnici.findIndex(k => k.id === updatedKorisnik.id);
        if (index !== -1) {
          this.korisnici[index] = updatedKorisnik;
        }
        this.selektovanKorisnik = null;
      });
    }
  }

  otkaziAzuriranje(): void {
    this.selektovanKorisnik = null;
  }
}


