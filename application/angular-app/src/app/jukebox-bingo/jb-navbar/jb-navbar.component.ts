import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'app-jb-navbar',
  imports: [MatToolbarModule],
  templateUrl: 'jb-navbar.component.html',
  styleUrl: 'jb-navbar.component.scss',
})
export class JBNavbarComponent {}
