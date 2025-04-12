import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JukeboxBingoComponent } from './jukebox-bingo/jukebox-bingo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { JBVisaComponent } from './jukebox-bingo/jb-visa/jb-visa.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    // canActivate: [AuthenticatedGuard],
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'jukebox-bingo',
    component: JukeboxBingoComponent,
  },
  {
    path: 'jukebox-bingo/visa',
    component: JBVisaComponent,
  },

  // {
  //   path: 'login',
  //   component: LoginContainerComponent,
  //   canActivate: [UnauthenticatedGuard],
  // },
  // {
  //   path: 'register',
  //   component: RegisterContainerComponent,
  //   canActivate: [UnauthenticatedGuard],
  // },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
