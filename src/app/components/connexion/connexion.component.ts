import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginUser } from 'src/models/loginUser';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  user: LoginUser = {
    username: '',
    password: '',
  };

  isFormValidate = false;
  connexionKO = false;

  constructor(private userService: UserService, private router: Router) {}

  connecter(connexionForm: NgForm) {
    this.isFormValidate = true;
      console.log(`le isFormValidate est à`,this.isFormValidate)
    if (connexionForm.valid) {
      this.userService.connexionUtilisateur(this.user).subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.accessToken);
          console.log('token', response.accessToken);
          // location.reload(); //recharge la page actuelle
          this.router.navigate(['../arc-en-ciel']);
        },
        error: (error) => {
          this.connexionKO = true;
        },
      });
    }
  }
}
