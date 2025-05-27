import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { getSelectedGame } from '../../../../store/selectors/games.selectors';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'app-video-bg-visa-questions',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: 'questions.component.html',
  styleUrl: 'questions.component.scss',
})
export class VideoBGVisaQuestionsComponent implements OnChanges {
  store = inject(Store);

  selectedGame = this.store.selectSignal(getSelectedGame);

  currentIndex = 0;
  isSliding = false;
  isFullscreen = false;

  transitionDuration = 1000;

  ngOnChanges() {
    if (this.selectedGame().questions) {
      this.selectedGame().questions.forEach((q: any) => {
        const img = new Image();
        img.src = q.image;
      });
    }
  }

  @HostListener('document:fullscreenchange')
  onFullScreenChange() {
    this.isFullscreen = !!document.fullscreenElement;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.next();
    }
    if (event.key === 'ArrowLeft') {
      this.prev();
    }
  }

  next() {
    if (
      this.currentIndex < this.selectedGame().questions.length - 1 &&
      !this.isSliding
    ) {
      this.slideTo(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0 && !this.isSliding) {
      this.slideTo(this.currentIndex - 1);
    }
  }

  toggleFullscreen() {
    const elem = document.documentElement;

    if (!this.isFullscreen) {
      elem.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }

    this.isFullscreen = !this.isFullscreen;
  }

  isLastQuestionIndex(): boolean {
    return this.currentIndex === this.selectedGame().questions.length - 1;
  }

  isFirstQuestionIndex(): boolean {
    return this.currentIndex === 0;
  }

  private slideTo(index: number) {
    this.isSliding = true;
    this.currentIndex = index;
    setTimeout(() => (this.isSliding = false), this.transitionDuration);
  }
}
