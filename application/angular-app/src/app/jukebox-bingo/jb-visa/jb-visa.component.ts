import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-jb-visa',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: 'jb-visa.component.html',
  styleUrl: 'jb-visa.component.scss',
})
export class JBVisaComponent implements OnInit {
  currentIndex = 0;
  isSliding = false;
  isFullscreen = false;

  transitionDuration = 1000;

  questions = [
    { imageUrl: '/games/bg-1.webp', text: 'How many people live in Finland?' },
    { imageUrl: '/games/bg-2.webp', text: 'What is the capital of Sweden?' },
    { imageUrl: '/games/dice-game.webp', text: 'lorem owjeo ddwdkon?' },
    { imageUrl: '/games/popcorn.webp', text: 'lorem asdasowjeo dqwddkon?' },
    { imageUrl: '/games/retro-mic.webp', text: 'lorem owdsadsajeo dkddon?' },
  ];

  ngOnInit() {
    this.questions.forEach((q) => {
      const img = new Image();
      img.src = q.imageUrl;
    });
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
    if (this.currentIndex < this.questions.length - 1 && !this.isSliding) {
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

  private slideTo(index: number) {
    this.isSliding = true;
    this.currentIndex = index;
    setTimeout(() => (this.isSliding = false), this.transitionDuration);
  }
}
