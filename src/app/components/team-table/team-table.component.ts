import { Component, OnInit } from '@angular/core';
import { TeamService, TeamsTableHeaders } from 'src/app/services/team.service';
import { Observable } from 'rxjs';
import { Team } from 'src/app/interfaces/team';
import { take } from 'rxjs/operators';
import { Countries } from 'src/app/interfaces/countries';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss'],
})
export class TeamTableComponent implements OnInit {
  /* Agregamos las variables al componente */
  /* el $ al final significa que es una funcion asincrona */
  public teams$: Observable<Team[]>;
  public tableHeader = TeamsTableHeaders;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    /* Cargamos los teams en la tabla */
    this.teams$ = this.teamService.getTeams();

    /* si no hay una un team en la BD, se agrega un team en duro en la grilla */
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length === 0) {
          const team: Team = {
            name: 'MyAmazingTeam',
            country: Countries.Venezuela,
            players: null,
          };

          this.teamService.addTeam(team);
        }
      });
  }
}
