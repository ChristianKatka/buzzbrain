import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { MyButtonComponent } from '../../../shared/components/my-button/my-button.component';

@Component({
  selector: 'app-side-nav-content',
  imports: [
    CommonModule,
    LogoComponent,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MyButtonComponent,
    MatDividerModule,
  ],
  templateUrl: './side-nav-content.component.html',
  styleUrl: './side-nav-content.component.scss',
})
export class SideNavContentComponent {}
