// Importation des modules nécessaires depuis Angular et d'autres modules personnalisés
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character.service';
import { ColorsService } from 'src/app/services/colors.service';
import { MoviesService } from 'src/app/services/movies.service';
import { PictureService } from 'src/app/services/picture.service';
import { UniversService } from 'src/app/services/univers.service';
import { CreateCharacter } from 'src/models/createCharacter';
import { Character } from 'src/models/character';
import { Color } from 'src/models/color';
import { Picture } from 'src/models/picture';
import { Univer } from 'src/models/univer';

// Définition du composant Angular
@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter-characters.component.html',
  styleUrls: ['./ajouter-characters.component.css'],
})
export class AjouterComponent {
  // Déclaration de variables
  myFile!: File;
  id_file!: number;
  id_Movie!: number;
  character!: Character[];
  colorsAvailable: Color[] = [];
  universAvailable: Univer[] = [];

  // Définition du formulaire avec les champs requis
  addCharacter: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    movie: new FormControl('', Validators.required),
    univers: new FormControl([]),
    id_pictures: new FormControl(''),
    color: new FormControl([]),
  });

  // Constructeur du composant avec injection de dépendances
  constructor(
    private characterService: CharacterService,
    private pictureService: PictureService,
    private router: Router,
    private colorsService: ColorsService,
    private moviesService: MoviesService,
    private universService: UniversService
  ) {}

  // Fonction exécutée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupération des personnages depuis le service
    this.characterService.getCharacters().subscribe({
      next: (response: Character[]) => {
        this.character = [...response];
      },
    });

    // Récupération des couleurs depuis le service
    this.colorsService.getColors().subscribe((colors: Color[]) => {
      this.colorsAvailable = colors;
    });

    // Récupération des univers depuis le service
    this.universService.getUnivers().subscribe((univers: Univer[]) => {
      this.universAvailable = univers;
    });
  }

  // Fonction appelée lors de la soumission du formulaire
  onSubmit() {
    // Création d'un objet "movie" à partir de la valeur du champ "movie" dans le formulaire
    let movie = {
      name: this.addCharacter.get('movie')?.value,
    };

    // Appel du service pour créer un nouveau film
    this.moviesService.createMovies(movie).subscribe({
      next: (response) => {
        this.id_Movie = response.id!;
        // console.log(this.id_Movie);
        this.createCharacter(); // Appel de la fonction pour créer un personnage après la création du film
      },
    });
  }

  // Fonction pour créer un personnage
  createCharacter() {
    // Récupération des valeurs des champs "univers" et "color" du formulaire
    const universOriginal = this.addCharacter.get('univers')?.value;
    const universTransformé = universOriginal.map((id: number) => ({ id }));

    const colorsOriginal = this.addCharacter.get('color')?.value;
    const colorsTransformé = colorsOriginal
      .filter((id: number) => typeof id === 'number')
      .map((id: number) => ({ id }));

    // Création de l'objet "newCharacter" à partir des valeurs du formulaire
    const newCharacter: CreateCharacter = {
      name: this.addCharacter.get('name')?.value,
      to_in: [{ id: this.id_Movie }],
      belong: universTransformé,
      to_own: colorsTransformé,
      picture: { id: this.id_file },
    };

    // Appel du service pour créer un nouveau personnage
    this.characterService
      .createCharacter(newCharacter)
      .subscribe((response: Character) => {
        this.router.navigate(['/arc-en-ciel']); // Redirection vers une page après la création du personnage
      });
  }

  // Fonction appelée lorsqu'un fichier est sélectionné
  onChange(e: any) {
    // Récupération du fichier sélectionné
    this.myFile = e.target.files[0];

    // Envoi du fichier au service pour le stocker
    if (this.myFile) {
      const formData = new FormData();
      formData.append('monFichier', this.myFile);

      this.pictureService
        .postPicture(formData)
        .subscribe((photo: Partial<Picture>) => {
          this.id_file = photo.id!;
        });
    }
  }
}
