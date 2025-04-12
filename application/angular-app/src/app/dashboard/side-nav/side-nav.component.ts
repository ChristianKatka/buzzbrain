import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SideNavContentComponent } from './side-nav-content/side-nav-content.component';
import { ContentHeaderComponent } from './content-header/content-header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDividerModule,
    SideNavContentComponent,
    ContentHeaderComponent,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  quizes = [
    {
      image: 'sport-quiz.jpg',
      alt: 'sportti-visa',
      title: 'Sportti visa',
      text: 'Sportti visa hulvattomilla kysymyksillä, hupia ja taitoa',
    },
    {
      image: 'jukebox-bingo.jpg',
      alt: 'jukebox-bingo',
      title: 'Jukebox bingo',
      text: 'Nopeatempoinen musiikkibingo, jossa numerot on korvattu kappaleilla.',
      urlRoute: 'jukebox-bingo',
    },
    {
      image: 'pub-quiz.jpg',
      alt: 'pub-quiz',
      title: 'The pub quiz',
      text: 'Nopeasti etenevä yleistietovisa.',
    },
    {
      image: 'big-cards.jpg',
      alt: 'big-cards',
      title: 'Big Deal',
      text: 'Pelaa korttisi oikein, oikealla asenteella.',
    },
    {
      image: 'sport-quiz.jpg',
      alt: 'sportti-visa',
      title: 'Sportti visa',
      text: 'Sportti visa hulvattomilla kysymyksillä, hupia ja taitoa',
    },
    {
      image: 'jukebox-bingo.jpg',
      alt: 'jukebox-bingo',
      title: 'Jukebox bingo',
      text: 'Nopeatempoinen musiikkibingo, jossa numerot on korvattu kappaleilla.',
    },
    {
      image: 'pub-quiz.jpg',
      alt: 'pub-quiz',
      title: 'The pub quiz',
      text: 'Nopeasti etenevä yleistietovisa.',
    },
    {
      image: 'big-cards.jpg',
      alt: 'big-cards',
      title: 'Big Deal',
      text: 'Pelaa korttisi oikein, oikealla asenteella.',
    },
    {
      image: 'sport-quiz.jpg',
      alt: 'sportti-visa',
      title: 'Sportti visa',
      text: 'Sportti visa hulvattomilla kysymyksillä, hupia ja taitoa',
    },
    {
      image: 'jukebox-bingo.jpg',
      alt: 'jukebox-bingo',
      title: 'Jukebox bingo',
      text: 'Nopeatempoinen musiikkibingo, jossa numerot on korvattu kappaleilla.',
    },
    {
      image: 'pub-quiz.jpg',
      alt: 'pub-quiz',
      title: 'The pub quiz',
      text: 'Nopeasti etenevä yleistietovisa.',
    },
    {
      image: 'big-cards.jpg',
      alt: 'big-cards',
      title: 'Big Deal',
      text: 'Pelaa korttisi oikein, oikealla asenteella.',
    },
    {
      image: 'sport-quiz.jpg',
      alt: 'sportti-visa',
      title: 'Sportti visa',
      text: 'Sportti visa hulvattomilla kysymyksillä, hupia ja taitoa',
    },
    {
      image: 'jukebox-bingo.jpg',
      alt: 'jukebox-bingo',
      title: 'Jukebox bingo',
      text: 'Nopeatempoinen musiikkibingo, jossa numerot on korvattu kappaleilla.',
    },
    {
      image: 'pub-quiz.jpg',
      alt: 'pub-quiz',
      title: 'The pub quiz',
      text: 'Nopeasti etenevä yleistietovisa.',
    },
    {
      image: 'big-cards.jpg',
      alt: 'big-cards',
      title: 'Big Deal',
      text: 'Pelaa korttisi oikein, oikealla asenteella.',
    },
    {
      image: 'sport-quiz.jpg',
      alt: 'sportti-visa',
      title: 'Sportti visa',
      text: 'Sportti visa hulvattomilla kysymyksillä, hupia ja taitoa',
    },
    {
      image: 'jukebox-bingo.jpg',
      alt: 'jukebox-bingo',
      title: 'Jukebox bingo',
      text: 'Nopeatempoinen musiikkibingo, jossa numerot on korvattu kappaleilla.',
    },
    {
      image: 'pub-quiz.jpg',
      alt: 'pub-quiz',
      title: 'The pub quiz',
      text: 'Nopeasti etenevä yleistietovisa.',
    },
    {
      image: 'big-cards.jpg',
      alt: 'big-cards',
      title: 'Big Deal',
      text: 'Pelaa korttisi oikein, oikealla asenteella.',
    },
  ];
}
