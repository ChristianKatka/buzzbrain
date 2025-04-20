import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameCategoriesSkeletonsComponent } from './game-categories-skeletons/game-categories-skeletons.component';
import { gameCategoriesActions } from '../../../../../store/actions';
import { getGameCategoriesControlData } from '../../../../../store/selectors/game-categories.selectors';

@Component({
  selector: 'app-home-game-categories',
  imports: [
    MatIconModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    GameCategoriesSkeletonsComponent,
  ],
  templateUrl: './home-game-categories.component.html',
  styleUrl: './home-game-categories.component.scss',
})
export class HomeGameCategoriesComponent implements OnInit {
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
      urlRoute: '/category/jukebox',
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

  store = inject(Store);

  controlData = this.store.selectSignal(getGameCategoriesControlData);

  ngOnInit(): void {
    this.store.dispatch(gameCategoriesActions.getGameCategories.initiate());
  }
}
