import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { UnauthenticatedGuard } from './auth/guards/unauthenticated.guard';
import { startupGuard } from './auth/guards/startup.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  // {
  //   path: '',
  //   canActivate: [startupGuard], // 👈 THIS IS THE KEY. Handle authentication to the app. fixes all flashing to login and dashboard view.
  //   children: [
  //     {
  //       path: 'dashboard',
  //       canActivate: [AuthenticatedGuard],
  //       loadComponent: () =>
  //         import('./dashboard/dashboard.component').then(
  //           (m) => m.DashboardComponent
  //         ),
  //       children: [
  //         {
  //           path: '',
  //           canActivate: [AuthenticatedGuard],
  //           loadComponent: () =>
  //             import(
  //               './dashboard/side-nav/pages/home-game-categories/home-game-categories.component'
  //             ).then((m) => m.HomeGameCategoriesComponent),
  //         },
  //         {
  //           path: 'billing',
  //           canActivate: [AuthenticatedGuard],
  //           loadComponent: () =>
  //             import(
  //               './dashboard/side-nav/pages/billing/billing.component'
  //             ).then((m) => m.BillingComponent),
  //         },
  //         {
  //           path: 'settings',
  //           canActivate: [AuthenticatedGuard],
  //           loadComponent: () =>
  //             import(
  //               './dashboard/side-nav/pages/settings/settings.component'
  //             ).then((m) => m.SettingsComponent),
  //         },
  //       ],
  //     },
  //     {
  //       path: 'category/jukebox',
  //       loadComponent: () =>
  //         import('./jukebox-bingo/jukebox-bingo.component').then(
  //           (m) => m.JukeboxBingoComponent
  //         ),
  //     },
  //     {
  //       path: 'category/jukebox/game',
  //       loadComponent: () =>
  //         import('./jukebox-bingo/jb-visa/jb-visa.component').then(
  //           (m) => m.JBVisaComponent
  //         ),
  //     },
  //     {
  //       path: 'login',
  //       canActivate: [UnauthenticatedGuard],
  //       loadComponent: () =>
  //         import('./auth/components/login/login.container').then(
  //           (m) => m.LoginContainerComponent
  //         ),
  //     },
  //     {
  //       path: 'register',
  //       canActivate: [UnauthenticatedGuard],
  //       loadComponent: () =>
  //         import('./auth/components/register/register.container').then(
  //           (m) => m.RegisterContainerComponent
  //         ),
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'dashboard',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: '**',
  //       redirectTo: 'dashboard',
  //       // component: NotFoundComponent,
  //     },
  //   ],
  // },
];
