import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { AdminFilmComponent } from './components/admin-film/admin-film.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { FilmDetaljnoComponent } from './components/film-detaljno/film-detaljno.component';
import { AdminKorisnikComponent } from './components/admin-korisnik/admin-korisnik.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AdminGlumacComponent } from './components/admin-glumac/admin-glumac.component';
import { ListaGledanjaComponent } from './components/lista-gledanja/lista-gledanja.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'registracija', component: RegistracijaComponent },
  {path: 'admin-film', component: AdminFilmComponent},
  {path: 'pocetna', component: PocetnaComponent },
  {path: 'film/:id', component: FilmDetaljnoComponent },
  {path: 'admin-korisnik', component: AdminKorisnikComponent },
  {path: 'profil', component: ProfilComponent },
  {path: 'admin-glumac', component: AdminGlumacComponent },
  {path: 'lista-gledanja', component: ListaGledanjaComponent },


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
}
)
export class AppRoutingModule { }
