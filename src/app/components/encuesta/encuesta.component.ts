import { Component, OnInit } from '@angular/core';
import { faFemale, faChartLine, faSignOutAlt, faSignInAlt, faHome, faVoteYea, faParachuteBox } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LevelaccessService } from 'src/app/services/levelaccess.service';
import { RegistroInterface } from 'src/app/Models/registro';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;

  faFemale = faFemale;
  faChartLine = faChartLine;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faHome = faHome;
  faVoteYea = faVoteYea;
  faParachuteBox = faParachuteBox;
ubi:string;
  constructor(
    public authService: AuthService,
    public router: Router,
    private lvlaccess: LevelaccessService
  ) { }
GOTO(){
  if(this.ubi == 'Centenario'){
    this.router.navigate(['/adminc']);
  }else{
    this.router.navigate(['/admin']);
  }
  //
}
  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.isLogin = true;
        this.lvlaccess.getUserData(auth.email).subscribe( (info: RegistroInterface) => {
          ////console.log('usuario desde lvl:', info);
                      if(info.ubicacion == 'Centenario'){
                       this.ubi = 'Centenario';
                      } else if (info.ubicacion == 'Viga') {
                        this.ubi = 'Viga';
                      } else {
                        //console.log('Error de sistema: Usuario sin Permisos')
                      }
                  });
        this.nombreUsuario = auth.displayName;
        this.emailUsuario = auth.email;
      } else {
        this.isLogin = false;
      }
    });
  }

  onClickLogOut() {
    this.authService.logout();
  }
}
