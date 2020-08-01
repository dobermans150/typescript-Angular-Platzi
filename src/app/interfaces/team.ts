import { Player } from './player';
import { Countries } from './countries';


export interface Team {
  $key?: string;
  name: string;
  country: Countries;
  players: Player[];
}
