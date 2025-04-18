import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { isInitialAppLoading } from '../store/selectors/auth-ui.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // store = inject(Store);
  // isInitialAppLoading = this.store.selectSignal(isInitialAppLoading);
}
