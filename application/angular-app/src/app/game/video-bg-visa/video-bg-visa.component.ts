import { Component } from '@angular/core';
import { VideoBGVisaVideoBackgroundComponent } from './video-background/video-background.component';
import { VideoBGVisaQuestionsComponent } from './questions/questions.component';

@Component({
  standalone: true,
  selector: 'app-video-bg-visa',
  imports: [VideoBGVisaVideoBackgroundComponent, VideoBGVisaQuestionsComponent],
  templateUrl: 'video-bg-visa.component.html',
  styleUrl: 'video-bg-visa.component.scss',
})
export class VideBGVisaComponent {}
