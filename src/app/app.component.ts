import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from './services/user.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FootbarComponent } from './components/footbar/footbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FootbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user!: User;
  admin: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
