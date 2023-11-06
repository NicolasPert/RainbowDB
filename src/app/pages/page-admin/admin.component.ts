import { Component } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { ColorsService } from 'src/app/services/colors.service';
import { UniversService } from 'src/app/services/univers.service';
import { Color } from 'src/models/color';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  colorsToDisplay: string[] = [];
  universToDisplay: string[] = [];

  constructor(
    private characterService: CharacterService,
    private universService: UniversService,
    // private userService: UserService,
    private colorsService: ColorsService
  ) {}

  ngOnInit() {
    // this.universService.getUnivers().subscribe((univers) => {
    //   // Récupération des univers depuis le service
    //   // console.log("qu'est ce que c'est que ça : ", univers);
    //   // console.log("qu'est ce que c'est que ça : ", this.universToDisplay);
    //   for (let i = 0; i < univers.length; i++) {
    //     this.universToDisplay[i] = univers[i].name;
    //   }
    //   // console.log(this.universToDisplay);
    // });

    // this.colorsService.getColors().subscribe((colors) => {
    //   for (let i = 0; i < colors.length; i++) {
    //     this.colorsToDisplay[i] = colors[i].name;
    //   }
    //   // console.log(this.colorsToDisplay);
    // });
  }
}
