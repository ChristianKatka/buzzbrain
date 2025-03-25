import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AlertComponent } from '../../../../../shared/components/info-boxes/alert.component';
import { LoadingSpinnerComponent } from '../../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuthCredentials } from '../../../models/auth-credentials.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    AlertComponent,
    LoadingSpinnerComponent,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: 'login-form.component.html',
  styleUrl: 'login-form.component.scss',
})
export class LoginFormComponent implements OnChanges {
  @Input()
  isLoading = false;

  @Input()
  errorMessage: undefined | string = undefined;

  @Output()
  login = new EventEmitter<AuthCredentials>();

  showPassword = false;

  ngOnChanges() {
    if (this.isLoading) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  });

  submit() {
    this.login.emit(this.form.value);
  }
}
