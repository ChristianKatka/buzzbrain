import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSelectedGameCategory } from '../../store/selectors/game-categories.selectors';
import { getSelectedGame } from '../../store/selectors/games.selectors';
import { GameNavbarComponent } from './navbar/game-navbar.component';

@Component({
  standalone: true,
  selector: 'app-game',
  imports: [CommonModule, GameNavbarComponent],
  templateUrl: 'game.component.html',
  styleUrl: 'game.component.scss',
})
export class GameComponent {
  store = inject(Store);

  selectedGame = this.store.selectSignal(getSelectedGame);
}
