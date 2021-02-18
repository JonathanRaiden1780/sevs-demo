import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { faUser, faEnvelope, faKey, faSignInAlt, faUserCog, faMapMarkerAlt, faTrash, faPen, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  faTrash = faTrash;
  faPen = faPen;
  faCheck = faCheck;
  faTimes = faTimes;
  datatable: LocalDataSource;
  datatable2: LocalDataSource;
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
  constructor(
    private router: Router,
    private authservice: AuthService,
    private afs: AngularFirestore
  ) { }

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
    this.authservice.addregistro(value);
  }
  addubi({ value }: { value: Ubicacion }) {
    value.id = this.idubi;
    value.ubicacion = this.ubicacion;
    this.authservice.addubica(value)
  }
  getubi() {
    this.afs.collection('Ubicacion').valueChanges().subscribe(x => { this.data = x; this.datatable2 = x as any })
    this.afs.collection('Registro').valueChanges().subscribe(x => { this.datatable = x as any })
  }
  settings = {
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="fa fa-trash" title="delete"></i>'
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil" style="font-size:32px"></i>',
      saveButtonContent: '<i class="fa fa-check" style="font-size:32px">add</i>',
      cancelButtonContent: '<i class="fa fa-times" style="font-size:32px">cancel</i>',
      confirmSave: true,
    },
    actions: {
      columnTitle: '',
      add: false,
    },
    pager: {
      perPage: 6
    },
    defaultStyle: false,
    attr: {
      class: 'table' // this is custom table scss or css class for table
    },
    columns: {
      nombre: {
        title: 'Nombre'
      },
      correo: {
        title: 'Correo',
        editable: false
      },
      ubicacion: {
        title: 'Ubicacion',
      },
      tipo: {
        title: 'Perfil',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Administrador', title: 'Administrador' }, { value: 'Taller', title: 'Taller' }, { value: 'CallCenter', title: 'CallCenter' },]
          }
        }
      }
    },
  };
  settings2 = {
    delete: {
      confirmDelete: true,
    },
    edit: {
      confirmSave: true,
    },
    actions: {
      columnTitle: '',
      add: false,
    },
    pager: {
      perPage: 5
    },
    defaultStyle: false,
    attr: {
      class: 'table ' // this is custom table scss or css class for table
    },
    columns: {
      id: {
        title: 'ID'
      },
      ubicacion: {
        title: 'Ubicacion',
      }
    },
  };
  onDeleteConfirm(event, x) {
    if (window.confirm('¿Esta seguro que desea eliminarlo?')) {
      if (x == 1) {
        this.authservice.deleteregistro(event.data)
        event.confirm.resolve();
      }
      else {
        this.authservice.deleteubi(event.data)
        event.confirm.resolve();
      }
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event, x) {
    if (window.confirm('¿Son correctos los cambios realizados?')) {
      if (x == 1) {
        this.authservice.updateregistro(event.data, event.newData)
        event.confirm.resolve();
      }
      else {
        this.authservice.updateubi(event.data, event.newData)
        event.confirm.resolve();
      }
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}
