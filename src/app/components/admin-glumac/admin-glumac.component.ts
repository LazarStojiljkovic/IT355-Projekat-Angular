import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Glumac, Film } from 'src/app/models/film.model';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-admin-glumac',
  templateUrl: './admin-glumac.component.html',
  styleUrls: ['./admin-glumac.component.css']
})
export class AdminGlumacComponent implements OnInit {

  createGlumacForm: FormGroup;
  films: Film[] = [];
  glumci: Glumac[] = [];
  availableGlumci: Glumac[] = [];
  selectedFilm: Film | null = null;

  constructor(private fb: FormBuilder, private filmService: FilmService) {
    this.createGlumacForm = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      biografija: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadFilms();
    this.loadGlumci();
  }

  loadFilms(): void {
    this.filmService.uzmiFilmove().subscribe(
      films => this.films = films,
      error => console.error('Error loading films', error)
    );
  }

  loadGlumci(): void {
    this.filmService.uzmiGlumce().subscribe(
      glumci => this.glumci = glumci,
      error => console.error('Error loading actors', error)
    );
  }

  onFilmSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const filmId = Number(selectElement.value);
    this.selectedFilm = this.films.find(film => film.id === filmId) || null;

    if (this.selectedFilm) {
      const glumciIdsInFilm = new Set(this.selectedFilm.glumci.map(glumac => glumac.id));
      this.availableGlumci = this.glumci.filter(glumac => !glumciIdsInFilm.has(glumac.id));
    } else {
      this.availableGlumci = this.glumci;
    }
  }

  addGlumacToFilm(glumac: Glumac): void {
    if (this.selectedFilm) {
      this.selectedFilm.glumci.push(glumac);
      this.filmService.updateFilm(this.selectedFilm).subscribe(
        updatedFilm => {
          console.log('Glumac je uspesno dodat u film', updatedFilm);
          this.availableGlumci = this.availableGlumci.filter(g => g.id !== glumac.id);
        },
        error => console.error('Greska pri dodavanju glumca u film', error)
      );
    }
  }

  onSubmitCreateGlumac(): void {
    if (this.createGlumacForm.valid) {
      const formValues = this.createGlumacForm.value;
      const noviGlumac: Glumac = {
        ime: formValues.ime,
        prezime: formValues.prezime,
        biografija: formValues.biografija,
        id: 0
      };
      this.filmService.createGlumac(noviGlumac).subscribe(
        response => {
          console.log('Glumac je uspesno napravljen', response);
          this.createGlumacForm.reset();
          this.loadGlumci();  
        },
        error => console.error('Greska pri pravljenju glumca', error)
      );
    }
  }
}

