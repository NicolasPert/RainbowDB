// Import necessary modules from Angular
import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Definition of the Angular component
@Component({
  selector: 'app-enregistrer',
  templateUrl: './enregistrer.component.html',
  styleUrls: ['./enregistrer.component.css'],
})
export class EnregistrerComponent {
  // Declaration and initialization of a user object
  user: User = {
    username: '',
    email: '',
    password: '',
    password_validate: '',
    admin: false,
    to_likes: [],
  };

  // Variables to manage password confirmation errors and registration status
  confirmMdpError = false;
  inscriptionOK = true;
  isFormSubmit = false;

  // Component constructor with dependency injection
  constructor(private userService: UserService, private router: Router) {}

  // Method called when the registration form is submitted
  inscrire(inscriptionForm: NgForm) {
    this.isFormSubmit = true;

    // Check if passwords match
    this.confirmMdpError = this.user.password !== this.user.password_validate;

    // Check the validity of the form and absence of password confirmation error
    if (inscriptionForm.valid && !this.confirmMdpError) {
      // If all fields are valid, send the registration request to the user service
      this.userService.inscriptionUtilisateur(this.user).subscribe({
        next: (response) => {
          // Redirect to the login page after successful registration
          this.router.navigate(['../Connexion']);
        },
        error: (error) => {
          // Handle errors during registration
          this.inscriptionOK = false;
        },
      });
    }
  }
}
