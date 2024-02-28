import { Routes } from '@angular/router';
import { EmployeComponent } from './employe/employe.component';



import { AppIconsComponent } from './icons/icons.component';
import { SuivitacheComponent } from './employe/suivitache/suivitache.component';
import { AppChipsComponent } from './tache/chips.component';

export const ExtraRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'activate',
        component: AppIconsComponent,
      },
      {
        path: '',
        component: EmployeComponent,
      },
      {
        path: 'suivi',
        component: SuivitacheComponent,
      },
      {
        path: 'tache',
        component: AppChipsComponent,
      },

    ],
  },
];
