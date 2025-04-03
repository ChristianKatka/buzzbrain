import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [SideNavComponent],
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
})
export class HomeComponent {}
