import { Component, Input } from '@angular/core';
import { PictureService } from 'src/app/services/picture.service';
import { Character } from 'src/models/character';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  @Input() character!: Character;
  currentImage!: Blob;
  characterImage!: any;

  constructor(private pictureService: PictureService) {}

  ngOnInit() {
    // Initialisation du composant

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

  createImageFromBlob(image: Blob) {
    // Fonction pour créer une image à partir d'un Blob.
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.characterImage = reader.result; // Affecte l'image créée à la propriété characterImage pour l'affichage.
    });
  }
}
