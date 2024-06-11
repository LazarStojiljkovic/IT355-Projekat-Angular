import { Component } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Korisnik } from 'src/app/models/korisnik.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {
  korisnik: Korisnik = { id: 0, email: '', ime: '', sifra: '', admin: 0 };
  errorMessage: string = '';
  potvrdiSifru: string = '';
  emailError: string = '';
  imeError: string = '';
  sifraError: string = '';
  potvrdiSifruError: string = '';

  constructor(private userService: KorisnikService, private router: Router) {}

  regiForma(): void {
    this.ocisti();
    if (this.registracijaProvera()) {
      this.userService.proveraEmail(this.korisnik.email).subscribe(
        emailPostoji => {
          if (emailPostoji) {
            this.errorMessage = 'Nalog sa ovim Emailom već postoji';
          } else {
            this.userService.registracija(this.korisnik).subscribe(
              response => {
                this.router.navigate(['/login']); 
              },
              error => {
                this.errorMessage = 'Registracija je neuspešna. Probajte ponovo';
              }
            );
          }
        },
        error => {
          this.errorMessage = 'Greška pri proveri Emaila. Probajte ponovo';
        }
      );
    } else {
      this.errorMessage = 'Greška pri unosu informacija';
    }
  }

  private registracijaProvera(): boolean {
    let valid = true;
    
    if (!this.korisnik.email.trim()) {
      this.emailError = 'Email je obavezan';
      valid = false;
    } else if (!this.emailProvera(this.korisnik.email)) {
      this.emailError = 'Neispravan format Emaila';
      valid = false;
    }

    if (!this.korisnik.ime.trim()) {
      this.imeError = 'Ime je obavezno';
      valid = false;
    }

    if (!this.korisnik.sifra.trim()) {
      this.sifraError = 'Šifra je obavezna';
      valid = false;
    } else if (!this.sifraProver(this.korisnik.sifra)) {
      this.sifraError = 'Šifra mora imati najmanje 3 karaktera';
      valid = false;
    }

    if (this.korisnik.sifra !== this.potvrdiSifru) {
      this.potvrdiSifruError = 'Šifre se ne poklapaju';
      valid = false;
    }

    return valid;
  }

  private emailProvera(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  private sifraProver(sifra: string): boolean {
    return sifra.length >= 3;
  }

  private ocisti(): void {
    this.emailError = '';
    this.imeError = '';
    this.sifraError = '';
    this.potvrdiSifruError = '';
  }
}


