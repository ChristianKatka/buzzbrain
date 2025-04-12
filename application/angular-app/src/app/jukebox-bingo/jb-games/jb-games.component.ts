import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-jb-games',
  imports: [MatButtonModule, RouterModule],
  templateUrl: 'jb-games.component.html',
  styleUrl: 'jb-games.component.scss',
})
export class JBGamesComponent {
  games = [
    { image: '2020.jpg', alt: '2020', name: '2020 hitit' },
    { image: '2010.jpg', alt: '2010', name: '2010 hitit' },
    { image: '00.jpg', alt: '00', name: '1990 hitit' },
    { image: '90.jpg', alt: '90', name: '1980 hitit' },
    { image: '80.jpg', alt: '80', name: '1970 hitit' },
  ];
}
