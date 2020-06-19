import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { RegistroInterface } from '../Models/registro';

@Injectable({
  providedIn: 'root'
})
export class LevelaccessService {

  public levelCollection: AngularFirestoreCollection<RegistroInterface>;

  constructor(
    private afs: AngularFirestore
  ) {
     this.levelCollection = this.afs.collection('Registro', ref => ref);
   }

  getUserData( data: any) {
    return this.levelCollection.doc(data).valueChanges();
  }

}
