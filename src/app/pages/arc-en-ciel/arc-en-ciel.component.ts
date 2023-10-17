import { Component, Input } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { PictureService } from 'src/app/services/picture.service';
import { UserService } from 'src/app/services/user.service';
import { Character } from 'src/models/character';

import { Picture } from 'src/models/picture';

@Component({
  selector: 'app-arc-en-ciel',
  templateUrl: './arc-en-ciel.component.html',
  styleUrls: ['./arc-en-ciel.component.css'],
})
export class ArcEnCielComponent {
  characterToDisplay: Character[] = [];
  pictureToDispaly: Picture[] = [];
  imageToShow!: any;
  isImageLoading!: Boolean;

  constructor(
    private characterService: CharacterService,
    private userService: UserService,
    private pictureService: PictureService
  ) {}

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe((characters) => {
      this.characterToDisplay = characters;
      // console.log(this.characterToDisplay);
    });
  }

  async createImageFromBlob(image: Blob) {
    let reader = await new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    });
  }
  getImageFromService() {
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
