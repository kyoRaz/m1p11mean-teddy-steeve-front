import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { StatComponent } from './stat/stat.component';
import { MaterialModule } from 'src/app/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    StatComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MaterialModule,
    NgApexchartsModule
  ]
})
export class ManagerModule { }
