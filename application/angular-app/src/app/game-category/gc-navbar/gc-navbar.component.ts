import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getSelectedGameCategory } from '../../../store/selectors/game-categories.selectors';

@Component({
  standalone: true,
  selector: 'app-gc-navbar',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: 'gc-navbar.component.html',
  styleUrl: 'gc-navbar.component.scss',
})
export class GCNavbarComponent {
  store = inject(Store);
  location = inject(Location);
  selectedGameCategory = this.store.selectSignal(getSelectedGameCategory);

  goBack(): void {
    this.location.back();
  }
}
