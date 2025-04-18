import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthCredentials } from '../../models/auth-credentials.model';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthUiSelectors } from '../../../../store/selectors';
import { AuthActions } from '../../../../store/actions';

@Component({
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: 'login.container.html',
  styleUrl: 'login.container.scss',
})
export class LoginContainerComponent {
  store = inject(Store);

  authUiControlData = this.store.selectSignal(
    AuthUiSelectors.getAuthControlData
  );

  login(credentials: AuthCredentials) {
    this.store.dispatch(AuthActions.Login.initiate({ credentials }));
  }
}
