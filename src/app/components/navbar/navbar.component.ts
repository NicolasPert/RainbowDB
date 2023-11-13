import { Component, Input } from '@angular/core';
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.userService.getUser().subscribe({
      next: (response) => {
        this.user = response;
        this.isAdmin = this.user.admin;

        const isAdmin = sessionStorage.getItem('isAdmin');
        this.isAdmin = isAdmin ? isAdmin === 'true' : false;
        
      },
      error: (error) => {
        this.isAdmin = true; 
      },
    });
}}
