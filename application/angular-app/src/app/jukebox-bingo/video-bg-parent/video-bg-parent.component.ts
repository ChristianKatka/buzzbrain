import { Component } from '@angular/core';
import { VisaVideoBackgroundComponent } from './visa-video-background/visa-video-background.component';
import { QuestionsComponent } from './questions/questions.component';

@Component({
  standalone: true,
  selector: 'app-video-bg-parent',
  imports: [VisaVideoBackgroundComponent, QuestionsComponent],
  templateUrl: 'video-bg-parent.component.html',
  styleUrl: 'video-bg-parent.component.scss',
})
export class VisaBgParentComponent {}
