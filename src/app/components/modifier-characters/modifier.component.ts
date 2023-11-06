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

this.characterService.getCharacterById(charactersIdFromRoute).subscribe(
  (char) => {
    if (char) {
      this.character = char;
      
    } else {
      console.error('Personnage non trouvé ou réponse invalide du serveur.');
    }
  },
  (error) => {
    console.error('Erreur lors de la récupération du personnage :', error);
  }
);

    

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
    
    const universOriginal = this.changeCharacter.get('univers')?.value;
    const universTransformé = universOriginal.map((id: number) => ({ id }));

    const colorsOriginal = this.changeCharacter.get('color')?.value;

    const colorsTransformé = colorsOriginal
      .filter((id: number) => typeof id === 'number')
      .map((id: number) => ({ id }));
    console.log('les couleurs transformées', colorsTransformé);

    
    const changeCharacter: CreateCharacter = {
      name: this.changeCharacter.get('name')?.value,
      to_in: [{ id: this.id_Movie }],
      belong: universTransformé,
      to_own: colorsTransformé,
      id_pictures: this.id_file,
    };
    console.log('le perso est', changeCharacter);

    this.route.paramMap.subscribe((params) => {
      const idChar = params.get('id');
      if (idChar !== null) {
        const id = +idChar;
        if (!isNaN(id)) {
    this.characterService
      .updateCharacter(id, changeCharacter)
      .subscribe((response) => {

        this.router.navigate(['/arc-en-ciel']);
        console.log('Personnage modifié avec succès', response);
      },
      (error) => {
        console.error('Erreur lors de la modification du Personnage', error);
            }
          );
        } else {
          console.error("L'ID n'est pas un nombre valide.");
        }
      } else {
        console.error("L'ID est 'null'.");
      }
    });}

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
