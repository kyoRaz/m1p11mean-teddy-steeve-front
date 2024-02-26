import { Routes } from '@angular/router';
import { EmployeComponent } from './employe/employe.component';



import { AppIconsComponent } from './icons/icons.component';

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
      
    ],
  },
];
