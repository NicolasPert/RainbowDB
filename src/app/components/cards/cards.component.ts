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
  // @Input() picture!: Picture;
  currentImage!: Blob;
  characterImage!: any;

  constructor(private pictureService: PictureService) {}

  ngOnInit() {
    const CharacterIdPicture = this.character.id_pictures;
    // console.log("1",CharacterIdPicture);
    this.pictureService.getPictureById(CharacterIdPicture).subscribe({
      next: (data: Blob) => {
        // console.log("retour",data)
        this.currentImage = data;
        this.createImageFromBlob(this.currentImage);
        // console.log(this.currentImage);
      },
        error: (error) => {
    console.error("Une erreur s'est produite mon grand : ", error);
  },
  
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.characterImage = reader.result;
    });
  }
}
