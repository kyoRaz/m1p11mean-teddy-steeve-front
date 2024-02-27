import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferenceComponent } from './preference/preference.component';
import { HistoriqueComponent } from './historique/historique.component';
import { RdvComponent } from './rdv/rdv.component';
import { AppTakerdvComponent } from "./createrdv/takerdv.component";

const routes: Routes = [
  { path: 'preference', component: PreferenceComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'rdv/:id', component: RdvComponent },
  {path: 'rdv',component: AppTakerdvComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
