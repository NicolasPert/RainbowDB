import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footbar.component.html',
  styleUrls: ['./footbar.component.css'],
})
export class FootbarComponent {}
