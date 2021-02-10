import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { faFemale, faChartLine, faSignOutAlt, faSignInAlt, faHome, faVoteYea, faArchive, faCarCrash, faPeopleCarry, faUserCog, faHeadset, faHouseDamage } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { LevelaccessService } from 'src/app/services/levelaccess.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faFemale = faFemale;
  faChartLine = faChartLine;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faHome = faHome;
  faHouseDamage = faHouseDamage;
  faVoteYea = faVoteYea;
  faArchive = faArchive;
  faCarCrash = faCarCrash;
  faPeopleCarry = faPeopleCarry;
  faUserCog = faUserCog;
  faHeadset = faHeadset;

  public isLogin = false;
  public isLoginAdmin = false;
  public DEMO = false;

  public isLoginCallcenter = false;
  public isLoginSuadmin = false;
  public isLoginTaller = false;

  public nombreUsuario: string;
  public emailUsuario: string;

  public admin = false;
  public taller = false;
  public callcenter = false;
  public suadmin = false;
  public data: any
  public ubicacion: any;
  // rol: string;
  userName: string;

  // roles de usuario

  usuario: RegistroInterface = {
    id: '',
    nombre: '',
    correo: '',
    admin: false,
    suadmin: false,
    tipo: ''
  };
  nomUsuario: any;
  constructor(
    public authService: AuthService,
    private afs: AngularFirestore,
    public router: Router,
    private lvlaccess: LevelaccessService
  ) { }
home(x){
  window.location.replace('/admin/' + x)
}
  ngOnInit() {
    this.afs.collection('Ubicacion').valueChanges().subscribe(x => { this.data = x })

    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.isLogin = true;
        this.lvlaccess.getUserData(user.email).subscribe( (info: RegistroInterface) => {
          this.ubicacion = info.ubicacion;
////console.log('usuario desde lvl:', info);
            if(info.suadmin === true){
              this.isLoginSuadmin = true;
              this.isLoginAdmin = false;
              this.isLoginCallcenter = false;
              this.isLoginTaller = false;
               if(info.nombre == 'DEMO'){
                this.DEMO = true;
              }
            } else if (info.admin === true) {
                this.isLoginAdmin = true;
                this.isLoginSuadmin = false;
                this.isLoginCallcenter = false;
                this.isLoginTaller = false;

            } else if (info.tipo === 'CallCenter') {
              this.isLoginCallcenter = true;
              this.isLoginAdmin = false;
              this.isLoginTaller = false;
              this.isLoginSuadmin = false;
            } else if (info.tipo === 'Taller') {
              this.isLoginTaller = true;
              this.isLoginCallcenter = false;
              this.isLoginAdmin = false;
              this.isLoginSuadmin = false;
            } else {
              console.log('Error de sistema: Usuario sin Permisos')
            }
        });
      } else {
        this.isLogin = false;
      }
    });
  }

  onClickLogOut() {
    this.authService.logout();
  }

}
