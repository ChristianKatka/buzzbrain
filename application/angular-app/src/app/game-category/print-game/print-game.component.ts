import { Component } from '@angular/core';
import { GCNavbarComponent } from '../gc-navbar/gc-navbar.component';

@Component({
  standalone: true,
  selector: 'app-print-game',
  imports: [GCNavbarComponent],
  templateUrl: 'print-game.component.html',
  styleUrl: 'print-game.component.scss',
})
export class PrintGameComponent {}
