import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { StatComponent } from './stat/stat.component';
import { MaterialModule } from 'src/app/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DepenseComponent } from './depense/depense.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StatComponent,
    DepenseComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MaterialModule,
    NgApexchartsModule,
    FormsModule,
  ]
})
export class ManagerModule { }
