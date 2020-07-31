import {Countries} from './countries';


export interface Player {
  $key?: string;
  name: string;
  lastname: string;
  position: SquadNumber;
  weight: number;
  heigth: number;
  nationality: Countries;
  leftFooted: boolean;
}

export enum SquadNumber{
    goalkeeper = 1,
    rightBack = 4,
    sweeper = 2,
    stopper = 6,
    leftBack = 3,
    rightMidFielder = 8,
    centarlDefensiveMiFielder = 5,
    leftMidFielder = 10,
    rightWinger = 7,
    centerForward = 9,
    leftWinger = 11
}

