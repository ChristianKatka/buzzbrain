import { Routes } from '@angular/router';
import { startupGuard } from './auth/guards/startup.guard';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { UnauthenticatedGuard } from './auth/guards/unauthenticated.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [startupGuard],
    children: [
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
              import(
                './dashboard/side-nav/pages/billing/billing.component'
              ).then((m) => m.BillingComponent),
          },
          {
            path: 'settings',
            canActivate: [AuthenticatedGuard],
            loadComponent: () =>
              import(
                './dashboard/side-nav/pages/settings/settings.component'
              ).then((m) => m.SettingsComponent),
          },
        ],
      },
      {
        path: 'category/:categoryId/print',
        loadComponent: () =>
          import('./game-category/print-game/print-game.component').then(
            (m) => m.PrintGameComponent
          ),
      },
      {
        path: 'category/:categoryId',
        canActivate: [AuthenticatedGuard],
        loadComponent: () =>
          import('./game-category/game-category.component').then(
            (m) => m.GameCategoryComponent
          ),
      },
      {
        path: 'category/:categoryId/:gameId',
        canActivate: [AuthenticatedGuard],
        loadComponent: () =>
          import('./game/game.component').then((m) => m.GameComponent),
      },
      {
        path: 'category/:categoryId/:gameId/print',
        loadComponent: () =>
          import('./game-category/print-game/print-game.component').then(
            (m) => m.PrintGameComponent
          ),
      },
      {
        path: 'category/:categoryId/:gameId/game',
        canActivate: [AuthenticatedGuard],
        loadComponent: () =>
          import('./game/visa/visa.component').then((m) => m.VisaComponent),
      },
      {
        path: 'category/:categoryId/:gameId/video-game',
        canActivate: [AuthenticatedGuard],
        loadComponent: () =>
          import('./game/video-bg-visa/video-bg-visa.component').then(
            (m) => m.VideBGVisaComponent
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
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
  {
    path: 'welcome',
    canActivate: [AuthenticatedGuard],
    loadComponent: () =>
      import('../shared/components/welcome/welcome.component').then(
        (m) => m.WelcomeComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../shared/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
