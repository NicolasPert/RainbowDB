import { Component } from '@angular/core';
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
// import { ColorsService } from 'src/app/services/colors.service';
import { PictureService } from 'src/app/services/picture.service';
import { UniversService } from 'src/app/services/univers.service';
import { CreateCharacter } from 'src/models/createCharacter';
// import { UniversService } from 'src/app/services/univers.service';
import { Character } from 'src/models/character';
import { Color } from 'src/models/color';
// import { Movie } from 'src/models/movie';
import { Picture } from 'src/models/picture';
import { Univer } from 'src/models/univer';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter-characters.component.html',
  styleUrls: ['./ajouter-characters.component.css'],
})
export class AjouterComponent {
  myFile!: File;
  id_file!: number;
  id_Movie!: number;
  character!: Character[];
  colorsAvailable: Color[] = [];
  universAvailable: Univer[] = [];
  addCharacter: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    movie: new FormControl('', Validators.required),
    univers: new FormControl([]),
    id_pictures: new FormControl(''),
    color: new FormControl([]),
  });

  constructor(
    private characterService: CharacterService,
    private pictureService: PictureService,
    private router: Router,
    private colorsService: ColorsService,
    private moviesService: MoviesService,
    private universService: UniversService
  ) {}

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe({
      next: (response: Character[]) => {
        this.character = [...response];
        // console.log('ceci est mon character', this.character);
      },
    });

    this.colorsService.getColors().subscribe((colors: Color[]) => {
      this.colorsAvailable = colors;
      // console.log('ceci sont mes couleur', this.colorsAvailable);
    });

    this.universService.getUnivers().subscribe((univers: Univer[]) => {
      this.universAvailable = univers;
      // console.log('ceci est mon univers', this.universAvailable);
    });
  }

  onSubmit() {
    let movie = {
      name: this.addCharacter.get('movie')?.value,
    };

    console.log('mes univers', this.addCharacter.get('univers')?.value);
    console.log('mes colors', this.addCharacter.get('color')?.value);

    this.moviesService.createMovies(movie).subscribe({
      next: (response) => {
        this.id_Movie = response.id!;
        console.log(this.id_Movie);
        this.createCharacter();
      },
    });
  }

  createCharacter() {
    /**
     * Si dans univers j'ai [1] => belong: [{id: 1}]
     * Si dans univers j'ai [1, 2] => belong: [{id: 1},{id: 2} ]
     * Même chose pour color
     */
    // Supposons que votre formulaire s'appelle userForm
    // const universTransformé = this.addCharacter.get('univers')?.value;
    // const universTransformé = this.addCharacter
    //   .get('univers')
    //   ?.value.map((univers: any) => univers.id);

    const universOriginal = this.addCharacter.get('univers')?.value;
    const universTransformé = universOriginal.map((id: number) => ({ id }));

    const colorsOriginal = this.addCharacter.get('color')?.value;

    const colorsTransformé = colorsOriginal
      .filter((id: number) => typeof id === 'number')
      .map((id: number) => ({ id }));
    console.log('les couleurs transformées', colorsTransformé);

    /**
     * Puis transférer ici une fois que toute est bon
     */
    const newCharacter: CreateCharacter = {
      name: this.addCharacter.get('name')?.value,
      to_in: [{ id: this.id_Movie }],
      belong: universTransformé,
      to_own: colorsTransformé,
      picture: { id: this.id_file },
    };
    console.log('le perso est', newCharacter);

    this.characterService
      .createCharacter(newCharacter)
      .subscribe((response: Character) => {
        this.router.navigate(['/arc-en-ciel']);
        console.log('Personnage ajouté avec succès', response);
      });
  }

  onChange(e: any) {
    console.log(e.target.files);
    this.myFile = e.target.files[0];
    if (this.myFile) {
      const formData = new FormData();
      formData.append('monFichier', this.myFile);

      this.pictureService
        .postPicture(formData)
        .subscribe((photo: Partial<Picture>) => {
          this.id_file = photo.id!;

          alert('image postée');
        });
    }
  }
}
