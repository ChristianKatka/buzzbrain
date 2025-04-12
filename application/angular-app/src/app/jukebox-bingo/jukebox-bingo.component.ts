import { Component } from '@angular/core';
import { JBNavbarComponent } from './jb-navbar/jb-navbar.component';
import { JBHeaderComponent } from './jb-header/jb-header.component';
import { JBGamesComponent } from './jb-games/jb-games.component';

@Component({
  standalone: true,
  selector: 'app-jukebox-bingo',
  imports: [JBNavbarComponent, JBHeaderComponent, JBGamesComponent],
  templateUrl: 'jukebox-bingo.component.html',
  styleUrl: 'jukebox-bingo.component.scss',
})
export class JukeboxBingoComponent {}
