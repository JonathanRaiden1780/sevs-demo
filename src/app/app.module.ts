import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { NgxDatatableModule} from '@swimlane/ngx-datatable'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgxSpinnerModule } from 'ngx-spinner';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatNativeDateModule, MatIconModule, MatFormFieldModule, MatTabsModule, MatCheckboxModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDatepickerModule, MatRadioButton, MatRadioModule } from '@angular/material';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReparacionComponent } from './components/reparacion/reparacion.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/shared/footer/footer.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { EncuestaService } from './services/encuesta.service';
import { NavbardownComponent } from './components/navbardown/navbardown.component';
import { TallerComponent } from './components/taller/taller.component';
import { DashboardtallerComponent } from './components/dashboardtaller/dashboardtaller.component';
import { DashboardcallcenterComponent } from './components/dashboardcallcenter/dashboardcallcenter.component';


import { ChartsModule } from 'ng2-charts';
import { ExportAsModule } from 'ngx-export-as';
import { HttpModule } from '@angular/http';
import { AgregatorComponent } from './extras/agregator/agregator.component';
import { ModeliComponent } from './Modals/modeli/modeli.component';
import { AdmincComponent } from './components/adminc/adminc.component';
import { ReportsCComponent } from './components/reports-c/reports-c.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdmincComponent,
    DashboardcallcenterComponent,
    DashboardtallerComponent,
    EncuestaComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NavbardownComponent,
    Page404Component,
    FooterComponent,
    RegisterComponent,
    ReparacionComponent,
    ReportsComponent,
    ReportsCComponent,
    TallerComponent,
    ThankyouComponent,
    AgregatorComponent,
    ModeliComponent
  ],
  imports: [
    ChartsModule,
    NgxDatatableModule,
    NgxSpinnerModule,
    MatStepperModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    BrowserModule,
    ExportAsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FlashMessagesModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NgbModule,
    NgbModalModule,
    Ng2SmartTableModule
  ],
  entryComponents: [],
  providers: [
              AuthService,
              AuthGuard,
              FlashMessagesService,
              EncuestaService

            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
