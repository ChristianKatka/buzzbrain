import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { APP_VERSION } from '../../../../environments/version';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
import { MyButtonComponent } from '../../../../shared/components/my-button/my-button.component';

@Component({
  selector: 'app-side-nav-content',
  imports: [
    CommonModule,
    LogoComponent,
    MatIconModule,
    MatButtonModule,
    MyButtonComponent,
    MatDividerModule,
    RouterModule,
  ],
  templateUrl: './side-nav-content.component.html',
  styleUrl: './side-nav-content.component.scss',
})
export class SideNavContentComponent {
  router = inject(Router);
  appVersion = APP_VERSION;

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
