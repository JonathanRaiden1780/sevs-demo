import { Component, OnInit } from '@angular/core';
import { ApoloService } from 'src/app/services/apolo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-agregator',
  templateUrl: './agregator.component.html',
  styleUrls: ['./agregator.component.css']
})
export class AgregatorComponent implements OnInit {

  public status = 1;

  public nuevoaf = new FormGroup ({
    nombre: new FormControl('', Validators.required)
  });

  public mecanico = new FormGroup ({
    nombre: new FormControl('', Validators.required)
  });

  public asesor = new FormGroup ({
    nombre: new FormControl('', Validators.required)
  });

  public cliente = new FormGroup ({
    nombre: new FormControl('', Validators.required)
  })

  rows1: any;
  rows2: any;
  rows3: any;
  rows4: any;
  len1: number;
  len2: number;
  len3: number;
  len4: number;
  leng1: number;
  leng2: number;
  leng3: number;
  leng4: number;

  constructor(
    private _apolo: ApoloService,
    private afs: AngularFirestore
  ) { 
    this.iniciaraf();
    this.inciarmecanico();
    this.iniciarcliente();
    this.inciarasesor();
  }

  ngOnInit() {
    
    this.getData1();
    this.getData2();
    this.getData3();
    this.getData4();
  }

  iniciaraf() {
    this.nuevoaf.setValue({
      nombre: ''
    });
  }

  public nuevoAdminFlota(form) {

    this.leng1 = this.len2+1;

    if(this.status === 1){
      let data = {
        id: this.leng1,
        id_af: this.leng1,
        nombre: form.nombre
      }
      this._apolo.addadministrador( data ).then(() => {
        //console.log('Administrador Flota creado con éxito!');
        this.iniciaraf();
      }, (error) => {
        //console.log('ERROR: ', error);
      });
    } else {
      //console.log('UPDATE status')
    }
  }

  inciarmecanico(){
    this.mecanico.setValue({
      nombre: ''
    });
  }

  public nuevomecanico(form) {

    this.leng2 = this.len3+1;

    if(this.status === 1){
      let data = {
        id: this.leng2,
        id_mecanico: this.leng2,
        nombre: form.nombre
      }
      this._apolo.addmecanico( data ).then(() => {
        //console.log('Mecanico creado con éxito!');
        this.inciarmecanico();
      }, (error) => {
        //console.log('ERROR: ', error);
      });
    } else {
      //console.log('UPDATE status');
    }
  }

  inciarasesor(){
    this.asesor.setValue({
      nombre: ''
    });
  }

  public nuevoasesor(form) {

    this.leng3 = this.len4+1;

    if(this.status === 1){
      let data = {
        id: this.leng3,
        id_asesor: this.leng3,
        nombre: form.nombre
    }
      this._apolo.addasesor( data ).then(() => {
        //console.log('Asesor creado con éxito!');
        this.inciarasesor();
      }, (error) => {
        //console.log('ERROR: ', error);
      });
    } else {
      //console.log('UPDATE status');
    }
  }

  public nuevocliente(form) {

    this.leng4 = this.len1+1;

    if(this.status === 1) {
      let data = {
        id: this.leng4,
        id_cliente: this.leng4,
        nombre: form.nombre
      }
      this._apolo.addcliente( data ).then(() => {
        //console.log('Cliente creado con éxito!');
        this.iniciarcliente();
      }, (error) => {
        //console.log('ERROR: ', error);
      });
    } else {
      //console.log('UPDATE status');
    }
  }

  iniciarcliente(){
    this.cliente.setValue({
      nombre: ''
    });
  }
eliminarm(x: number){
  this._apolo.deletemecanico(x.toString());
}
eliminaraf(x: number){
  this._apolo.deleteadministrador(x.toString());
}
eliminarc(x: number){
  this._apolo.deletecliente(x.toString());
}
eliminaras(x: number){
  this._apolo.deleteasesor(x.toString());
}

 
  getData1() {
    //get coll
        this.afs.collection('Clientes').valueChanges().subscribe((encuesta) => {
       this.rows1 = encuesta ;
     });
     this.afs.collection('Clientes').valueChanges().subscribe((encuesta) => {
      this.len1 = encuesta.length ;
    });
  }
   getData2() {
    //get coll
        this.afs.collection('AdministradoresFlota').valueChanges().subscribe((encuesta) => {
       this.rows2 = encuesta ;
     });
     this.afs.collection('AdministradoresFlota').valueChanges().subscribe((encuesta) => {
      this.len2 = encuesta.length ;
    });
   }
   getData3() {
    //get coll
        this.afs.collection('Mecanicos').valueChanges().subscribe((encuesta) => {
       this.rows3 = encuesta ;
     });
     this.afs.collection('Mecanicos').valueChanges().subscribe((encuesta) => {
      this.len3 = encuesta.length ;
    });
   }
   getData4() {
    //get coll
        this.afs.collection('Asesor').valueChanges().subscribe((encuesta) => {
       this.rows4 = encuesta ;
     });
     this.afs.collection('Asesor').valueChanges().subscribe((encuesta) => {
      this.len4 = encuesta.length ;
    });
   }
}
