import { Component, Input } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { UserService } from 'src/app/services/user.service';
import { Character } from 'src/models/character';
import { User } from 'src/models/user';

@Component({
  selector: 'app-arc-en-ciel',
  templateUrl: './arc-en-ciel.component.html',
  styleUrls: ['./arc-en-ciel.component.css'],
})
export class ArcEnCielComponent {
 
  characterToDisplay: Character[] = [];

  constructor(private characterService: CharacterService, private userService: UserService) {}

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe((characters) => {
      this.characterToDisplay = characters;
      console.log(this.characterToDisplay);
    });
  }
}
