import { Character } from "./character";


export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  password_validate?: string;
  admin: boolean;
  to_likes: Character[];
 
}
