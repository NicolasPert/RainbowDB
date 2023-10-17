import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { ArcEnCielComponent } from './pages/arc-en-ciel/arc-en-ciel.component';
import { ContactezNousComponent } from './pages/contactez-nous/contactez-nous.component';
import { FootbarComponent } from './components/footbar/footbar.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { CardsComponent } from './components/cards/cards.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MentionLegalComponent } from './components/mention-legal/mention-legal.component';
import { EnregistrerComponent } from './components/enregistrer/enregistrer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdminComponent } from './pages/admin/admin.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AjouterComponent } from './components/ajouter-characters/ajouter-characters.component';
import { ModifierComponent } from './components/modifier/modifier.component';
import { CharacterListComponent } from './components/character-list/character-list.component';

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
    SearchBarComponent,
    MentionLegalComponent,
    EnregistrerComponent,
    AdminComponent,
    AjouterComponent,
    ModifierComponent,
    CardsComponent,
    CharacterListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
