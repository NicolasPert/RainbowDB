import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() user!: User;
  isAdmin: boolean = false;

  constructor(private userService: UserService,
    private route: Router) {}

  ngOnInit(): void {
    this.userService.isAdmin$.subscribe({
      next: (response) => {
        this.isAdmin = response;
      },
    });
  }
  deconnexion() {
    sessionStorage.clear();
    this.userService.isAdmin$.next(JSON.parse(sessionStorage.getItem('isAdmin')!));
    this.route.navigate(['/Connexion']);

  }
}

