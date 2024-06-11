import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/models/film.model';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { RecenzijaService } from 'src/app/services/recenzija.service';
import { Recenzija } from 'src/app/models/recenzija.model';
import { ListaGledanjaFilmService } from 'src/app/services/lista-gledanja.service';
import { Korisnik } from 'src/app/models/korisnik.model';
import { ListaGledanjaFilm } from 'src/app/models/listaGledanjaFilm.model';

@Component({
  selector: 'app-film-detaljno',
  templateUrl: './film-detaljno.component.html',
  styleUrls: ['./film-detaljno.component.css']
})
export class FilmDetaljnoComponent implements OnInit {
  film: Film | undefined;
  editFilmForm: FormGroup;
  recenzijaForm: FormGroup;
  isEditing = false;
  email: string | null = null;
  ime: string | null = null;
  admin = false;
  isLoggedIn = false;
  recenzije: Recenzija[] = [];
  hasReviewed = false;
  korisnikovId: number = 0;
  ListaGledanjaId: number | undefined;

  constructor(
    private korisnikService: KorisnikService,
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmService,
    private recenzijaService: RecenzijaService,
    private fb: FormBuilder,
    private listaGledanjaFilmService: ListaGledanjaFilmService
  ) {
    this.editFilmForm = this.fb.group({
      id: [0],
      ime: ['', Validators.required],
      zanar: ['', Validators.required],
      godinaObjavljivanja: ['', Validators.required],
      trajanje: ['', Validators.required],
      slika: ['', Validators.required],
      direktor: this.fb.group({
        id: [0, Validators.required],
        ime: ['', Validators.required],
        prezime: ['', Validators.required],
        biografija: ['']
      })
    });

    this.recenzijaForm = this.fb.group({
      tekst: ['', Validators.required],
      ocena: [0, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.korisnikService.isLoggedIn();
    this.korisnikovId = JSON.parse(localStorage.getItem('korisnik')!).id;
    if (this.isLoggedIn) {
      const korisnik = JSON.parse(localStorage.getItem('korisnik')!);
      this.email = korisnik.email;
      this.ime = korisnik.ime;
      this.admin = korisnik.admin == 1;
    }
    this.fetchCartId();
    

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.filmService.uzmiFilm(id).subscribe(
      (data) => {
        this.film = data;
        this.editFilmForm.patchValue(data);
        this.fetchRecenzije();
      },
      (error) => {
        console.error('Error fetching film details:', error);
      }
    );
  }

  fetchRecenzije(): void {
    if (this.film) {
      this.recenzijaService.getRecenzijeByFilmId(this.film.id).subscribe(
        (data) => {
          this.recenzije = data;
          const korisnik = JSON.parse(localStorage.getItem('korisnik')!);
          this.hasReviewed = this.recenzije.some(recenzija => recenzija.korisnik.id === korisnik.id);
        },
        (error) => {
          console.error('Error fetching recenzije:', error);
        }
      );
    }
  }

  onEditSubmit(): void {
    if (this.editFilmForm.valid) {
      this.filmService.updateFilm(this.editFilmForm.value).subscribe(
        (response) => {
          console.log('Film je uspesno azuriran', response);
          this.isEditing = false;
          this.router.navigate(['/pocetna']);
        },
        (error) => {
          console.error('Greska pri azuriranju filma', error);
        }
      );
    }
  }

  deleteFilm(): void {
    if (this.film) {
      this.filmService.deleteFilm(this.film.id).subscribe(
        () => {
          console.log('Film deleted successfully');
          this.router.navigate(['/pocetna']);
        },
        (error) => {
          console.error('Error deleting film', error);
        }
      );
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  onRecenzijaSubmit(): void {
    if (this.recenzijaForm.valid && this.film) {
      const korisnik = JSON.parse(localStorage.getItem('korisnik')!);
      const newRecenzija: Recenzija = {
        id: 0,
        tekst: this.recenzijaForm.value.tekst,
        ocena: this.recenzijaForm.value.ocena,
        film: this.film,
        korisnik: korisnik
      };

      this.recenzijaService.createRecenzija(newRecenzija).subscribe(
        (response) => {
          console.log('Recenzija created successfully', response);
          this.recenzije.push(response);
          this.hasReviewed = true;
          this.recenzijaForm.reset();
        },
        (error) => {
          console.error('Error creating recenzija', error);
        }
      );
    }
  }
  deleteRecenzija(recenzijaId: number): void {
    this.recenzijaService.deleteRecenzija(recenzijaId).subscribe(
      () => {
        console.log('Recenzija je uspesno obrisana');
        this.recenzije = this.recenzije.filter(recenzija => recenzija.id !== recenzijaId);
        const korisnik = JSON.parse(localStorage.getItem('korisnik')!);
        this.hasReviewed = this.recenzije.some(recenzija => recenzija.korisnik.id === korisnik.id);
      },
      (error) => {
        console.error('Greska pri brisanju recenzije', error);
      }
    );
  }

  moguceBrisanje(recenzija: Recenzija): boolean {
    if (this.admin) return true;
    const korisnik = JSON.parse(localStorage.getItem('korisnik')!);
    return recenzija.korisnik.id === korisnik.id;
  }

  
  prosecnaOcena(): number {
    let sum = 0;
    if (this.recenzije.length > 0) {
      this.recenzije.forEach(recenzija => {
        sum += recenzija.ocena;
      });
      return sum / this.recenzije.length;
    }
    return 0; 
  }
  
  fetchCartId(): void {
    
    this.listaGledanjaFilmService.getListaGledanjaByKorisnikId(this.korisnikovId).subscribe(
      (ListaGledanja) => {
        this.ListaGledanjaId = ListaGledanja.id;
        console.log('Cart ID:', this.ListaGledanjaId);
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  dodajUListaGledanja(): void {
    this.listaGledanjaFilmService.getListaGledanjaByKorisnikId(this.korisnikovId).subscribe(
      (ListaGledanja) => {
        this.ListaGledanjaId = ListaGledanja.id;
        console.log('Cart ID:', this.ListaGledanjaId);
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  
    if (this.film) {
      const korisnik:Korisnik = JSON.parse(localStorage.getItem('korisnik')!);
      const listaGledanjaFilm : ListaGledanjaFilm = {
        id: 0, 
        listaGledanja: { id: this.ListaGledanjaId!, korisnik: korisnik },
        film: this.film,
        datumDodavanja: new Date()
        
      };
  
      this.listaGledanjaFilmService.addFilmToListaGledanja(listaGledanjaFilm).subscribe(
        (response) => {
          console.log('Film added to watchlist', response);
        },
        (error) => {
          console.error('Film je vec na listi gledanja', error);
        }
      );
    }
  }
  
  
}


