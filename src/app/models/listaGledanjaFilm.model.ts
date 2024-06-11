import { Film } from './film.model';
import { Korisnik } from './korisnik.model';

export interface ListaGledanjaFilm {
  id: number;
  listaGledanja: ListaGledanja;
  film: Film;
  datumDodavanja: Date;
}

export interface ListaGledanja {
  id: number;
  korisnik: Korisnik;
}
