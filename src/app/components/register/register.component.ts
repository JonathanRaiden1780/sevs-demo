import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { FirebaseApp } from 'angularfire2';
import { auth } from 'firebase';
import { faUser, faEnvelope, faKey, faSignInAlt, faUserCog, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

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
  faMapMarkerAlt =   faMapMarkerAlt;


  constructor(
    private router: Router,
    private authservice: AuthService
  ) { }
    public email:string;
    public pass: string;
    public nombre: string;
    public ubicacion: string;
    public admin: boolean;
    public tipo: string;
    public suadmin: boolean;

  ngOnInit() {
  }


  addnewuser(){
    this.authservice.registeruser(this.email,this.pass)
    .then((res)=>{
      this.router.navigate(['/login'])
    }).catch(err=> console.log('err',err.message));
  }
  guardarregistro({value}: {value: RegistroInterface}){
  //  let userID  = auth().currentUser!.uid;
    if(this.tipo == 'Administrador'){
      this.admin = true;
    }
    else{
      this.admin = false;
    }
    this.suadmin = false;
    value.id = this.email;
    value.ubicacion = this.ubicacion;
    value.correo = this.email;
    value.tipo = this.tipo;
    value.nombre = this.nombre;
    value.admin = this.admin;
    value.suadmin = this.suadmin;
    this.authservice.addregistro(value);
  }
}
