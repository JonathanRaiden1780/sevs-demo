import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { faSignInAlt, faAddressCard, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { RegistroInterface } from 'src/app/Models/registro';
import { AngularFirestore } from 'angularfire2/firestore';
import { LevelaccessService } from 'src/app/services/levelaccess.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faSignInAlt = faSignInAlt;
  faAddressCard = faAddressCard;
  faKey = faKey;
  faEnvelope = faEnvelope;

  public email: string;
  public correo: string;
  public password: string;

  public isLogin = false;
  public isLoginAdmin = false;
  public isLoginCallcenter = false;
  public isLoginSuadmin = false;
  public isLoginTaller = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService,
    public afs: AngularFirestore,
    private lvlaccess: LevelaccessService

  ) { }
user: RegistroInterface = {
  id: '',
  nombre: '',
  correo: '',
  admin: false,
  suadmin: false,
  tipo: ''
};

ngOnInit() {

  }

  onSubmitLogin() {
    this.authService.loginEmail(this.email, this.password)
    .then( (res) => {
      this.flashMensaje.show('Bienvenido a SEVS',
      {cssClass: 'alert-success', timeout: 4000 });
      this.onLoginRedirect( this.email );
    }).catch((err) => {
      this.flashMensaje.show(err.message,
      {cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['/login']);
    });

  }

  onLoginRedirect( email: string ) {
      this.authService.getAuth().subscribe( user => {
        if (user) {
          this.isLogin = true;
          this.lvlaccess.getUserData(user.email).subscribe( (info: RegistroInterface) => {
              if(info.suadmin === true){
                this.isLoginSuadmin = true;
                this.isLoginAdmin = false;
                this.isLoginCallcenter = false;
                this.isLoginTaller = false;
                this.router.navigate(['/admin']);
              } else if (info.admin === true) {
                this.isLoginAdmin = true;
                this.isLoginSuadmin = false;
                this.isLoginCallcenter = false;
                this.isLoginTaller = false;
                if(info.ubicacion == 'Taller2'){
                  this.router.navigate(['/adminc']);
                }else{
                  this.router.navigate(['/admin']);
                }
              } else if (info.tipo === 'CallCenter') {
                this.isLoginCallcenter = true;
                this.isLoginAdmin = false;
                this.isLoginTaller = false;
                this.isLoginSuadmin = false;
                this.router.navigate(['/dashboardcall']);
              } else if (info.tipo === 'Taller') {
                this.isLoginTaller = true;
                this.isLoginCallcenter = false;
                this.isLoginAdmin = false;
                this.isLoginSuadmin = false;
                this.router.navigate(['/taller']);
              } else {
                this.flashMensaje.show('Error de sistema: Usuario sin Permisos',
                  {cssClass: 'alert-danger', timeout: 4000 });
                  this.router.navigate(['/login']);
              }
          });
        } else {
          this.isLogin = false;
        }
      });
    }

}
