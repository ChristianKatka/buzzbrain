import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-video-bg-visa-video-background',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: 'video-background.component.html',
  styleUrl: 'video-background.component.scss',
})
export class VideoBGVisaVideoBackgroundComponent implements AfterViewInit {
  @ViewChild('backgroundVideo') videoRef!: ElementRef<HTMLVideoElement>;
  private hasTriedPlaying = false;

  ngAfterViewInit() {
    this.tryPlayVideo();
  }

  @HostListener('window:click')
  @HostListener('window:keydown')
  @HostListener('window:touchstart')
  onUserInteraction() {
    this.tryPlayVideo();
  }

  private tryPlayVideo() {
    if (this.hasTriedPlaying) return;
    const video = this.videoRef.nativeElement;

    video
      .play()
      .then(() => {
        console.log('Video playing');
        this.hasTriedPlaying = true;
      })
      .catch((error) => {
        console.warn(
          'Video play attempt failed, waiting for user interaction...'
        );
      });
  }
}
