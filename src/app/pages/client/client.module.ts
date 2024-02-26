import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { PreferenceComponent } from './preference/preference.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoriqueComponent } from './historique/historique.component';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { RdvComponent } from './rdv/rdv.component';
import { AppTakerdvComponent } from './createrdv/takerdv.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    PreferenceComponent,
    HistoriqueComponent,
    RdvComponent,AppTakerdvComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DragDropModule,
    TablerIconsModule.pick(TablerIcons),
  ]
})
export class ClientModule { }
