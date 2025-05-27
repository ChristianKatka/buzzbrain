import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { getSelectedGame } from '../../../../store/selectors/games.selectors';

@Component({
  standalone: true,
  selector: 'app-questions-and-answers',
  imports: [CommonModule, MatTabsModule, MatDividerModule, MatIconModule],
  templateUrl: 'questions-and-answers.component.html',
  styleUrl: 'questions-and-answers.component.scss',
})
export class QuestionsAndAnswersComponent {
  store = inject(Store);

  game = this.store.selectSignal(getSelectedGame);
  isAnswersShowing = signal(false);

  questionsAndAnswers = [
    {
      question:
        'Kuinka monta pelaajaa on jalkapallojoukkueessa kentällä samaan aikaan?',
      answer: '1',
    },
    {
      question: 'Mikä on jalkapallon suurin kansainvälinen turnaus?',
      answer: 'Fifa World Cup',
    },
    {
      question:
        'Kuinka monta pelaajaa on jalkapallojoukkueessa kentällä samaan aikaan?',
      answer: '1',
    },
    {
      question:
        'Kuinka monta pelaajaa on jalkapallojoukkueessa kentällä samaan aikaan?',
      answer: '1',
    },
    {
      question:
        'Kuinka monta pelaajaa on jalkapallojoukkueessa kentällä samaan aikaan?',
      answer: '1',
    },
    {
      question:
        'Kuinka monta pelaajaa on jalkapallojoukkueessa kentällä samaan aikaan?',
      answer: '1',
    },
  ];

  showAnsers() {
    this.isAnswersShowing.set(true);
  }
  hideAnsers() {
    this.isAnswersShowing.set(false);
  }
}
