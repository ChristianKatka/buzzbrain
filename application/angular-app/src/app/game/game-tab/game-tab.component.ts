import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { GameCommercialComponent } from './game-commercial/game-commercial.component';
import { GamePreviewComponent } from './game-preview/game-preview.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { QuestionsAndAnswersComponent } from './questions-and-answers/questions-and-answers.component';

@Component({
  standalone: true,
  selector: 'app-game-tab',
  imports: [
    CommonModule,
    MatTabsModule,
    MatDividerModule,
    QuestionsAndAnswersComponent,
    GameSettingsComponent,
    GamePreviewComponent,
    GameCommercialComponent,
  ],
  templateUrl: 'game-tab.component.html',
  styleUrl: 'game-tab.component.scss',
})
export class GameTabComponent {}
