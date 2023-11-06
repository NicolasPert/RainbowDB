import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
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
  userForm: FormGroup = new FormGroup({
    nom: new FormControl(''),
    password: new FormControl(''),
  });
  isFormValidate = false;
  connexionKO = false;

  constructor(private userService: UserService,
    private router: Router) {}

  onSubmitForm() {
    this.isFormValidate = true;

    if (this.userForm.value) {
      this.userService
        .connexionUtilisateur(this.userForm.value)
        .subscribe({
          next: (response) => {
            sessionStorage.setItem('token', response.accessToken);
            //  this.router.navigate(['/arc-en-ciel']);
          },
          error: (error) => {
            this.connexionKO = true;
          },
        });
    }
  }

}

