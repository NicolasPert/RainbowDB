import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { ArcEnCielComponent } from './pages/arc-en-ciel/arc-en-ciel.component';
import { ContactezNousComponent } from './pages/contactez-nous/contactez-nous.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { EnregistrerComponent } from './components/enregistrer/enregistrer.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageHomeComponent },
  { path: 'arc-en-ciel', component: ArcEnCielComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'Contactez-nous', component: ContactezNousComponent },
  { path: 'Inscrire', component: EnregistrerComponent },
  { path: 'connect', component: ConnexionComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
