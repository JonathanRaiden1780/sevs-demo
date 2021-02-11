import { Component, OnInit } from '@angular/core';
import { faFemale, faChartLine, faSignOutAlt, faSignInAlt, faHome, faVoteYea, faParachuteBox } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LevelaccessService } from 'src/app/services/levelaccess.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  public data: any;
  faFemale = faFemale;
  faChartLine = faChartLine;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faHome = faHome;
  faVoteYea = faVoteYea;
  faParachuteBox = faParachuteBox;
  ubi: string;
  constructor(
    public authService: AuthService,
    public router: Router,
    private afs: AngularFirestore,
    private lvlaccess: LevelaccessService
  ) { }
  GOTO() {
    this.router.navigate(['/admin/' + this.ubi]);
  }
  ngOnInit() {
    this.afs.collection('Ubicacion').valueChanges().subscribe(x => { this.data = x })

    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.lvlaccess.getUserData(auth.email).subscribe((info: RegistroInterface) => {
          if (info.ubicacion == 'ALL') {
            this.ubi = this.data[0].ubicacion;
          } else {
            for (var u = 0; u <= this.data.length; u++) {
              if (info.ubicacion == this.data[u].ubicacion) {
                this.ubi = this.data[u].ubicacion;
              }
            }
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
