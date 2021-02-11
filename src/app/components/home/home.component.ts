import { Component, OnInit, Input } from '@angular/core';
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { EncuestaexInterface } from '../../Models/Encuestaex';
import { EncuestaService } from '../../services/encuesta.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string;
  faVoteYea = faVoteYea;
  tipo: string;
  idenc: string;
  Encuesta: Observable<EncuestaexInterface>;
  
  fechareporte: string;
  mod: any = {};
  meses:string[] = ["Mes","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  EncuestasDoc: AngularFirestoreDocument<EncuestaexInterface>;
  public data: any;
  constructor(
    
    public encuestase: EncuestaService,
    private afs: AngularFirestore,
    public router: Router
  ) {
    const today = new Date();
    this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.mod.mesnumero =  today.getMonth()+1;
    this.mod.año =  today.getFullYear();
  }
  onEncuesta({ value }: { value: EncuestaexInterface }) {
    const search = this.idenc.slice(0, 2)
    ubicacion = 'NA'
    for (var u = 0; u < this.data.length; u++) {
      if (search == this.data[u].id) {
        var ubicacion = this.data[u].ubicacion;
      }
    }
    if (this.idenc.length <= 1 || ubicacion == 'NA') {
      alert("Favor de ingresar un número de orden correcto")
    }
    else {
      this.name = this.idenc.toUpperCase();
      this.afs.firestore.doc('type/' + ubicacion + '/Encuestas/' + this.name).get()
        .then(docSnapshot => {
          if (docSnapshot.exists == true) {
            this.afs.collection('type').doc(ubicacion).collection(this.fechareporte).doc(this.name).valueChanges().pipe(take(1)).subscribe(res => { this.arrass(res) });
          }
          else {
            alert("Registro Inexistente")
          }
        });
    }
  }
  arrass(x: EncuestaexInterface): string {
    this.tipo = x.tipo;
    if (x.contestada == true) {
      confirm("Encuestada ya calificada, muchas gracias");
    }
    else {
      this.router.navigate(['/' + this.tipo + '/' + this.name]);
    }
    return this.tipo;
  }

  ngOnInit() {
    this.afs.collection('Ubicacion').valueChanges().subscribe(x => { this.data = x })
    this.cont();
  }

  cont() {
    for(var mc=1; mc<=12; mc++){
      if(this.mod.mesnumero == mc){
        this.mod.mes = this.meses[mc];
      }
    }
    this.fechareporte = this.mod.mes+this.mod.año;
  }
  
}


