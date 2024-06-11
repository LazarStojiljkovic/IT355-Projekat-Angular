import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Direktor, Film, Glumac } from 'src/app/models/film.model';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-admin-film',
  templateUrl: './admin-film.component.html',
  styleUrls: ['./admin-film.component.css']
})
export class AdminFilmComponent implements OnInit {
  createFilmForm: FormGroup;
  direktori: Direktor[] = [];
  glumci: Glumac[] = [];
  
  imeError: string = '';
  zanarError: string = '';
  godinaError: string = '';
  trajanjeError: string = '';
  slikaError: string = '';
  direktorError: string = '';
  errorMessage: string = '';
  successMessage: string = ''; 

  constructor(private fb: FormBuilder, private filmService: FilmService) {
    this.createFilmForm = this.fb.group({
      ime: ['', Validators.required],
      zanar: ['', Validators.required],
      godinaObjavljivanja: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      trajanje: ['', [Validators.required, Validators.min(1)]],
      slika: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)/)]],
      direktor: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.ucitajDirektore();
    this.ucitajGlumce();
  }

  ucitajDirektore(): void {
    this.filmService.uzmiDirektore().subscribe(data => {
      this.direktori = data;
    });
  }

  ucitajGlumce(): void {
    this.filmService.uzmiGlumce().subscribe(data => {
      this.glumci = data;
    });
  }

  onSubmit(): void {
    this.ocisti();
    if (this.createFilmForm.valid) {
      const formValues = this.createFilmForm.value;
      const noviFilm: Film = {
        ime: formValues.ime,
        zanar: formValues.zanar,
        godinaObjavljivanja: formValues.godinaObjavljivanja,
        trajanje: formValues.trajanje,
        slika: formValues.slika,
        direktor: {
          id: formValues.direktor,
          ime: '',
          prezime: '',
          biografija: ''
        },
        glumci: [],
        id: 0
      };
      this.filmService.create(noviFilm).subscribe(
        response => {
          console.log('Film added successfully', response);
          this.successMessage = 'Film je uspešno kreiran!';
          this.createFilmForm.reset();
        },
        error => {
          this.errorMessage = 'Greška pri dodavanju filma. Molimo pokušajte ponovo.';
          console.error('Error adding film', error);
        }
      );
    } else {
      this.validateForm();
    }
  }

  private validateForm(): void {
    if (!this.createFilmForm.get('ime')?.valid) {
      this.imeError = 'Ime je obavezno.';
    }
    if (!this.createFilmForm.get('zanar')?.valid) {
      this.zanarError = 'Žanr je obavezan.';
    }
    if (!this.createFilmForm.get('godinaObjavljivanja')?.valid) {
      this.godinaError = 'Godina objavljivanja je obavezna i mora biti validna.';
    }
    if (!this.createFilmForm.get('trajanje')?.valid) {
      this.trajanjeError = 'Trajanje je obavezno i mora biti pozitivno.';
    }
    if (!this.createFilmForm.get('slika')?.valid) {
      this.slikaError = 'URL slike je obavezan i mora biti validan.';
    }
    if (!this.createFilmForm.get('direktor')?.valid) {
      this.direktorError = 'Direktor je obavezan.';
    }
  }

  private ocisti(): void {
    this.imeError = '';
    this.zanarError = '';
    this.godinaError = '';
    this.trajanjeError = '';
    this.slikaError = '';
    this.direktorError = '';
    this.errorMessage = '';
    this.successMessage = ''; 
  }
}


