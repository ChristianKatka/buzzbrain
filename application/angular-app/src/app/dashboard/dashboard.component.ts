import { Component } from '@angular/core';
import { SideNavComponent } from './side-nav/side-nav.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [SideNavComponent],
  templateUrl: 'dashboard.component.html',
  styleUrl: 'dashboard.component.scss',
})
export class DashboardComponent {}
