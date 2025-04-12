import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth/store/actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-app';

  store = inject(Store);

  ngOnInit(): void {
    // this.store.dispatch(AuthActions.RefreshTokens.initiate());
  }
}
