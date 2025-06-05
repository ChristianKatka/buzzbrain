import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-multiple-ui-components',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: 'multiple-ui-components.component.html',
})
export class MultipleUIcomponentsComponent {}
