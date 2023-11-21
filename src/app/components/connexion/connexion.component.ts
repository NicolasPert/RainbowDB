import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginUser } from 'src/models/loginUser';
import { User } from 'src/models/user';

@Component({
  selector: 'app-connexion',
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

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.isConnected$.next(true);
  }

  onSubmitForm() {
    this.isFormValidate = true;

    this.userService.connexionUtilisateur(this.userForm.value).subscribe({
      next: (response) => {
        console.log('Réponse du backend:', response);
        sessionStorage.setItem('token', response.accessToken);

        this.userService.getUserBy();
        // console.log('ceci est mon id',this.user);

        this.router.navigate(['/arc-en-ciel']);
      },
      error: (error) => {
        this.connexionKO = true;
      },
    });
  }
}

