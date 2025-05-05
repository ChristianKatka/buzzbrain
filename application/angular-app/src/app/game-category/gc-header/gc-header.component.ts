import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSelectedGameCategory } from '../../../store/selectors/game-categories.selectors';

@Component({
  standalone: true,
  selector: 'app-gc-header',
  imports: [CommonModule],
  templateUrl: 'gc-header.component.html',
  styleUrl: 'gc-header.component.scss',
})
export class GCHeaderComponent {
  store = inject(Store);

  selectedGameCategory = this.store.selectSignal(getSelectedGameCategory);
}
