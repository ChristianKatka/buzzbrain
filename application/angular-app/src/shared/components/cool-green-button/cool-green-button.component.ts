import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cool-green-button',
  templateUrl: 'cool-green-button.component.html',
  standalone: true,
  imports: [],
})
export class CoolGreenButtonComponent {
  @Input()
  text = '';
}
