import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'logo.component.html',
  styleUrl: 'logo.component.scss',
})
export class LogoComponent {
  @Input()
  size: 'sm' | 'md' | 'lg' = 'sm';

  get sizeClass(): string {
    switch (this.size) {
      case 'md':
        return 'w-20 h-20'; // ~80px
      case 'lg':
        return 'w-28 h-28'; // ~112px
      default:
        return 'w-12 h-12'; // ~48px
    }
  }
}
