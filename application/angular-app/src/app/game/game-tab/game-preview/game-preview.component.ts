import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { getSelectedGameForGameItself } from '../../../../store/selectors/games.selectors';

@Component({
  standalone: true,
  selector: 'app-game-preview',
  imports: [CommonModule, MatTabsModule, MatDividerModule, MatIconModule],
  templateUrl: 'game-preview.component.html',
})
export class GamePreviewComponent {
  store = inject(Store);

  game = this.store.selectSignal(getSelectedGameForGameItself);
}
