import { Component } from '@angular/core';
import { User } from 'src/models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user!: User;
  admin: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.user = response;
        this.admin = this.user.admin;

        const isAdmin = sessionStorage.getItem('isAdmin');
        this.admin = isAdmin ? isAdmin === 'true' : false;
        
      },
      error: (error) => {
        this.admin = true; 
      },
    });
  }
  }


