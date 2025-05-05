import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-game-navbar',
  imports: [LogoComponent, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: 'game-navbar.component.html',
  styleUrl: 'game-navbar.component.scss',
})
export class GameNavbarComponent {}
