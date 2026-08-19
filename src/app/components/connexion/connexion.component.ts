import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginUser } from 'src/models/loginUser';
import { User } from 'src/models/user';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  user!: User;
  userForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  isFormValidate = false;
  connexionKO = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  login() {
    this.userService.isConnected$.next(true);
  }

  onSubmitForm() {
    this.isFormValidate = true;

    this.userService.connexionUtilisateur(this.userForm.value).subscribe({
      next: (response) => {
        // console.log('Réponse du backend:', response);
        sessionStorage.setItem('token', response.accessToken);

        this.userService.getUserBy().subscribe({
          next: (user) => {
            this.user = user;
            // console.log('ceci est mon id', this.user);
          },
          error: (error) => {
            console.error(
              'Erreur lors de la récupération de l’utilisateur',
              error,
            );
          },
        });

        this.router.navigate(['/arc-en-ciel']);
      },
      error: (error) => {
        this.connexionKO = true;
      },
    });
  }
}
