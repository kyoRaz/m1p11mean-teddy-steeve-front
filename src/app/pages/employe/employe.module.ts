import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeComponent } from './employe.component';
import { RouterModule } from '@angular/router';
import { EmployeRoutes } from './employe.routing';



@NgModule({
  declarations: [
    EmployeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeRoutes),
  ]
})
export class EmployeModule { }
