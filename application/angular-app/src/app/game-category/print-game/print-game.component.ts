import { Component } from '@angular/core';
import { GCNavbarComponent } from '../gc-navbar/gc-navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-print-game',
  imports: [CommonModule, GCNavbarComponent],
  templateUrl: 'print-game.component.html',
})
export class PrintGameComponent {
  numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  printPage(): void {
    window.print();
  }
}
