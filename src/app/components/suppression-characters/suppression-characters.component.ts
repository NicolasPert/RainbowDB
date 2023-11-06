import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character.service';
import { Character } from 'src/models/character';
import { User } from 'src/models/user';

@Component({
  selector: 'app-suppression-characters',
  templateUrl: './suppression-characters.component.html',
  styleUrls: ['./suppression-characters.component.css'],
})
export class SuppressionCharactersComponent {
 utilisateur!: User;
  character: Character = {
    id: 1,
    name: '',
    id_pictures: 1,
    to_in: [],
    belong: [],
    to_own: [],
  };

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap;
    const productsIdFromRoute = Number(routeParam.get('id'));

    this.characterService
      .getCharacterById(productsIdFromRoute)
      .subscribe((char) => {
        this.character = char;
      });
  }

  deleteCharacter(id: Character) {
    this.characterService.deleteCharacter(id).subscribe((response) => {
      next : response;
      this.router.navigate(['ar-en-ciel']);
      // console.log('le produit a bien été supprimé.' + response);
    });
  }
}
