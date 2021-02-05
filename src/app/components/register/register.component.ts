import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { faUser, faEnvelope, faKey, faSignInAlt, faUserCog, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Ubicacion } from 'src/app/Models/ubicacion';
import { AngularFirestore } from 'angularfire2/firestore';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faUser = faUser;
  faEnvelope = faEnvelope;
  faKey = faKey;
  faSignInAlt = faSignInAlt;
  faUserCog = faUserCog;
  faMapMarkerAlt = faMapMarkerAlt;
  datatable: LocalDataSource;


  constructor(
    private router: Router,
    private authservice: AuthService,
    private afs: AngularFirestore
  ) { }
  public email: string;
  public pass: string;
  public nombre: string;
  public data: any;
  public idubi: string;
  public ubicacion: string;
  public ubicacion_u: string;
  public admin: boolean;
  public tipo: string;
  public suadmin: boolean;

  ngOnInit() {
    this.getubi()
  }
  addnewuser() {
      this.authservice.registeruser(this.email, this.pass)
      .then((res) => {
        this.router.navigate(['/login'])
      }).catch(err => console.log('err', err.message)); 
  }
  guardarregistro({ value }: { value: RegistroInterface }) {
    //  let userID  = auth().currentUser!.uid;
    if (this.tipo == 'Administrador') {
      this.admin = true;
    }
    else {
      this.admin = false;
    }
    this.suadmin = false;
    value.id = this.email;
    value.ubicacion = this.ubicacion_u;
    value.correo = this.email;
    value.tipo = this.tipo;
    value.nombre = this.nombre;
    value.admin = this.admin;
    value.suadmin = this.suadmin;
    console.log(value)
    this.authservice.addregistro(value);
  }
  addubi({ value }: { value: Ubicacion }) {
    value.id = this.idubi;
    value.ubicacion = this.ubicacion;
    this.authservice.addubica(value)
  }
  getubi(){
    this.afs.collection('Ubicacion').valueChanges().subscribe(x => {this.data = x})
  }
  /* settings = {
    actions: {
      edit: false,
      columnTitle: '',
      delete: false,
      add: false,
      custom: [
        {
          name: 'entrada',
          title: '<i class="fa fa-plus" title="entrada"></i><br>'
        },
        {
          name: 'salida',
          title: '<i class="fa fa-minus" title="sailda"></i><br>'
        }
      ],
    },
    pager: {
      perPage: 5
    },
    defaultStyle: false,
    attr: {
      class: 'table ' // this is custom table scss or css class for table
    },

    columns: {
      nplatillo: {
        title: 'Platillo'
      },
      cplatillo: {
        title: 'Categoria'

      },
      cantidad: {
        title: 'Cantidad',
        filter: false
      },

    },
  }; */
}
