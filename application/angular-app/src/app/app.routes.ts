import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [startupGuard],
    children: [
      {
        path: 'dashboard',
        // canActivate: [AuthenticatedGuard],
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        children: [
          {
            path: '',
            // canActivate: [AuthenticatedGuard],
            loadComponent: () =>
              import(
                './dashboard/side-nav/pages/home-game-categories/home-game-categories.component'
              ).then((m) => m.HomeGameCategoriesComponent),
          },
          {
            path: 'billing',
            // canActivate: [AuthenticatedGuard],
            loadComponent: () =>
              import(
                './dashboard/side-nav/pages/billing/billing.component'
              ).then((m) => m.BillingComponent),
          },
          {
            path: 'settings',
            // canActivate: [AuthenticatedGuard],
            loadComponent: () =>
              import(
                './dashboard/side-nav/pages/settings/settings.component'
              ).then((m) => m.SettingsComponent),
          },
        ],
      },
      {
        path: 'category/:categoryId',
        // canActivate: [AuthenticatedGuard],
        loadComponent: () =>
          import('./jukebox-bingo/jukebox-bingo.component').then(
            (m) => m.JukeboxBingoComponent
          ),
      },
      {
        path: 'category/:categoryId/:gameId',
        // canActivate: [AuthenticatedGuard],
        loadComponent: () =>
          import('./jukebox-bingo/jb-visa/jb-visa.component').then(
            (m) => m.JBVisaComponent
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
    // canActivate: [UnauthenticatedGuard],
    loadComponent: () =>
      import('./auth/components/login/login.container').then(
        (m) => m.LoginContainerComponent
      ),
  },
  {
    path: 'register',
    // canActivate: [UnauthenticatedGuard],
    loadComponent: () =>
      import('./auth/components/register/register.container').then(
        (m) => m.RegisterContainerComponent
      ),
  },
  {
    path: 'welcome',
    // canActivate: [AuthenticatedGuard],
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
