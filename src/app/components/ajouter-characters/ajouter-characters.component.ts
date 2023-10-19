import { Component } from '@angular/core';
import { PictureService } from 'src/app/services/picture.service';
import { Picture } from 'src/models/picture';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter-characters.component.html',
  styleUrls: ['./ajouter-characters.component.css'],
})
export class AjouterComponent {
  myFile!: File;

  constructor(private pictureService: PictureService) {}

  onChange(e: any) {
    console.log(e.target.files);
    this.myFile = e.target.files[0];
    if (this.myFile) {
      const formData = new FormData();
      formData.append('monFichier', this.myFile);

      this.pictureService
        .postPicture(formData)
        .subscribe((photo: Partial<Picture>) => {
          alert('image postée');
        });
    }
  }
}
