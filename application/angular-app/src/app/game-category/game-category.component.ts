import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { gamesActions } from '../../store/actions';
import { getGamesControlData } from '../../store/selectors/games.selectors';
import { GCGamesComponent } from './gc-games/gc-games.component';
import { GCHeaderComponent } from './gc-header/gc-header.component';
import { GCNavbarComponent } from './gc-navbar/gc-navbar.component';
import { getSelectedGameCategory } from '../../store/selectors/game-categories.selectors';

@Component({
  standalone: true,
  selector: 'app-game-category',
  imports: [
    GCNavbarComponent,
    GCHeaderComponent,
    GCGamesComponent,
    CommonModule,
  ],
  templateUrl: 'game-category.component.html',
  styleUrl: 'game-category.component.scss',
})
export class GameCategoryComponent implements OnInit, OnChanges {
  store = inject(Store);

  selectedGameCategory = this.store.selectSignal(getSelectedGameCategory);
  gamesControlDate = this.store.selectSignal(getGamesControlData);

  ngOnInit(): void {
    this.store.dispatch(gamesActions.getGamesByCategory.initiate());
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('gamesControlDate');
    console.log(this.gamesControlDate);
  }
}
