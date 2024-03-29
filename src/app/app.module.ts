import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';

// http and interceptor
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { MyPaginatorIntl } from './paginator-intl';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatStepperModule } from '@angular/material/stepper';


// Importer les données de locale pour le français
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from './environments/environment';

// Enregistrer les données de locale pour le français
registerLocaleData(localeFr);

export function tokenGetter() {
  let token = localStorage.getItem("token");
  return token;
}


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        headerName: 'x-auth-token',
        authScheme: ''
      },
    }),
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    DragDropModule,
    MatStepperModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: MatPaginatorIntl, useClass: MyPaginatorIntl },
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
