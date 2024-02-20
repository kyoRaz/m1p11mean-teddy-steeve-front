import { Routes } from '@angular/router';


// pages
import { AppIconsComponent } from './icons/icons.component';
import { AppSamplePageComponent } from './sample-page/sample-page.component';

export const ExtraRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'activate',
        component: AppIconsComponent,
      },
      {
        path: 'employe-page',
        component: AppSamplePageComponent,
      },
    ],
  },
];
