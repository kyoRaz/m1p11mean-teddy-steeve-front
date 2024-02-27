import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { ExtraRoutes } from './extra.routing';
import { AppIconsComponent } from './icons/icons.component';
import { AppSamplePageComponent } from '../ui-components/sample-page/sample-page.component';
import { EmployeComponent } from './employe/employe.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SuivitacheComponent } from './employe/suivitache/suivitache.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ExtraRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    NgApexchartsModule
  ],
  declarations: [
    AppIconsComponent,
    EmployeComponent,
    AppSamplePageComponent,
    SuivitacheComponent
  ],
})
export class ExtraModule { }
