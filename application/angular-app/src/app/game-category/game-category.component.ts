import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { gamesActions } from '../../store/actions';
import { getSelectedGameCategory } from '../../store/selectors/game-categories.selectors';
import { getGamesControlData } from '../../store/selectors/games.selectors';
import { GCGamesComponent } from './gc-games/gc-games.component';
import { GCHeaderComponent } from './gc-header/gc-header.component';
import { GCNavbarComponent } from './gc-navbar/gc-navbar.component';

@Component({
  standalone: true,
  selector: 'app-game-category',
  imports: [
    GCNavbarComponent,
    GCHeaderComponent,
    GCGamesComponent,
    CommonModule,
    MatProgressBarModule,
  ],
  templateUrl: 'game-category.component.html',
  styleUrl: 'game-category.component.scss',
})
export class GameCategoryComponent {
  store = inject(Store);

  selectedGameCategory = this.store.selectSignal(getSelectedGameCategory);
  gamesControlData = this.store.selectSignal(getGamesControlData);

  ngOnInit(): void {
    this.store.dispatch(gamesActions.getGamesByCategory.initiate());
  }
}
