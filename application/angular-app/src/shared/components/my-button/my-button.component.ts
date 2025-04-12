import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: 'my-button.component.html',
  styleUrl: 'my-button.component.scss',
})
export class MyButtonComponent {
  @Input()
  props: { isActive: boolean; icon: string; text: string } | undefined =
    undefined;
}
