import { ListaGledanja } from "./listaGledanjaFilm.model";

export interface Korisnik {
    id: number;
    ime: string; 
    email: string;
    sifra: string;
    admin: number;
}
