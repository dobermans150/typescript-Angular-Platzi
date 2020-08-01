import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Player } from '../interfaces/player';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playerDb: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playerDb = this.db.list('/players', (ref) => ref.orderByChild('name'));
  }

  /* Obteniendo lista de jugadores */
  getPlayers(): Observable<Player[]> {
    return this.playerDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }

  /* Agergar un Jugador */
  addPlayer(player: Player) {
    return this.playerDb.push(player);
  }

  /* Eliminado un jugador */
  deletePlayer(id: string){
    this.db.list('/players').remove(id);
  }

  /* Editando un jugador */
  editPlayer(newPlayerData){
    const $key = newPlayerData.$key;
    delete(newPlayerData.$key);
    this.db.list('/player').update($key, newPlayerData);
  }
}
