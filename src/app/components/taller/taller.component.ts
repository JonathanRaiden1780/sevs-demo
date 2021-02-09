import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { faCarCrash, faShippingFast, faNotesMedical, faEnvelope, faMobileAlt, faFileInvoice, faCarSide, faTachometerAlt, faGasPump, faCarAlt, faCheck, faTimes, faUser, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { LevelaccessService } from 'src/app/services/levelaccess.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { Router } from '@angular/router';
@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css']
})
export class TallerComponent implements OnInit {
  /* Variables de opciones de formulario */
  value: string;
  opcion: string;
  name: string;
  idenc: string;

  cliente: string;
  /* Iconos */
  faCarCrash = faCarCrash;

  public isLogin = false;
  public isLoginAdmin = false;
  public isLoginCallcenter = false;
  public isLoginSuadmin = false;
  public isLoginTaller = false;
  public isLoginALL = false;
  public data: any;
  public ubicacion: string;

  fechareporte: string;
  mod: any = {};
  meses: string[] = ["Mes", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  public ubi: string;

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    public router: Router,
    private lvlaccess: LevelaccessService,
    public encuestase: EncuestaService) {
    const today = new Date();
    this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.mod.mesnumero = today.getMonth() + 1;
    this.mod.año = today.getFullYear();
  }
  ngOnInit() {
    this.getubi()
    this.authService.getAuth().subscribe(user => {
      if (user) {
        this.isLogin = true;
        this.lvlaccess.getUserData(user.email).subscribe((info: RegistroInterface) => {
          if (info.suadmin === true) {
            this.ubi = info.ubicacion;
            this.isLoginSuadmin = true;
            this.isLoginAdmin = false;
            this.isLoginCallcenter = false;
            this.isLoginTaller = false;
            if (this.ubi == 'ALL') {
              this.isLoginALL = true;
            }
            else {
              for (var u = 0; u <= this.data.length; u++) {
                console.log(this.data[u].ubicacion)

                if (this.ubi == this.data[u].ubicacion) {
                  this.ubicacion = this.data[u].id;
                }
              }
            }
          } else if (info.admin === true) {
            this.ubi = info.ubicacion;
            this.isLoginAdmin = true;
            this.isLoginSuadmin = false;
            this.isLoginCallcenter = false;
            this.isLoginTaller = false;
            if (this.ubi == 'ALL') {
              this.isLoginALL = true;
            }
            else {
              for (var u = 0; u <= this.data.length; u++) {
                console.log(this.data[u].ubicacion)

                if (this.ubi == this.data[u].ubicacion) {
                  this.ubicacion = this.data[u].id;
                }
              }
            }
          } else if (info.tipo === 'CallCenter') {
            this.ubi = info.ubicacion;
            this.isLoginCallcenter = true;
            this.isLoginAdmin = false;
            this.isLoginTaller = false;
            this.isLoginSuadmin = false;
          } else if (info.tipo === 'Taller') {
            this.ubi = info.ubicacion;
            this.isLoginTaller = true;
            this.isLoginCallcenter = false;
            this.isLoginAdmin = false;
            this.isLoginSuadmin = false;
            if (this.ubi == 'ALL') {
              this.isLoginALL = true;
            }
            else {
              for (var u = 0; u <= this.data.length; u++) {
                console.log(this.data[u].ubicacion)
                if (this.ubi == this.data[u].ubicacion) {
                  this.ubicacion = this.data[u].id;
                }
              }
            }
          } else {
            console.log('Error de sistema: Usuario sin Permisos')
          }
        });
      } else {
        this.isLogin = false;
      }
    });
    for (var mc = 1; mc <= 12; mc++) {
      if (this.mod.mesnumero == mc) {
        this.mod.mes = this.meses[mc];
      }
    }
    this.fechareporte = this.mod.mes + this.mod.año;
  }
  getubi() {
    this.afs.collection('Ubicacion').valueChanges().subscribe(x => { this.data = x })
  }
  onEncuesta({ value }: { value: EncuestaexInterface }) {
    var ubicaciones: string;
    if (this.isLoginALL == true) {
      for (var u = 0; u < this.data.length; u++) {
        if (this.ubicacion == this.data[u].id) {
          ubicaciones = this.data[u].ubicacion;
        }
      }
    }
    else {
      ubicaciones = this.ubi
    }
    this.name = this.ubicacion + this.idenc.toUpperCase();
    this.opcion = 'reparación'
    value.Folio = this.name;
    value.id = this.name;
    value.tipo = this.opcion;
    value.validacion = 'falta_validar';
    value.contestada = false;
    value.ubicacion = ubicaciones;
    value.fecharegistro = this.fechareporte;
    //___________________________________________________________________________________
    this.afs.firestore.doc('type/' + ubicaciones + '/Encuestas/' + this.name).get() //this.afs.firestore.doc('Encuestareps/' + this.name).get()
      .then(docSnapshot => {
        if (docSnapshot.exists === true) {
          confirm('Ya existe el registro ' + this.name);
        }
        else {
          var año = this.mod.año as string + '_encuestas'
          this.encuestase.getcontador(ubicaciones, this.fechareporte, año);
          this.encuestase.addEncuestare(value);
          this.encuestase.addTypeAll(value);
          confirm('Registro ' + this.name + ' guardado');
        }
      });
  }
}


