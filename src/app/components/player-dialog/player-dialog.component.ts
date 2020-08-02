import { Component, OnInit } from '@angular/core';
import { Countries } from 'src/app/interfaces/countries';
import { SquadNumber, Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';
import { take } from 'rxjs/operators';
import { Team } from 'src/app/interfaces/team';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss'],
})
export class PlayerDialogComponent implements OnInit {
  /* Creamos nuestras varaibles necesarias */
  private team: Team;
  /* Formateamos el objeto countries para que tengan un index como nombre y permanezca como un objeto */
  public countries = Object.keys(Countries).map((key) => ({
    label: key,
    key: Countries[key],
  }));

  /* Basicamente hacemos lo mismo que con coutries, pero este es un enum asique se parte a la mitad el contenido */
  public squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map((key) => ({
      label: key,
      key: SquadNumber[key],
    }));

  public player: Player;

  /* Importamos de forma privada en el componente los servicios */
  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  /* Al iniciar el componente nos paramos en el primer team */
  ngOnInit(): void {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length > 0) {
          this.team = teams[0];
        }
      });

    /* Logs */
    console.log(this.countries);
    console.log(this.squadNumber);
  }
  /* FUNCTIONS */
  /* Agregar un nuevo player */
  private newPlayer(playerFormValue) {
    /* Preparamos la logica para agregar al team un nuevo player */
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKey = {
      ...playerFormValue,
      key,
    };
    /* Preparamos la estructura del Team con la actualizacion del nuevo player */
    const formattedTeam = {
      ...this.team,
      players: [
        ...(this.team.players ? this.team.players : []),
        playerFormValueKey,
      ],
    };

    /* Agregamos el team con dicho player agregado */
    this.teamService.editTeam(formattedTeam);
    /* Logs */
    console.log(playerFormValueKey);
    console.log(formattedTeam);
  }

  onSubmit(playerForm: NgForm) {
    const playerFormValue = { ...playerForm.value };
    if (playerForm.valid) {
      playerFormValue.leftFooted =
        playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }

    this.newPlayer(playerFormValue);
    window.location.replace('#');
    console.log(playerFormValue);
  }
}
