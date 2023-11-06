import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { ArcEnCielComponent } from './pages/page-arc-en-ciel/arc-en-ciel.component';
import { ContactezNousComponent } from './pages/contactez-nous/contactez-nous.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { EnregistrerComponent } from './components/enregistrer/enregistrer.component';
import { AjouterComponent } from './components/ajouter-characters/ajouter-characters.component';
import { SuppressionCharactersComponent } from './components/suppression-characters/suppression-characters.component';
import { ModifierComponent } from './components/modifier-characters/modifier.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageHomeComponent },
  { path: 'arc-en-ciel', component: ArcEnCielComponent },
  { path: 'page-admin/ajouter-characters', component: AjouterComponent },
  { path: 'page-admin/modifier-characters/:id', component: ModifierComponent },
  {
    path: 'page-admin/suppression-characters/:id',
    component: SuppressionCharactersComponent,
  },
  { path: 'contactez-nous', component: ContactezNousComponent },
  { path: 'Inscrire', component: EnregistrerComponent },
  { path: 'connect', component: ConnexionComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
