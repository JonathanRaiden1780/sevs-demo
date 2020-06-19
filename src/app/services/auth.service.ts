import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { RegistroInterface } from '../Models/registro';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  registroCollection: AngularFirestoreCollection<RegistroInterface>;
  registroDoc: AngularFirestoreDocument<RegistroInterface>;
  registros: Observable<RegistroInterface[]>;
  registro: Observable<RegistroInterface>;

  id: string;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user = afAuth.authState;
    this.registroCollection = this.afs.collection('Registro', ref => ref);
  }

  registeruser(email: string, pass: string) {
    return new Promise((resolve , reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData => resolve(userData),
      err => reject (err));
    });
  }
  deleteregistro(registro: RegistroInterface) {
    this.registroDoc = this.afs.doc('Registro/' + registro.id);
    this.registroDoc.delete();
  }
   updateregistro(registro: RegistroInterface) {
      this.registroDoc = this.afs.doc('Registro/' + registro.id);
      this.registroDoc.update(registro);
    }


  addregistro(registro: RegistroInterface) {
    // this.registroCollection.add(registro);
    this.registroCollection.doc(registro.id).set(registro);
  }

  loginEmail(email: string, pass: string) {
    return new Promise((resolve , reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then( userData => resolve(userData),
      err => reject (err));
    });
  }

  getAuth() {
    return this.afAuth.authState.pipe(map( auth => auth ));
  }
  
  getid(): string {
    // return this.afAuth.authState.pipe(map( auth => auth.uid ));
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // return user.uid;
        return this.id = user.email;
      }
    });
    return this.id;

  }

  logout() {
    return this.afAuth.auth.signOut();
  }
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


}
