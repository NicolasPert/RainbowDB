import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { ArcEnCielComponent } from './pages/arc-en-ciel/arc-en-ciel.component';
import { ContactezNousComponent } from './pages/contactez-nous/contactez-nous.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { FootbarComponent } from './components/footbar/footbar.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { CouleurListComponent } from './components/couleur-list/couleur-list.component';
import { CardsComponent } from './components/cards/cards.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    PageHomeComponent,
    ArcEnCielComponent,
    ContactezNousComponent,
    ConnexionComponent,
    FootbarComponent,
    FilterBarComponent,
    CouleurListComponent,
    CardsComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
