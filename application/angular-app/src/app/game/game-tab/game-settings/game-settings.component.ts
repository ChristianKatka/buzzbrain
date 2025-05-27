import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { getSelectedGame } from '../../../../store/selectors/games.selectors';

@Component({
  standalone: true,
  selector: 'app-game-settings',
  imports: [CommonModule, MatTabsModule, MatDividerModule, MatIconModule],
  templateUrl: 'game-settings.component.html',
})
export class GameSettingsComponent {
  store = inject(Store);

  game = this.store.selectSignal(getSelectedGame);
}
