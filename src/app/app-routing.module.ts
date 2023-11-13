import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { ArcEnCielComponent } from './pages/page-arc-en-ciel/arc-en-ciel.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { EnregistrerComponent } from './components/enregistrer/enregistrer.component';
import { AjouterComponent } from './components/ajouter-characters/ajouter-characters.component';
import { SuppressionCharactersComponent } from './components/suppression-characters/suppression-characters.component';
import { ModifierComponent } from './components/modifier-characters/modifier.component';
import { MentionLegalComponent } from './components/mention-legal/mention-legal.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageHomeComponent },
  { path: 'arc-en-ciel', component: ArcEnCielComponent },
  { path: 'page-admin/ajouter-characters', component: AjouterComponent },
  { path: 'page-admin/modifier-characters/:id', component: ModifierComponent },
  { path: 'mentions-legales', component: MentionLegalComponent},
  {
    path: 'page-admin/suppression-characters/:id',
    component: SuppressionCharactersComponent,
  },
  { path: 'Inscrire', component: EnregistrerComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
