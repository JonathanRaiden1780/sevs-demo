import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  meses: string[] = ["Mes", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  mod: any = {};

  constructor(
    private afs: AngularFirestore,
  ) {
    const today = new Date();
    this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.mod.mesnumero = today.getMonth() + 1;
    this.mod.año = today.getFullYear();
    for (let mc = 1; mc <= 12; mc++) {
      if (this.mod.mesnumero == mc) {
        this.mod.mes = this.meses[mc];
      }
    }
  }
  getDocs() {
    return this.afs.collection('typeALL').doc(this.mod.año).collection(this.mod.mes).valueChanges();
  }
}
