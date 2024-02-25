import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeComponent } from './employe.component';
import { RouterModule } from '@angular/router';
import { EmployeRoutes } from './employe.routing';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    EmployeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ]
})
export class EmployeModule { }
