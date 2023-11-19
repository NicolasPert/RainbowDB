import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PictureService } from 'src/app/services/picture.service';
import { Character } from 'src/models/character';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user';
import { UserService } from 'src/app/services/user.service';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  estFavoris: boolean = false;
  @Input() favoris!: Number;
  @Input() character!: Character;
  @Input() user!: User;
  currentImage!: Blob;
  characterImage!: any;
  isAdmin: boolean = false;
  monFavoris!: Character;
  tabFav!: Character[];
  @Input() like!: boolean;
  @Output() clickFav = new EventEmitter<{
    character: Character;
    isFavoris: boolean;
  }>();
  connected: boolean = false;

  constructor(
    private pictureService: PictureService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // console.log('mon user from card', this.user);
    // console.log('mon character dans cards ', this.character);

    this.userService.isAdmin$.subscribe({
      next: (response) => {
        this.isAdmin = response;
      },
    });

    this.affichage(this.connected);
    // console.log('mon etat affichage', this.connected);

    const CharacterIdPicture = Number(this.character.picture.id);

    this.pictureService.getPictureById(CharacterIdPicture).subscribe({
      next: (data: Blob) => {
        // Lorsque l'image est récupérée avec succès depuis le service...
        this.currentImage = data;
        this.createImageFromBlob(this.currentImage); // ...crée une image à partir du Blob.
      },
      error: (error) => {
        // En cas d'erreur lors de la récupération de l'image...
        console.error("Une erreur s'est produite : ", error);
      },
    });
  }

  affichage(on: boolean) {
    this.connected = on;
    if (this.user) {
      this.connected = true;
    } else {
      this.connected = false;
    }
  }

  envoieFav(favTab: Character) {
    this.clickFav.emit({ character: favTab, isFavoris: !this.like });
  }

  createImageFromBlob(image: Blob) {
    // Fonction pour créer une image à partir d'un Blob.
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.characterImage = reader.result; // Affecte l'image créée à la propriété characterImage pour l'affichage.
    });
  }
}
