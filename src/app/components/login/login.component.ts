import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Korisnik } from '../../models/korisnik.model';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  korisnik: Korisnik = { id: 0, email: '', ime: '', sifra: '', admin: 0 };
  errorMessage: string = '';
  emailError: string = '';
  sifraError: string = '';

  constructor(private korisnikService: KorisnikService, private router: Router) {}

  onLogin(): void {
    this.clearErrors();
    if (this.isValidLogin()) {
      this.korisnikService.login(this.korisnik).subscribe(
        response => {
          this.korisnikService.setToken(response.jwt);
          localStorage.setItem('korisnik', JSON.stringify(response.korisnik));
          this.router.navigate(['/pocetna']);
        },
        error => {
          this.errorMessage = 'Neispravan email ili sifra';
        }
      );
    } 
  }

  private isValidLogin(): boolean {
    let valid = true;
    
    if (!this.korisnik.email.trim()) {
      this.emailError = 'Email je obavezan';
      valid = false;
    } else if (!this.isValidEmail(this.korisnik.email)) {
      this.emailError = 'Neispravan format Emaila';
      valid = false;
    }

    if (!this.korisnik.sifra.trim()) {
      this.sifraError = 'Šifra je obavezna';
      valid = false;
    }

    return valid;
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  private clearErrors(): void {
    this.emailError = '';
    this.sifraError = '';
    this.errorMessage = '';
  }
}
