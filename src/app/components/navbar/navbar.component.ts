import { Component, Input, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() user!: User;
  isAdmin: boolean = false;
  connected: boolean = false;
  private destroyRef = inject(DestroyRef);

  constructor(
    private userService: UserService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.userService.isAdmin$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.isAdmin = response;
        },
      });
    this.userService.isConnected$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resp) => {
        this.connected = resp;
        // console.log('connected', this.connected);
      });
  }
  deconnexion() {
    sessionStorage.clear();
    this.userService.isAdmin$.next(
      JSON.parse(sessionStorage.getItem('isAdmin')!),
    );
    this.userService.isConnected$.next(false);
    this.route.navigate(['/Connexion']);
  }
}
