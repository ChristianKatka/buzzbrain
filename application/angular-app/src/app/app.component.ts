import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth/store/actions';
import { isInitialAppLoading } from './auth/store/selectors/auth-ui.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store);
  isInitialAppLoading = this.store.selectSignal(isInitialAppLoading);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.RefreshTokens.initiate());
  }
}
