import { Component, OnInit, Input } from '@angular/core';
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import {EncuestaexInterface} from '../../Models/Encuestaex';
import {EncuestaService} from '../../services/encuesta.service';
import {Observable} from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name:string;
  tipo:string;
  idenc: string;
  Encuesta: Observable<EncuestaexInterface>;
  EncuestasDoc: AngularFirestoreDocument<EncuestaexInterface>;

  constructor(
    public encuestase:EncuestaService,
    private afs: AngularFirestore,
    public router: Router
  ) {
    
  } 
  
onEncuesta({value}: {value: EncuestaexInterface}){
  this.name=this.idenc.toUpperCase();
  this.afs.firestore.doc('Encuestareps/'+this.name).get()
  .then(docSnapshot => {
    if (docSnapshot.exists == true) {
      this.afs.collection('Encuestareps').doc(this.name).valueChanges().pipe(take(1)).subscribe(res => {this.arrass(res)} );  
    }
    else{
      this.afs.firestore.doc('EncuestarepsC/'+this.name).get().
      then(docSnapshot => {
        if(docSnapshot.exists == true){
          this.afs.collection('EncuestarepsC').doc(this.name).valueChanges().pipe(take(1)).subscribe(res => {this.arrass(res)} );  
        }
      });
    }
  });
}
  arrass(x: EncuestaexInterface): string {
    this.tipo= x.tipo;
    if(x.contestada == true){
      confirm("Encuestada ya calificada, muchas gracias");
    }
    else{
      this.router.navigate(['/'+ this.tipo+'/'+this.name]);
    }
   return this.tipo;
 }

  ngOnInit() {
  }
  
  faVoteYea = faVoteYea;
}


