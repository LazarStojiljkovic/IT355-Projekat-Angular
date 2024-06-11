export interface Film {
    id: number;
    ime: string; 
    zanar: string;
    godinaObjavljivanja: number;
    trajanje: number;
    slika: string;
    direktor: Direktor
    glumci:Glumac[];
}
export interface Direktor {
    id: number;
    ime: string; 
    prezime: string;
    biografija: string;
    
}
export interface Glumac {
    id: number;
    ime: string; 
    prezime: string;
    biografija: string;
    
}
