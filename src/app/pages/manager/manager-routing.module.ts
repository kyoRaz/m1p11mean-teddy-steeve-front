import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatComponent } from './stat/stat.component';
import { DepenseComponent } from './depense/depense.component';

const routes: Routes = [
  { path: 'stat', component: StatComponent },
  { path: 'depense', component: DepenseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
