import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { ArcEnCielComponent } from './pages/arc-en-ciel/arc-en-ciel.component';
import { ContactezNousComponent } from './pages/contactez-nous/contactez-nous.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: "home", component: PageHomeComponent},
  { path: "arc-en-ciel", component: ArcEnCielComponent },
  { path: 'Contactez-nous', component: ContactezNousComponent },
  { path: 'Connexion', component: ConnexionComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
