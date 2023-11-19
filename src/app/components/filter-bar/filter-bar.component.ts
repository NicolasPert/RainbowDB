import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter } from 'rxjs';
import { Character } from 'src/models/character';
import { Color } from 'src/models/color';
import { CommonModule } from '@angular/common';
import { User } from 'src/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  isFilterActive: boolean = false;
  @Input() universParents!: string[];
  @Input() couleursParents!: string[];
  checkedUnivers: string[] = [];
  checkedColors: string[] = [];
  checkedFavoris: string[] = [];
  @Output() universEnvoiParents = new EventEmitter<string[]>();
  @Output() colorsEnvoieParents = new EventEmitter<string[]>();
  @Output() favorisEnvoieParents = new EventEmitter<string[]>();
  connected: boolean = false;

  constructor() {}

  ngOnInit() {
    let affichage = sessionStorage.getItem('token');
    // console.log('mon user', affichage);
    if (affichage) {
      this.connected = true;
    } else this.connected = false;
  }

  getCssClass(univers: string): string {
    // Remplace les espaces par des traits d'union
    return univers.replace(/ /g, '-');
  }

  onFilterClick(event: MouseEvent) {
    const label = event.target as HTMLLabelElement;
    const width = label.style.width;

    if (width === '8rem') {
      label.style.width = '6rem';
    } else {
      label.style.width = '8rem';
    }
  }

  onCheckFavoris(e: Event) {
    // Cette fonction est appelée lorsqu'une case à cocher est modifiée.
    const target = e.target as HTMLInputElement;

    //j'émets mon click vers mon parenst qui contient la logique d'affichage par un boolean
    this.favorisEnvoieParents.emit(this.checkedFavoris);
  }

  onCheckUnivers(e: Event) {
    // Cette fonction est appelée lorsqu'une case à cocher est modifiée.

    const target = e.target as HTMLInputElement; // On récupère l'élément HTML qui a déclenché l'événement.

    if (target.checked) {
      // Si la case à cocher est cochée...
      if (this.checkedUnivers.length === this.universParents.length) {
        // ...et si toutes les cases sont déjà cochées, on réinitialise le tableau.
        this.checkedUnivers = [];
        console.log('ici apres le = tableau vide ',this.checkedUnivers);
      }

      this.checkedUnivers.push(target.value); // On ajoute la valeur de la case cochée au tableau.
    } else {
      // Si la case à cocher est décochée...
      this.checkedUnivers = this.checkedUnivers.filter(
        (univers) => univers !== target.value
      ); // ...on filtre le tableau pour retirer la valeur correspondante.
    }

    if (this.checkedUnivers.length === 0) {
      // Si le tableau est vide, cela signifie que toutes les cases sont décochées, on les réinitialise avec les valeurs d'origine.
      this.checkedUnivers = [...this.universParents];
    }

    // console.log('this.checkedUnivers', this.checkedUnivers); // Affiche le tableau des univers sélectionnés dans la console.
    this.universEnvoiParents.emit(this.checkedUnivers); // Émet un événement avec le tableau mis à jour.
  }

  onCheckColors(e: Event) {
    // Cette fonction est appelée lorsqu'une case à cocher est modifiée.

    const target = e.target as HTMLInputElement; // On récupère l'élément HTML qui a déclenché l'événement.

    if (target.checked) {
      // Si la case est cochée...
      if (this.checkedColors.length === this.couleursParents.length) {
        // ...et si toutes les cases sont déjà cochées, on réinitialise le tableau.
        this.checkedColors = [];
      }

      this.checkedColors.push(target.value); // On ajoute la valeur de la case cochée au tableau.
    } else {
      // Si la case à cocher est décochée...
      this.checkedColors = this.checkedColors.filter(
        (couleur) => couleur !== target.value
      ); // ...on filtre le tableau pour retirer la valeur correspondante.
    }

    console.log('filtres couleurs ici', this.checkedColors);
    this.colorsEnvoieParents.emit(this.checkedColors); // Émet un événement avec le tableau mis à jour.
  }
}
