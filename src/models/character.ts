import { Color } from "../models/color";

export interface Character {
  id: number;
  name: string;
  id_movies: number;
  id_univers: number;
  id_pictures: number;
  id_colors: Color[];
}
