import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PictureService } from 'src/app/services/picture.service';
import { Character } from 'src/models/character';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent  {
  @Input() favoris!: Number;
  @Input() character!: Character;
  @Input() user!: User;
  currentImage!: Blob;
  characterImage!: any;
  isAdmin: boolean = false;
  // to_likes!: Character[];
  estFavoris: boolean = false;
  // isLikes: boolean = false;
  

  constructor(
    private pictureService: PictureService,
    private userService: UserService
  ) {}

  ngOnInit() {


    this.userService.isAdmin$.subscribe({
      next: (response) => {
        this.isAdmin = response;
      },
    });

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

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('Les changement dans la carte : ', changes);
  // }

  createImageFromBlob(image: Blob) {
    // Fonction pour créer une image à partir d'un Blob.
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.characterImage = reader.result; // Affecte l'image créée à la propriété characterImage pour l'affichage.
    });
  }

}
