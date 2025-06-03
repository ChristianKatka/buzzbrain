import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getSelectedGame } from '../../../store/selectors/games.selectors';
import { getSelectedGameCategory } from '../../../store/selectors/game-categories.selectors';

@Component({
  standalone: true,
  selector: 'app-gc-navbar',
  imports: [LogoComponent, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: 'gc-navbar.component.html',
  styleUrl: 'gc-navbar.component.scss',
})
export class GCNavbarComponent {
  store = inject(Store);
  selectedGameCategory = this.store.selectSignal(getSelectedGameCategory);
}
