import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../store/actions';
import { AuthUiSelectors } from '../../../../store/selectors';
import { SignUpCredentials } from '../../models/sign-up-credentials.model';
import { RegisterFormComponent } from './register-form/register-form.component';

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

  register(credentials: SignUpCredentials) {
    this.store.dispatch(AuthActions.Register.initiate({ credentials }));
  }
}
