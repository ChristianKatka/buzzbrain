import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { getGamesControlData } from '../../store/selectors/games.selectors';
import { JBGamesComponent } from './jb-games/jb-games.component';
import { JBHeaderComponent } from './jb-header/jb-header.component';
import { JBNavbarComponent } from './jb-navbar/jb-navbar.component';
import { gamesActions } from '../../store/actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-jukebox-bingo',
  imports: [
    JBNavbarComponent,
    JBHeaderComponent,
    JBGamesComponent,
    CommonModule,
  ],
  templateUrl: 'jukebox-bingo.component.html',
  styleUrl: 'jukebox-bingo.component.scss',
})
export class JukeboxBingoComponent implements OnInit, OnChanges {
  store = inject(Store);

  gamesControlDate = this.store.selectSignal(getGamesControlData);

  ngOnInit(): void {
    this.store.dispatch(gamesActions.getGamesByCategory.initiate());
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('gamesControlDate');
    console.log(this.gamesControlDate);
  }
}
