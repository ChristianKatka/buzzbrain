import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { UnauthenticatedGuard } from './auth/guards/unauthenticated.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthenticatedGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: '',
        canActivate: [AuthenticatedGuard],
        loadComponent: () =>
          import(
            './dashboard/side-nav/pages/home-game-categories/home-game-categories.component'
          ).then((m) => m.HomeGameCategoriesComponent),
      },
      {
        path: 'billing',
        canActivate: [AuthenticatedGuard],
        loadComponent: () =>
          import('./dashboard/side-nav/pages/billing/billing.component').then(
            (m) => m.BillingComponent
          ),
      },
      {
        path: 'settings',
        canActivate: [AuthenticatedGuard],
        loadComponent: () =>
          import('./dashboard/side-nav/pages/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
    ],
  },

  {
    path: 'login',
    canActivate: [UnauthenticatedGuard],
    loadComponent: () =>
      import('./auth/components/login/login.container').then(
        (m) => m.LoginContainerComponent
      ),
  },

  {
    path: 'register',
    canActivate: [UnauthenticatedGuard],
    loadComponent: () =>
      import('./auth/components/register/register.container').then(
        (m) => m.RegisterContainerComponent
      ),
  },

  // {
  //   path: 'games',
  //   loadComponent: () =>
  //     import('./pages/games/games.component').then((m) => m.GamesComponent),
  // },
  // {
  //   path: 'game/:id',
  //   loadComponent: () =>
  //     import('./pages/game-detail/game-detail.component').then(
  //       (m) => m.GameDetailComponent
  //     ),
  // },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    // component: NotFoundComponent, // Modify if we want to have not found page
  },
];
