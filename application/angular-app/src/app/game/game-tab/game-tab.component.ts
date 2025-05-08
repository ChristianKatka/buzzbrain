import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { QuestionsAndAnswersComponent } from './questions-and-answers/questions-and-answers.component';

@Component({
  standalone: true,
  selector: 'app-game-tab',
  imports: [
    CommonModule,
    MatTabsModule,
    MatDividerModule,
    QuestionsAndAnswersComponent,
  ],
  templateUrl: 'game-tab.component.html',
  styleUrl: 'game-tab.component.scss',
})
export class GameTabComponent {}
