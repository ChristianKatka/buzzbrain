import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { UnauthenticatedGuard } from './auth/guards/unauthenticated.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginContainerComponent } from './auth/components/login/login.container';
import { RegisterContainerComponent } from './auth/components/register/register.container';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthenticatedGuard],
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
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
