import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { gamesActions } from '../../../store/actions';
import { getGamesControlData } from '../../../store/selectors/games.selectors';

@Component({
  standalone: true,
  selector: 'app-gc-games',
  imports: [MatButtonModule, RouterModule],
  templateUrl: 'gc-games.component.html',
  styleUrl: 'gc-games.component.scss',
})
export class GCGamesComponent {
  games = [
    { image: '2020.jpg', alt: '2020', name: '2020 hitit' },
    { image: '2010.jpg', alt: '2010', name: '2010 hitit' },
    { image: '00.jpg', alt: '00', name: '1990 hitit' },
    { image: '90.jpg', alt: '90', name: '1980 hitit' },
    { image: '80.jpg', alt: '80', name: '1970 hitit' },
  ];

  store = inject(Store);

  gamesControlData = this.store.selectSignal(getGamesControlData);

  selectGame(gameId: string) {
    this.store.dispatch(gamesActions.selectGame({ gameId }));
  }
}
