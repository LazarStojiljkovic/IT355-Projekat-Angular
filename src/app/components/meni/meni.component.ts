
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnInit {
  isLoggedIn = false;
  email: string | null = null;
  ime: string | null = null;
  admin = false;

  constructor(private korisnikService: KorisnikService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.korisnikService.isLoggedIn();
    if (this.isLoggedIn) {
      const korisnik = JSON.parse(localStorage.getItem('korisnik')!);
      this.email = korisnik.email;
      this.ime = korisnik.ime;
      this.admin = korisnik.admin == 1;
    }
  }

  odjava(): void {
    this.korisnikService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('korisnik');
    this.router.navigate(['/login']);
  }
}

