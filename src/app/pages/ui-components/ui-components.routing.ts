import { Routes } from '@angular/router';

// ui
import { AppChipsComponent } from '../extra/tache/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppDialogComponent } from '../client/dialog/dialog.component';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AppSamplePageComponent } from '../ui-components/sample-page/sample-page.component';
import { StatComponent } from '../manager/stat/stat.component';
import { DepenseComponent } from '../manager/depense/depense.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StatComponent,
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
        path: 'employe-page',
        component: AppSamplePageComponent,
      },
      {
        path: 'menu',
        component: AppDialogComponent,
      },
      {
        path: 'depense',
        component: DepenseComponent,
      },
    ],
  },
];
