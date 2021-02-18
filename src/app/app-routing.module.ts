import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReparacionComponent } from './components/reparacion/reparacion.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { Page404Component } from './components/page404/page404.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NavbardownComponent } from './components/navbardown/navbardown.component';
import { TallerComponent } from './components/taller/taller.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { DashboardtallerComponent } from './components/dashboardtaller/dashboardtaller.component';
import { DashboardcallcenterComponent } from './components/dashboardcallcenter/dashboardcallcenter.component';
import { AgregatorComponent } from './extras/agregator/agregator.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin/:id', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'taller', component: TallerComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'dashboardt', component: DashboardtallerComponent, canActivate: [AuthGuard] },
  { path: 'dashboardcall', component: DashboardcallcenterComponent, canActivate: [AuthGuard] },
  { path: 'agregator', component: AgregatorComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'reparación/:id', component: ReparacionComponent },
  { path: 'thankyou', component: ThankyouComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'encuesta', component: EncuestaComponent },
  { path: 'navbardown', component: NavbardownComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
