import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { DatePipe } from '@angular/common';
import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { AppChipsComponent } from '../extra/tache/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppDialogComponent } from '../client/dialog/dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    DragDropModule,
    MatStepperModule
  ],
  declarations: [
    AppChipsComponent,
    AppListsComponent,
    AppDialogComponent,
  ],
})
export class UicomponentsModule {}
