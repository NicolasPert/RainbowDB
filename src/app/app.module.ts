import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { ArcEnCielComponent } from './pages/page-arc-en-ciel/arc-en-ciel.component';
import { FootbarComponent } from './components/footbar/footbar.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { CardsComponent } from './components/cards/cards.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MentionLegalComponent } from './components/mention-legal/mention-legal.component';
import { EnregistrerComponent } from './components/enregistrer/enregistrer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdminComponent } from './pages/page-admin/admin.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AjouterComponent } from './components/ajouter-characters/ajouter-characters.component';
import { ModifierComponent } from './components/modifier-characters/modifier.component';
import { SuppressionCharactersComponent } from './components/suppression-characters/suppression-characters.component';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    PageHomeComponent,
    ArcEnCielComponent,
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
    SuppressionCharactersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
