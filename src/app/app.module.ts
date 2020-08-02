import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'

/* MOdulo de environment */
import { environment } from 'src/environments/environment';

/* Modulos de Firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

/* Servicios */
import { PlayerService } from './services/player.service';
import { TeamService } from './services/team.service';

/* Components */
import { TeamTableComponent } from './components/team-table/team-table.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { PlayerDialogComponent } from './components/player-dialog/player-dialog.component';

@NgModule({
  declarations: [AppComponent, TeamTableComponent, PlayerTableComponent, PlayerDialogComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PlayerService, TeamService],
  bootstrap: [AppComponent],
})
export class AppModule {}
