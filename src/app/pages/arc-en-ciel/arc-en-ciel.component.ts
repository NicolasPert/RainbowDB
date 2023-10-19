import { Component, Input } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { PictureService } from 'src/app/services/picture.service';
import { UniversService } from 'src/app/services/univers.service';
import { Character } from 'src/models/character';

import { Picture } from 'src/models/picture';
import { Univer } from 'src/models/univer';

@Component({
  selector: 'app-arc-en-ciel',
  templateUrl: './arc-en-ciel.component.html',
  styleUrls: ['./arc-en-ciel.component.css'],
})
export class ArcEnCielComponent {
  characterToDisplay: Character[] = [];
  pictureToDisplay: Picture[] = [];
  universToDisplay: string[] = [];
  imageToShow!: any;
  isImageLoading!: Boolean;
  univers!: string[];
  universChecked!: string[];
  userInput!: string;
  allCharacters!: Character[];

  constructor(
    private characterService: CharacterService,
    private universService: UniversService,
    // private userService: UserService,
    private pictureService: PictureService
  ) {}

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe((characters) => {
      // Récupération des personnages depuis le service
      this.characterToDisplay = characters;
      this.allCharacters = characters; // Crée une copie du tableau des personnages pour la comparaison.
    });

    this.universService.getUnivers().subscribe((univers) => {
      // Récupération des univers depuis le service
      // console.log("qu'est ce que c'est que ça : ", univers);
      // console.log("qu'est ce que c'est que ça : ", this.universToDisplay);
      for (let i = 0; i < univers.length; i++) {
        this.universToDisplay[i] = univers[i].name;
      }
      console.log(this.universToDisplay);
    });
  }


  aLecouteDeLenfant(categoryDeLenfant: string[]) {
    // Fonction appelée lorsqu'un utilisateur effectue une recherche.
    // console.log('categoryDeLenfant', categoryDeLenfant);
    this.universChecked = categoryDeLenfant;
    console.log('ici', this.universChecked);
    this.onUserInteractionFiltre();
  }

  onEnterSearch(resultUserSearch: string) {
    
    this.userInput = resultUserSearch;

    this.onUserInteractionFiltre();
  }

  onUserInteractionFiltre() {
    // Fonction pour filtrer les personnages en fonction des univers sélectionnés et de la recherche.
    this.characterToDisplay = [...this.allCharacters]; // Réinitialise les personnages affichés.

    if (this.universChecked) {
      // Si des univers sont sélectionnés...
      this.characterToDisplay = this.characterToDisplay.filter((perso) =>
        this.universChecked.includes(perso.belong[0].name)
      ); // ...filtre les personnages en fonction des univers sélectionnés.
    }
  }

  async createImageFromBlob(image: Blob) {
    // Fonction pour créer une image à partir d'un Blob.
    let reader = await new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    });
  }
  getImageFromService() {
    // Récupère une image depuis le service.
    this.isImageLoading = true;
    this.pictureService.getPicture().subscribe({
      next: (data: Blob) => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      error: (error) => {
        this.isImageLoading = false;
        console.log(error, `ceci est mon erreur `);
      },
    });
  }
}
