import { Component } from '@angular/core';
import { ListaGledanjaFilm } from 'src/app/models/listaGledanjaFilm.model';
import { ListaGledanjaFilmService } from 'src/app/services/lista-gledanja.service';

@Component({
  selector: 'app-lista-gledanja',
  templateUrl: './lista-gledanja.component.html',
  styleUrls: ['./lista-gledanja.component.css']
})
export class ListaGledanjaComponent {


 listaGledanjaFilm: ListaGledanjaFilm[] = [];
  korisnik_id: number = 0;
  constructor(private listaGledanjaService: ListaGledanjaFilmService) {}

  ngOnInit(): void {
    this.korisnik_id = JSON.parse(localStorage.getItem('korisnik')!).id;
    const korisnik_id = this.korisnik_id;
    this.listaGledanjaService.findListaGledanjaFilmByKorisnikId(korisnik_id).subscribe({
      next: (filmovi) => this.listaGledanjaFilm = filmovi,
      error: (err) => console.error(err)
    });
  }

  deleteListaGledanjaFilm(listaGledanjaFilmId: number): void {
    this.listaGledanjaService.deleteListaGledanjaFilm(listaGledanjaFilmId).subscribe({
      next: () => {
        this.listaGledanjaFilm = this.listaGledanjaFilm.filter(filmovi => filmovi.id !== listaGledanjaFilmId);
      },
      error: (err) => console.error(err)
    });
  }

  deleteAllListaGledanjaFilm(): void {
    this.korisnik_id = JSON.parse(localStorage.getItem('korisnik')!).id;
    const korisnik_id = this.korisnik_id;
    this.listaGledanjaService.deleteAllListaGledanjaFilm(korisnik_id).subscribe({
      next: () => {
        this.listaGledanjaFilm = [];
      },
      error: (err) => console.error(err)
    });
  }
}
