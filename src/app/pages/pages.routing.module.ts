import { Routes } from '@angular/router';
import { AppDashboardComponent } from './ui-components/dashboard/dashboard.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
];
