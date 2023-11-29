// Importation des modules nécessaires depuis Angular
import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Définition du composant Angular
@Component({
  selector: 'app-enregistrer',
  templateUrl: './enregistrer.component.html',
  styleUrls: ['./enregistrer.component.css'],
})
export class EnregistrerComponent {
  // Déclaration et initialisation d'un objet utilisateur
  user: User = {
    username: '',
    email: '',
    password: '',
    password_validate: '',
    admin: false,
    to_likes: [],
  };

  // Variables pour gérer les erreurs de confirmation de mot de passe et l'état de l'inscription
  confirmMdpError = false;
  inscriptionOK = true;
  isFormSubmit = false;

  // Constructeur du composant avec injection de dépendances
  constructor(private userService: UserService, private router: Router) {}

  // Méthode appelée lors de la soumission du formulaire d'inscription
  inscrire(inscriptionForm: NgForm) {
    this.isFormSubmit = true;

    // Vérification si les mots de passe correspondent
    this.confirmMdpError = this.user.password !== this.user.password_validate;

    // Vérification de la validité du formulaire et de l'absence d'erreur de confirmation de mot de passe
    if (inscriptionForm.valid && !this.confirmMdpError) {
      // Si tous les champs sont valides, envoi de la demande d'inscription au service utilisateur
      this.userService.inscriptionUtilisateur(this.user).subscribe({
        next: (response) => {
          // Redirection vers la page de connexion après une inscription réussie
          this.router.navigate(['../Connexion']);
        },
        error: (error) => {
          // Gestion des erreurs lors de l'inscription
          this.inscriptionOK = false;
        },
      });
    }
  }
}
