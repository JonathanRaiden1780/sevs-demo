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
  tipo: string;
  idenc: string;
  Encuesta: Observable<EncuestaexInterface>;
  EncuestasDoc: AngularFirestoreDocument<EncuestaexInterface>;
  public data: any;
  constructor(
    public encuestase: EncuestaService,
    private afs: AngularFirestore,
    public router: Router
  ) {
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
            this.afs.collection('type').doc(ubicacion).collection('Encuestas').doc(this.name).valueChanges().pipe(take(1)).subscribe(res => { this.arrass(res) });
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
  }

  faVoteYea = faVoteYea;
}


