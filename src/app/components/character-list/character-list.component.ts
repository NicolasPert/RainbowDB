import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/models/character';
import { User } from 'src/models/user';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent {
  @Input() character!: Character[];
  characterFavoris!: User[];
  


  favoris(favorisCharacter: User[]) {

    this.characterFavoris = favorisCharacter;

  }


}
