import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { RegistroInterface } from '../Models/registro';
import { Ubicacion } from '../Models/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  registroCollection: AngularFirestoreCollection<RegistroInterface>;
  UbicacionCollection: AngularFirestoreCollection<RegistroInterface>;
  registroDoc: AngularFirestoreDocument<RegistroInterface>;
  registros: Observable<Ubicacion[]>;
  registro: Observable<RegistroInterface>;
  id: string;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user = afAuth.authState;
    this.registroCollection = this.afs.collection('Registro', ref => ref);
    this.UbicacionCollection = this.afs.collection('Ubicacion', ref => ref);
  }
  //registro en Google
  registeruser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }
  //Eliminar registro de Firestore
  deleteregistro(registro: RegistroInterface) {
    console.log(registro)
    this.registroDoc = this.afs.doc('Registro/' + registro.id);
    this.registroDoc.delete();
  }
  //Actualizar registro
  updateregistro(registro: RegistroInterface, new_data: RegistroInterface) {
    this.registroDoc = this.afs.doc('Registro/' + registro.id);
    this.registroDoc.update(new_data);
  }
  //Crear registro
  addregistro(registro: RegistroInterface) {
    this.registroCollection.doc(registro.id).set(registro);
  }
  //Identificar con login
  loginEmail(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }
  //Obtener su Autenticacion
  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }
  //Obtener su correo / ID que se firmo
  getid(): string {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // return user.uid;
        return this.id = user.email;
      }
    });
    return this.id;

  }
  //Desconectares
  logout() {
    return this.afAuth.auth.signOut();
  }
  //Obtener Usuario mediante correo
  getUser(id: string) {
    this.registroDoc = this.afs.doc<RegistroInterface>('Registro/' + id);
    this.registro = this.registroDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as RegistroInterface;
        data.id = action.payload.id;

      }
    }));
  }
  //Crear nueva ubicacion
  addubica(ubi: Ubicacion) {
    this.UbicacionCollection.doc(ubi.id).set(ubi)
  }
  //Eliminar ubicacion
  deleteubi(ubi: Ubicacion) {
    this.registroDoc = this.afs.doc('Ubicacion/' + ubi.id);
    this.registroDoc.delete();
  }
  //Actualizar ubicacion
  updateubi(ubi: Ubicacion, new_data: Ubicacion) {
    this.registroDoc = this.afs.doc('Ubicacion/' + ubi.id);
    this.registroDoc.update(new_data);
  }
  getubis(x:string): Observable<Ubicacion[]> {
    this.UbicacionCollection = this.afs.collection('Ubicacion/',ref => ref.where('id','==',x)); //  this.typeCollections = this.afs.collection('Encuestareps', ref => ref.where("fechareporte","==",x)); 
    this.registros = this.UbicacionCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Ubicacion;
        return data;
      });
    }));
    return this.registros;
  }
}
