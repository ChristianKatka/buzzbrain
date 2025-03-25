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
import { AlertComponent } from '../../../../../shared/components/info-boxes/alert.component';
import { LoadingSpinnerComponent } from '../../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuthCredentials } from '../../../models/auth-credentials.model';

@Component({
  standalone: true,
  selector: 'app-register-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    AlertComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: 'register-form.component.html',
  styleUrl: 'register-form.component.scss',
})
export class RegisterFormComponent implements OnChanges {
  @Input()
  isLoading = false;

  @Input()
  errorMessage: undefined | string = undefined;

  @Output()
  register = new EventEmitter<AuthCredentials>();

  showPassword = false;

  ngOnChanges() {
    if (this.isLoading) {
      this.registerForm.disable();
    } else {
      this.registerForm.enable();
    }
  }

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  });

  submit() {
    this.register.emit(this.registerForm.value);
  }
}
