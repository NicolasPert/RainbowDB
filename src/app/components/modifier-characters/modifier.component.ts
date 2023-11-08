import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character.service';
import { ColorsService } from 'src/app/services/colors.service';
import { MoviesService } from 'src/app/services/movies.service';
import { PictureService } from 'src/app/services/picture.service';
import { UniversService } from 'src/app/services/univers.service';
import { Character } from 'src/models/character';
import { Color } from 'src/models/color';
import { CreateCharacter } from 'src/models/createCharacter';
import { Movie } from 'src/models/movie';
import { Picture } from 'src/models/picture';
import { Univer } from 'src/models/univer';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css'],
})
export class ModifierComponent {
  myFile!: File;
  id_file!: number;
  id_Movie!: number;
  character!: Character;
  colorsAvailable: Color[] = [];
  universAvailable: Univer[] = [];
  moviesAvailable: Movie[] = [];
  changeCharacter: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    movie: new FormControl('', Validators.required),
    univers: new FormControl('', Validators.required),
    id_pictures: new FormControl(''),
    color: new FormControl('', Validators.required),
  });

  constructor(
    private characterService: CharacterService,
    private pictureService: PictureService,
    private router: Router,
    private colorsService: ColorsService,
    private moviesService: MoviesService,
    private universService: UniversService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap;
    const charactersIdFromRoute = Number(routeParam.get('id'));

    this.characterService
      .getCharacterById(charactersIdFromRoute)
      .subscribe((char) => {
        this.character = char;
      });

    this.colorsService.getColors().subscribe((colors: Color[]) => {
      this.colorsAvailable = colors;
    });

    this.universService.getUnivers().subscribe((univers: Univer[]) => {
      this.universAvailable = univers;
    });
  }

  onSubmit() {
    let movie = {
      name: this.changeCharacter.get('movie')?.value,
    };

    console.log('mes univers', this.changeCharacter.get('univers')?.value);
    console.log('mes colors', this.changeCharacter.get('color')?.value);

    this.moviesService.createMovies(movie).subscribe({
      next: (response) => {
        this.id_Movie = response.id!;
        console.log(this.id_Movie);
        this.updateCharacter();
      },
    });
  }

  updateCharacter() {
    const newPhotoId = this.id_file;
    /**
     * Si dans univers j'ai [1] => belong: [{id: 1}]
     * Si dans univers j'ai [1, 2] => belong: [{id: 1},{id: 2} ]
     * Même chose pour color
     */
    const universOriginal = this.changeCharacter.get('univers')?.value;
    const universTransformé = universOriginal.map((id: number) => ({ id }));
    console.log(`mes univers transformé`, universTransformé);

    const colorsOriginal = this.changeCharacter.get('color')?.value;

    const colorsTransformé = colorsOriginal
      .filter((id: number) => typeof id === 'number')
      .map((id: number) => ({ id }));
    console.log('les couleurs transformées', colorsTransformé);

    /**
     * Puis transférer ici une fois que toute est bon
     */
    const changeCharacter: CreateCharacter = {
      name: this.changeCharacter.get('name')?.value,
      to_in: [{ id: this.id_Movie }],
      belong: universTransformé,
      to_own: colorsTransformé,
      picture: { id: newPhotoId },
    };
    console.log('une photo avec id',newPhotoId);
    console.log('le perso est', changeCharacter);

    const characterIdFromRoute = Number(this.route.snapshot.paramMap.get('id'));
    this.characterService
      .updateCharacter(characterIdFromRoute, changeCharacter)
      .subscribe((response) => {
        this.router.navigate(['/arc-en-ciel']);
        console.log('Personnage modifié avec succès', response);
      });
  }

  onChange(e: any) {
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
