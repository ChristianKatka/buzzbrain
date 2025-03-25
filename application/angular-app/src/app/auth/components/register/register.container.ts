import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthUiSelectors } from '../../store/selectors';
import { AuthCredentials } from '../../models/auth-credentials.model';
import { AuthActions } from '../../store/actions';

@Component({
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: 'register.container.html',
  styleUrl: 'register.container.scss',
})
export class RegisterContainerComponent {
  store = inject(Store);

  authUiControlData = this.store.selectSignal(
    AuthUiSelectors.getAuthControlData
  );

  register(credentials: AuthCredentials) {
    this.store.dispatch(AuthActions.Register.initiate({ credentials }));
  }
}
