import { Routes } from '@angular/router';

// export const routes: Routes = [
//   {
//     path: '',
//     component: DashboardComponent,
//     pathMatch: 'full',
//     // canActivate: [AuthenticatedGuard],
//   },
//   {
//     path: 'welcome',
//     component: WelcomeComponent,
//   },
//   {
//     path: 'jukebox-bingo',
//     component: JukeboxBingoComponent,
//   },
//   {
//     path: 'jukebox-bingo/visa',
//     component: JBVisaComponent,
//   },

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
// ];

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './dashboard/side-nav/pages/home-game-categories/home-game-categories.component'
          ).then((m) => m.HomeGameCategoriesComponent),
      },
      {
        path: 'billing',
        loadComponent: () =>
          import('./dashboard/side-nav/pages/billing/billing.component').then(
            (m) => m.BillingComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./dashboard/side-nav/pages/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
    ],
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
