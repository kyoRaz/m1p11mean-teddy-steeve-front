import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppDialogComponent } from './dialog/dialog.component';
import { AppTacheComponent } from './tache/tache.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'service-page',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppDialogComponent,
      },
      {
        path: 'tache',
        component: AppTacheComponent,
      },
    ],
  },
];
