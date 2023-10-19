import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  @Input() universParents!: string[];
  checkedUnivers: string[] = [];
  @Output() categorieEnvoiParents = new EventEmitter<string[]>();

  // La classe FilterBarComponent est un composant Angular qui gère la barre de filtre.

  onCheckUnivers(e: Event) {
    // Cette fonction est appelée lorsqu'une case à cocher est modifiée.

    const target = e.target as HTMLInputElement; // On récupère l'élément HTML qui a déclenché l'événement.

    if (target.checked) {
      // Si la case à cocher est cochée...
      if (this.checkedUnivers.length === this.universParents.length) {
        // ...et si toutes les cases sont déjà cochées, on réinitialise le tableau.
        this.checkedUnivers = [];
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

    console.log('this.checkedUnivers', this.checkedUnivers); // Affiche le tableau des univers sélectionnés dans la console.
    this.categorieEnvoiParents.emit(this.checkedUnivers); // Émet un événement avec le tableau mis à jour.
  }
}
