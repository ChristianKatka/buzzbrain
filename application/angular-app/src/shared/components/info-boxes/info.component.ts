import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  template: ` <ng-content></ng-content> `,
  standalone: true,
  imports: [],
  styleUrl: 'info.component.scss',
})
export class InfoComponent {}
