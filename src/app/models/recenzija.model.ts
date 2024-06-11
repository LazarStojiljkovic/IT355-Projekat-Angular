import { Film } from './film.model';
import { Korisnik } from './korisnik.model';

export interface Recenzija {
  id: number;
  tekst: string;
  ocena: number;
  film: Film;
  korisnik: Korisnik;
}