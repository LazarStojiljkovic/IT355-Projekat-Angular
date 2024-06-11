import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminFilmComponent } from './components/admin-film/admin-film.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { FilmDetaljnoComponent } from './components/film-detaljno/film-detaljno.component';
import { MeniComponent } from './components/meni/meni.component';
import { AdminKorisnikComponent } from './components/admin-korisnik/admin-korisnik.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AdminGlumacComponent } from './components/admin-glumac/admin-glumac.component';
import { ListaGledanjaComponent } from './components/lista-gledanja/lista-gledanja.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistracijaComponent,
    AdminFilmComponent,
    PocetnaComponent,
    FilmDetaljnoComponent,
    MeniComponent,
    AdminKorisnikComponent,
    ProfilComponent,
    AdminGlumacComponent,
    ListaGledanjaComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
