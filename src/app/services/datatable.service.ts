import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getDocs() {
    return this.afs.collection('typeALL').valueChanges();
  }
}
