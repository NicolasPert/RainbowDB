import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-enregistrer',
  templateUrl: './enregistrer.component.html',
  styleUrls: ['./enregistrer.component.css'],
})
export class EnregistrerComponent {
  user: User = {
    username: '',
    email: '',
    password: '',
    password_validate: '',
    admin: false,
    to_likes: [],
  };

  confirmMdpError = false;
  inscriptionOK = true;
  isFormSubmit = false;

  constructor(private userService: UserService, private router: Router) {}

  inscrire(inscriptionForm: NgForm) {
    this.isFormSubmit = true;

    // Verifier si les mots de passe correspondent
    this.confirmMdpError = this.user.password !== this.user.password_validate;

    if (inscriptionForm.valid && !this.confirmMdpError) {
      // Si tous les champs sont valides, alors continuez avec l'inscription.
      this.userService.inscriptionUtilisateur(this.user).subscribe({
        next: (response) => {
          this.router.navigate(['../connect']);
        },
        error: (error) => {
          this.inscriptionOK = false;
        },
      });
    }
  }
}
