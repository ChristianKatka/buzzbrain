import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-questions',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: 'questions.component.html',
  styleUrl: 'questions.component.scss',
})
export class QuestionsComponent {
  currentIndex = 0;
  isSliding = false;
  isFullscreen = false;

  transitionDuration = 1000;

  questions = [
    { text: 'How many people live in Finland?' },
    { text: 'What is the capital of Sweden?' },
    { text: 'lorem owjeo ddwdkon1?' },
    { text: 'lorem asdasowjeo dqwddkon?2' },
    { text: 'lorem owdsadsajeo dkddon?3' },
  ];

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
    if (this.currentIndex < this.questions.length - 1 && !this.isSliding) {
      this.isSliding = true;
      this.currentIndex++;
      setTimeout(() => (this.isSliding = false), this.transitionDuration); // match your transition duration
    }
  }

  prev() {
    if (this.currentIndex > 0 && !this.isSliding) {
      this.isSliding = true;
      this.currentIndex--;
      setTimeout(() => (this.isSliding = false), this.transitionDuration);
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
}
