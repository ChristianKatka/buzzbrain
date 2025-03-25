import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule],
  templateUrl: 'alert.component.html',
  styleUrl: 'alert.component.scss',
})
export class AlertComponent {
  @Input()
  text = '';
}
