import { Routes, RouterModule } from '@angular/router';
import { EmployeComponent  } from './employe.component';
import { SuivitacheComponent  } from './suivitache/suivitache.component';
;

export const EmployeRoutes: Routes = [
    {
    path: '',
    children: [
        {
        path: '',
        component: EmployeComponent,
        },
        {
        path: 'suivi',
        component: SuivitacheComponent,
        },
    ],
    },
];