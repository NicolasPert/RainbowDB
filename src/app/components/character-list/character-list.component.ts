import { Component, Input } from '@angular/core';
import { Character } from 'src/models/character';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent {
  @Input() character!: Character[];
}
