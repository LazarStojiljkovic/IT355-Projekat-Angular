import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Korisnik } from 'src/app/models/korisnik.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  korisnik: Korisnik | null = null;
  novaSifra: string = '';
  potvrdiSifru: string = '';
  successMessage: string = ''; 
  errorMessage: string = ''; 

  constructor(private korisnikService: KorisnikService, private router: Router) {}

  ngOnInit(): void {
    this.uzmiKorisnika();
  }

  uzmiKorisnika(): void {
    const korisnikId = this.korisnikService.getCurrentKorisnikId();
    if (korisnikId) {
      this.korisnikService.uzmiKorisnika(korisnikId).subscribe(
        (data) => {
          this.korisnik = data;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    this.ocisti();
    if (this.novaSifra !== this.potvrdiSifru) {
      this.errorMessage = 'Šifre se ne poklapaju. Molimo vas da ponovo unesete šifre.';
      return;
    }
  
    if (this.novaSifra.length < 3) {
      this.errorMessage = 'Nova šifra mora imati barem 3 karaktera.';
      return;
    }
  
    if (this.korisnik) {
      this.korisnik.sifra = this.novaSifra;
      this.korisnikService.azurirajKorisnika(this.korisnik).subscribe(
        (data) => {
          this.successMessage = 'Šifra je uspešno promenjena.';
          this.router.navigate(['/profil']);
        },
        (error) => {
          this.errorMessage = 'Greška pri promeni šifre. Molimo pokušajte ponovo.';
          console.error(error);
        }
      );
    }
  }
  
  private ocisti(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}

