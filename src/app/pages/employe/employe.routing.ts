import { Routes, RouterModule } from '@angular/router';
import { EmployeComponent } from './employe.component';
;

export const EmployeRoutes: Routes = [
    {
    path: '',
    children: [
        {
        path: '',
        component: EmployeComponent,
        },
    ],
    },
];