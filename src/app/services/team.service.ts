import { Injectable } from '@angular/core';
import { Team } from '../interfaces/team';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const TeamsTableHeaders = ['Name', 'Country', 'Players'];

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamDb: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.teamDb = this.db.list('/teams', (ref) => ref.orderByChild('name'));
  }

  /* Obteniendo lista de Equipos */
  getTeams(): Observable<Team[]> {
    return this.teamDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }

  /* Agergar un Equipos */
  addTeam(player: Team) {
    return this.teamDb.push(player);
  }

  /* Eliminado un Equipos */
  deleteTeam(id: string) {
    this.db.list('/teams').remove(id);
  }

  /* Editando un Equipos */
  editTeam(newTeamData) {
    const $key = newTeamData.$key;
    delete newTeamData.$key;
    this.db.list('/teams').update($key, newTeamData);
  }
}
