import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  standalone: true,
  selector: 'app-questions-and-answers',
  imports: [CommonModule, MatTabsModule, MatDividerModule],
  templateUrl: 'questions-and-answers.component.html',
  styleUrl: 'questions-and-answers.component.scss',
})
export class QuestionsAndAnswersComponent {
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
}
