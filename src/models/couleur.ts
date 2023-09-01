export interface Plant {
    includes(clickCategorie: string[]): unknown;
    id : number;
    nom: string;
    films: string;
    univers: string;
    coleur: string;
    image: string;

}