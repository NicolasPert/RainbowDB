import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { ColorsService } from 'src/app/services/colors.service';
import { PictureService } from 'src/app/services/picture.service';
import { UniversService } from 'src/app/services/univers.service';
import { UserService } from 'src/app/services/user.service';
import { Character } from 'src/models/character';

import { Picture } from 'src/models/picture';
import { Univer } from 'src/models/univer';
import { User } from 'src/models/user';

@Component({
  selector: 'app-arc-en-ciel',
  templateUrl: './arc-en-ciel.component.html',
  styleUrls: ['./arc-en-ciel.component.css'],
})
export class ArcEnCielComponent {
  


  @Input() user!: User[];
  
  users!: User;
  characterToDisplay: Character[] = [];
  pictureToDisplay: Picture[] = [];
  universToDisplay: string[] = [];
  colorsToDisplay: string[] = [];
  imageToShow!: any;
  isImageLoading!: Boolean;
  univers!: string[];
  universChecked!: string[];
  userInput!: string;
  allCharacters!: Character[];
  colorsChecked!: string[];
  characters: Character[] = [];
  character!: Character;
  to_likes!: Character[];
  estFavoris: boolean = false;

  constructor(
    private characterService: CharacterService,
    private universService: UniversService,
    private userService: UserService,
    private pictureService: PictureService,
    private colorsService: ColorsService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.users = user;
      this.estFavoris = user.to_likes.includes(this.character);
      // initialiser ici la valeur de estFavoris
      // Si le personnage est trouvé dans le tableau de like du user => true sinon false
    });

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
      // console.log(this.universToDisplay);
    });

    this.colorsService.getColors().subscribe((colors) => {
      for (let i = 0; i < colors.length; i++) {
        this.colorsToDisplay[i] = colors[i].name;
      }
      // console.log(this.colorsToDisplay);
    });
  }

  aLecouteDeLenfant(categoryDeLenfant: string[]) {
    // Fonction appelée lorsqu'un utilisateur effectue une recherche.
    // console.log('categoryDeLenfant', categoryDeLenfant);
    this.universChecked = categoryDeLenfant;
    // console.log('ici', this.universChecked);
    this.onUserInteractionFiltre();
  }

  aLecouteDesCouleurs(categoryDeLaCouleur: string[]) {
    // Fonction appelée lorsqu'un utilisateur effectue une recherche.
    // console.log('categoryDeLenfant', categoryDeLenfant);
    this.colorsChecked = categoryDeLaCouleur;
    console.log('ici', this.colorsChecked);
    this.onUserInteractionFiltre();
  }

  onEnterSearch(resultUserSearch: string) {
    this.userInput = resultUserSearch;
    // console.log(this.userInput);
    this.characterToDisplay = this.allCharacters.filter((c) =>
      c.name.toLowerCase().includes(this.userInput.toLowerCase())
    );
    // console.log(this.characterToDisplay);
    this.onUserInteractionFiltre();
  }

  onUserInteractionFiltre() {
    // Fonction pour filtrer les personnages en fonction des univers sélectionnés et de la recherche.
    this.characterToDisplay = [...this.allCharacters]; // Réinitialise les personnages affichés.
    // console.log('avant filtre', this.characterToDisplay);

    if (this.universChecked) {
      // Si des univers sont sélectionnés...
      this.characterToDisplay = this.characterToDisplay.filter((perso) =>
        this.universChecked.includes(perso.belong[0].name)
      ); // ...filtre les personnages en fonction des univers sélectionnés.
      // console.log('après filtre 1', this.characterToDisplay);
    }
    if (this.colorsChecked) {
      this.characterToDisplay = this.characterToDisplay.filter((c) => {
        return this.colorsChecked.every((x) => {
          for (let i = 0; i < c.to_own.length; i++) {
            if (c.to_own[i].name.includes(x)) {
              return true;
            }
          }
          return false;
        });
      });
      // console.log('après filtre 2', this.characterToDisplay);
      // console.log('après filtre 2', this.colorsChecked);
    }

    if (this.userInput) {
      this.characterToDisplay = this.allCharacters.filter((c) =>
        c.name.toLowerCase().includes(this.userInput.toLowerCase())
      );
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
        // console.log(error, `ceci est mon erreur `);
      },
    });
  }

  // Méthode pour ajouter ou supprimer un character des favoris
  ajouterAuxFavoris(Char: Character) {
    // Assurez-vous d'avoir l'ID de l'utilisateur
    const characterId = Char.id;

    if (this.estFavoris) {
      // Le character est dans les favoris, supprimez-le
      (this.users.to_likes = this.users.to_likes.filter(
        (t) => t.id !== characterId
      )),
        this.userService.updateUser(this.users).subscribe(() => {
          // ici j'emets la reponse vers le composant character list
          
          this.estFavoris = false;
        });
      console.log(
        `là j'ai mon tableau de favoris si suppression `,
        this.users.to_likes
      );
    } else {
      // Le character n'est pas dans les favoris, ajoutez-le

      this.users.to_likes = [...this.users.to_likes, Char];
      console.log(
        `là j'ai mon tableau de favoris si ajout `,
        this.users.to_likes
      );

      this.userService.updateUser(this.users).subscribe(() => {
          

        // ici j'emets la reponse vers le composant character list
        this.estFavoris = true;
      });
      // console.log('ceci est mon user après la méthode', this.users);
    }
  }
}
