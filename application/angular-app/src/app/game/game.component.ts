import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSelectedGame } from '../../store/selectors/games.selectors';
import { GameHeaderComponent } from './header/game-header.component';
import { GameNavbarComponent } from './navbar/game-navbar.component';
import { GameTabComponent } from './game-tab/game-tab.component';

@Component({
  standalone: true,
  selector: 'app-game',
  imports: [
    CommonModule,
    GameNavbarComponent,
    GameHeaderComponent,
    GameTabComponent,
  ],
  templateUrl: 'game.component.html',
  styleUrl: 'game.component.scss',
})
export class GameComponent {
  store = inject(Store);

  selectedGame = this.store.selectSignal(getSelectedGame);
}
