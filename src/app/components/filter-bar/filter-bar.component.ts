import { Component } from '@angular/core';
import { PictureService } from 'src/app/services/picture.service';
import { Picture } from 'src/models/picture';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
   myFile!: File;

   constructor(
    private pictureService: PictureService,
   ) {}

    onChange(e: any) {
    console.log(e.target.files);
    this.myFile = e.target.files[0];
    if (this.myFile) {
      const formData = new FormData();
      formData.append('monFichier', this.myFile);
      
      this.pictureService.postPicture(formData).subscribe((photo: Partial<Picture>) => {

        
        alert('image postée');
      });
    }

}}
