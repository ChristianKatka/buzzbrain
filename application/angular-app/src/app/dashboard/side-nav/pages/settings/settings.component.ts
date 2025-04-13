import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../auth/store/actions';

@Component({
  selector: 'app-settings',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  store = inject(Store);
  logOut() {
    this.store.dispatch(AuthActions.Logout());
  }
}
