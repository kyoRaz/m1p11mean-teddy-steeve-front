import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { PreferenceComponent } from './preference/preference.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoriqueComponent } from './historique/historique.component';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';


@NgModule({
  declarations: [
    ClientComponent,
    PreferenceComponent,
    HistoriqueComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
  ]
})
export class ClientModule { }
