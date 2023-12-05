import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  user!: User[];
  userPourMaFilterBar!: User;
  users!: User;
  characterToDisplay: Character[] = [];
  pictureToDisplay: Picture[] = [];
  universToDisplay: string[] = [];
  colorsToDisplay: string[] = [];
  imageToShow!: any;
  isImageLoading!: Boolean;
  univers!: string[];
  universChecked!: string[];
  favorisChecked!: string[];
  userInput!: string;
  allCharacters!: Character[];
  colorsChecked!: string[];
  characters: Character[] = [];
  character!: Character;
  perso!: string[];
  to_likes!: Character[];
  estFavoris!: boolean;
  favoriteOfNotFavorite: boolean = false;


  constructor(
    private characterService: CharacterService,
    private universService: UniversService,
    private userService: UserService,
    private pictureService: PictureService,
    private colorsService: ColorsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // console.log('mon user est-il là ?', this.userPourMaFilterBar);
    // console.log('commentaire', this.userService.isLoggedIn());
    if (this.userService.isLoggedIn()) {
      this.userService.getUser().subscribe((user) => {
        this.users = user;
        this.characterService.getCharacters().subscribe((characters) => {
          // Récupération des personnages depuis le service
          this.characterToDisplay = characters;
          this.allCharacters = characters;
          this.character = characters[0];
          // Crée une copie du tableau des personnages pour la comparaison.
          // initialiser ici la valeur de estFavoris
          // Si le personnage est trouvé dans le tableau de like du user => true sinon false
        });
      });
    } else {
      this.characterService.getCharacters().subscribe((characters) => {
        // Récupération des personnages depuis le service
        this.characterToDisplay = characters;
        this.allCharacters = characters;
        // Crée une copie du tableau des personnages pour la comparaison.
        // initialiser ici la valeur de estFavoris
        // console.log('mes characters', characters);
        // console.log('mes perso', this.allCharacters);
      });
    }

    this.universService.getUnivers().subscribe((univers) => {
      // console.log('univers : ', univers);
      // Récupération des univers depuis le service
      for (let i = 0; i < univers.length; i++) {
        this.universToDisplay[i] = univers[i].name;
      }
      // console.log(this.universToDisplay);
    });

    this.colorsService.getColors().subscribe((colors) => {
      for (let i = 0; i < colors.length; i++) {
        this.colorsToDisplay[i] = colors[i].name;
      }
    });
  }

  estFavori(character: Character) {
    if (this.users) {
      return this.users.to_likes.map((x) => x.id).includes(character.id);
    } else {
      return false;
    }
  }

  aLecouteDesFavoris(categorieDesFavoris: string[]) {
    this.favoriteOfNotFavorite = !this.favoriteOfNotFavorite;
    // console.log('Est-ce que ça marche ? ' , this.favoriteOfNotFavorite);

    // Appelle la fonction de filtrage
    this.onUserInteractionFiltre();

    // Afficher les favoris dans la console
    // console.log('mes favoris:', categorieDesFavoris);
  }

  aLecouteDeLenfant(categoryDeLenfant: string[]) {
    // Fonction appelée lorsqu'un utilisateur effectue une recherche.

    this.universChecked = categoryDeLenfant;
    // console.log('ici mon cochage',this.universChecked);
    // console.log('ici ma cat coché',categoryDeLenfant);

    this.onUserInteractionFiltre();
  }

  aLecouteDesCouleurs(categoryDeLaCouleur: string[]) {
    // Fonction appelée lorsqu'un utilisateur effectue une recherche.

    this.colorsChecked = categoryDeLaCouleur;
    // console.log('ici', this.colorsChecked);
    this.onUserInteractionFiltre();
  }

  onEnterSearch(resultUserSearch: string) {
    this.userInput = resultUserSearch;

    this.characterToDisplay = this.allCharacters.filter((c) =>
      c.name.toLowerCase().includes(this.userInput.toLowerCase())
    );

    this.onUserInteractionFiltre();
  }

  onUserInteractionFiltre() {
    // console.log('les All Characters what is that ???:', this.allCharacters);
    // Fonction pour filtrer les personnages en fonction des univers sélectionnés et de la recherche.
    this.characterToDisplay = [...this.allCharacters]; // Réinitialise les personnages affichés.

    if (this.users) {
      const favorisIds = this.users.to_likes.map((x) => x.id);

      if (this.favoriteOfNotFavorite) {
        this.characterToDisplay = this.characterToDisplay.filter((character) =>
          favorisIds.includes(character.id)
        );
      }
      if (this.universChecked) {
        // Si des univers sont sélectionnés...
        // console.log('CharacterToDisplay avant :', this.characterToDisplay);
        this.characterToDisplay = this.characterToDisplay.filter((perso) => {
          for (let j = 0; j < perso.belong.length; j++) {
            //  console.log('Belong:', perso.belong[j]); // Vérifiez la structure de belong
            //  console.log('Univers Checked:', this.universChecked);
            if (this.universChecked.includes(perso.belong[j].name)) {
              // console.log('Included:', perso.belong[j].name);
              return true;
            }
          }
          return false;
        }); // ...filtre les personnages en fonction des univers sélectionnés.
        // console.log('CharacterToDisplay après :', this.characterToDisplay);
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
      }

      if (this.userInput) {
        this.characterToDisplay = this.characterToDisplay.filter((c) =>
          c.name.toLowerCase().includes(this.userInput.toLowerCase())
        );
      }
      // console.log('mes perso triés : ', this.characterToDisplay);
    } else {
      if (this.universChecked) {
        // Si des univers sont sélectionnés...
        // console.log('CharacterToDisplay avant :', this.characterToDisplay);
        this.characterToDisplay = this.characterToDisplay.filter((perso) => {
          for (let j = 0; j < perso.belong.length; j++) {
            //  console.log('Belong:', perso.belong[j]); // Vérifiez la structure de belong
            //  console.log('Univers Checked:', this.universChecked);
            if (this.universChecked.includes(perso.belong[j].name)) {
              // console.log('Included:', perso.belong[j].name);
              return true;
            }
          }
          return false;
        }); // ...filtre les personnages en fonction des univers sélectionnés.
        // console.log('CharacterToDisplay après :', this.characterToDisplay);
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
      }

      if (this.userInput) {
        this.characterToDisplay = this.characterToDisplay.filter((c) =>
          c.name.toLowerCase().includes(this.userInput.toLowerCase())
        );
      }
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
        // On a recuperé les infos de notre image.
      },
    });
  }

  // Méthode pour ajouter ou supprimer un character des favoris
  ajouterAuxFavoris(objetRecu: { character: Character; isFavoris: boolean }) {
    // On s'assurre d'avoir l'ID de l'utilisateur
    const characterId = objetRecu.character.id;

    // Début de notre méthode, si :
    if (!objetRecu.isFavoris) {
      // Le character est dans les favoris, supprimez-le
      (this.users.to_likes = this.users.to_likes.filter(
        (t) => t.id !== characterId
      )),
        this.userService.updateUser(this.users).subscribe(() => {
          this.users = { ...this.users };
          // Avec l'argument, on envoie donc False
        });
    } else {
      // Le character n'est pas dans les favoris, on l'ajoute
      this.users.to_likes = [...this.users.to_likes, objetRecu.character];

      this.userService.updateUser(this.users).subscribe(() => {
        // ici j'emets la reponse vers le composant character list
        this.users = { ...this.users };
        // Conditions contraire de l'argument en revoie donc True
      });
    }
  }
}


