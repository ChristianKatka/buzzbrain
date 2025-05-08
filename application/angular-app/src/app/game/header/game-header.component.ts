import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSelectedGame } from '../../../store/selectors/games.selectors';

@Component({
  standalone: true,
  selector: 'app-game-header',
  imports: [CommonModule],
  templateUrl: 'game-header.component.html',
  styleUrl: 'game-header.component.scss',
})
export class GameHeaderComponent {
  store = inject(Store);

  game = this.store.selectSignal(getSelectedGame);
}
