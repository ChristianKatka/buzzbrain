import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ContentHeaderComponent } from './content-header/content-header.component';
import { SideNavContentComponent } from './side-nav-content/side-nav-content.component';

@Component({
  selector: 'app-side-nav',
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    SideNavContentComponent,
    ContentHeaderComponent,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {}
