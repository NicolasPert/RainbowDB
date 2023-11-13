import { Component, Input } from '@angular/core';
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
export class CardsComponent {
  @Input() character!: Character;
  @Input() user!: User;
  currentImage!: Blob;
  characterImage!: any;
  admin: boolean = false;
  to_likes!: Character[];
  estFavoris: boolean = false;

  constructor(
    private pictureService: PictureService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('id');
    if (userId) {
      this.userService.getUser().subscribe((user: User) => {
        this.admin = user.admin;
        this.to_likes = user.to_likes;
        console.log('mon admin',this.admin);
        
      });
    }
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

  ajoutFavoris() {
    const characterId = this.character.id;

     if (this.estFavoris) {
       // Le tableau est dans les favoris, supprimez-le
       (this.user.to_likes =
         this.user.to_likes.filter((t) => t.id !== characterId)),
         this.userService
           .updateUser(this.user)
           .subscribe(() => {
             this.estFavoris = false;
           });
     } else {
       // Le tableau n'est pas dans les favoris, ajoutez-le
       this.user.to_likes = [
         ...this.user.to_likes,
         this.character,
       ];

       this.userService
         .updateUser(this.user)
         .subscribe(() => {
           this.estFavoris = true;
         });
     }
  }
}
