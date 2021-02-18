import { Injectable } from '@angular/core';
import { EncuestaexInterface } from '../Models/Encuestaex';
import { ContadorInterface } from '../Models/contador';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegistroCompletoInterface } from '../Models/Registrocompleto';
import { FirebaseFirestore } from 'angularfire2';
import * as firebase from 'firebase';
import { Global } from '../Models/global';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  EncuestareCollection: AngularFirestoreCollection<EncuestaexInterface>;
  GlobalCollection: AngularFirestoreCollection<EncuestaexInterface>;
  EncuestareCollectionC: AngularFirestoreCollection<EncuestaexInterface>;
  typeCollectionALL: AngularFirestoreCollection<EncuestaexInterface>;
  db: FirebaseFirestore;
  typeCollections: AngularFirestoreCollection<EncuestaexInterface>;
  EncuestaexDoc: AngularFirestoreDocument<EncuestaexInterface>;
  EncuestaexDoc1: AngularFirestoreDocument<ContadorInterface>;
  EncuestaexDoc2: AngularFirestoreDocument<ContadorInterface>;
  Encuestaexes: Observable<EncuestaexInterface[]>;
  Globales: Observable<Global[]>;
  contadorex: Observable<ContadorInterface[]>;
  meses: string[] = ["Mes", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  contadores: number;
  mod: any = {};
  fechareporte: string;
  constructor(
    private afs: AngularFirestore) {
    const today = new Date();
    this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.mod.mesnumero = today.getMonth() + 1;
    this.mod.año = today.getFullYear();
    for (let mc = 1; mc <= 12; mc++) {
      if (this.mod.mesnumero == mc) {
        this.mod.mes = this.meses[mc];
      }
    }
    this.fechareporte = this.mod.mes + this.mod.año;
    this.typeCollectionALL = this.afs.collection('typeALL', ref => ref);
    this.GlobalCollection = this.afs.collection('Global', ref => ref);
  }
  //___________________________________________________________________ Delete Encuesta
  deleteType(Encuestaex: EncuestaexInterface, ubicacion: string) {
    this.EncuestaexDoc = this.afs.doc('type/' + ubicacion + '/' + this.fechareporte + '/' + Encuestaex.id);
    this.EncuestaexDoc.delete();
  }
  //___________________________________________________________________ Update Encuesta
  //Update registro completo
  updateEncuestarep(Encuestaex: RegistroCompletoInterface, ubicacion: string) {
    this.EncuestaexDoc = this.afs.doc('type/' + ubicacion + '/' + this.fechareporte + '/' + Encuestaex.id);
    this.EncuestaexDoc1 = this.afs.doc('type/' + ubicacion + '/Encuestas/' + Encuestaex.id);
    this.EncuestaexDoc1.update(Encuestaex);
    this.EncuestaexDoc.update(Encuestaex);
  }
  updateTypeALL(Encuestaex: RegistroCompletoInterface) {
    this.EncuestaexDoc = this.afs.doc('typeALL/' + this.mod.año + '/' + this.mod.mes + '/' + Encuestaex.id);
    this.EncuestaexDoc.update(Encuestaex).then(function () {
      confirm('Registro ' + Encuestaex.id + ' guardado');
    })
      .catch(function (error) {
        // The document probably doesn't exist.
        confirm('No se pudo guardar correctamente ' + error);
      });
  }
  //todo este bloque realiza el conteo de registros y contestadas
  getcontador(x: string, y: string, z: string) {
    this.afs.firestore.collection('type').doc(x).collection(y).get().then(doc => {
      if (doc.docs.length > 0) {
        this.afs.collection('type').doc(x).collection(y).doc('registro').update({ contador: firebase.firestore.FieldValue.increment(1) })
      }
      else {
        this.add(x, y, z);
      }
    })
    this.afs.firestore.collection('type').doc(x).collection(z).get().then(doc => {
      if (doc.docs.length > 0) {
        this.afs.collection('type').doc(x).collection(z).doc('registro').update({ contador: firebase.firestore.FieldValue.increment(1) })
      }
      else {
        this.add(x, y, z);
      }
    })
    this.afs.firestore.collection('type').doc(x).get().then(doc => {
      if (doc.exists == true) {
        this.afs.collection('type').doc(x).update({ registros: firebase.firestore.FieldValue.increment(1) })
      }
      else {
        this.add(x, y, z);
      }
    })
  }
  add(x: string, y: string, z: string) {
    this.afs.collection('type').doc(x).collection(y).doc('contestadas').set({ contador: 0 })
    this.afs.collection('type').doc(x).collection(y).doc('registro').set({ contador: 0 })
    this.afs.collection('type').doc(x).collection(y).doc('registro').update({ contador: firebase.firestore.FieldValue.increment(1) })

    this.afs.collection('type').doc(x).set({ contestadas: 0 })
    this.afs.collection('type').doc(x).set({ registros: 0 })
    this.afs.collection('type').doc(x).update({ registros: firebase.firestore.FieldValue.increment(1) })

    this.afs.collection('type').doc(x).collection(z).doc('contestadas').set({ contador: 0 })
    this.afs.collection('type').doc(x).collection(z).doc('registro').set({ contador: 0 })
    this.afs.collection('type').doc(x).collection(z).doc('registro').update({ contador: firebase.firestore.FieldValue.increment(1) })
  }
  //___________________________________________________________________ Add Encuesta
  addEncuestare(Encuestaex: EncuestaexInterface) {
    this.afs.collection('type').doc(Encuestaex.ubicacion).collection(this.fechareporte).doc(Encuestaex.id).set(Encuestaex)
    this.afs.collection('type').doc(Encuestaex.ubicacion).collection('Encuestas').doc(Encuestaex.id).set(Encuestaex)

  }
  addTypeAll(Encuestaex: EncuestaexInterface) {
    // this.EncuestaexCollection.add(Encuestaex);
    this.typeCollectionALL.doc(this.mod.año.toString()).collection(this.mod.mes).doc(Encuestaex.id).set(Encuestaex);
  }
  addGlobal(Encuestaex: Global) {
    this.GlobalCollection.doc(this.mod.año.toString()).collection(this.mod.mes).doc(Encuestaex[0].ubicacion).set(Encuestaex[0]);
  }
  //___________________________________________________________________
  //Get collections
  //___________________________________________________________________
  getcontador2(x: string, y: string, z: string) {
    this.afs.collection('type').doc(x).collection(y).doc('contestadas').update({ contador: firebase.firestore.FieldValue.increment(1) })
    this.afs.collection('type').doc(x).update({ contestadas: firebase.firestore.FieldValue.increment(1) })
    this.afs.collection('type').doc(x).collection(z).doc('contestadas').update({ contador: firebase.firestore.FieldValue.increment(1) })
  }

  getAllEncuestas(x: string, date: string): Observable<EncuestaexInterface[]> {
    this.typeCollections = this.afs.collection('type/' + x + '/' + 'Encuestas', ref => ref.where("fechareporte", "==", date)); //  this.typeCollections = this.afs.collection('Encuestareps', ref => ref.where("fechareporte","==",x)); 
    this.Encuestaexes = this.typeCollections.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as EncuestaexInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
    return this.Encuestaexes;
  }
  getglobal(): Observable<Global[]> {
    this.GlobalCollection = this.afs.collection('Global/' + this.mod.año + '/' + this.mod.mes); //  this.typeCollections = this.afs.collection('Encuestareps', ref => ref.where("fechareporte","==",x)); 
    this.Globales = this.GlobalCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Global;
          return data;
        });
      }));
    return this.Globales;
  }
}
