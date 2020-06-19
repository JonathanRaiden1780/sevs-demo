import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AdminFlota } from '../Models/admin-flota';
import { Mecanico } from '../Models/mecanico';
import { Cliente } from '../Models/cliente';
import { asesor } from '../Models/asesor';

@Injectable({
  providedIn: "root"
})
export class ApoloService {
  public admFlotaCollection: AngularFirestoreCollection<AdminFlota>;
  public mecanicosCollection: AngularFirestoreCollection<Mecanico>;
  public clientesCollection: AngularFirestoreCollection<Cliente>;
  public asesorCollection: AngularFirestoreCollection<asesor>;

  constructor(private afs: AngularFirestore) {
    this.admFlotaCollection = this.afs.collection("AdministradoresFlota",ref => ref);
    this.mecanicosCollection = this.afs.collection("Mecanicos", ref => ref);
    this.clientesCollection = this.afs.collection("Clientes", ref => ref);
    this.asesorCollection = this.afs.collection("Asesor", ref => ref);
  }
//-------------------------------------------------------------------------------------------
  addadministrador(data: AdminFlota) {
    return this.admFlotaCollection.doc(data.id_af.toString()).set(data);
  }
  addmecanico(data: Mecanico) {
    return this.mecanicosCollection.doc(data.id_mecanico.toString()).set(data);
  }
  addcliente(data: Cliente) {
    return this.clientesCollection.doc(data.id_cliente.toString()).set(data);
  }
  addasesor(data: asesor) {
    return this.asesorCollection.doc(data.id_asesor.toString()).set(data);
  }
//-------------------------------------------------------------------------------------------
  updateadministrador(data: AdminFlota) {
    this.admFlotaCollection.doc(data.id_af.toString()).update(data);
  }
  updatemecanico(data: Mecanico) {
    this.mecanicosCollection.doc(data.id_mecanico.toString()).update(data);
  }
  updatecliente(data: Cliente) {
    this.clientesCollection.doc(data.id_cliente.toString()).update(data);
  }
  updateasesor(data: asesor) {
    this.asesorCollection.doc(data.id_asesor.toString()).update(data);
  }
//-------------------------------------------------------------------------------------------
  deleteadministrador(data: string) {
    this.admFlotaCollection.doc(data).delete();
  }
  deletemecanico(data: string) {
    this.mecanicosCollection.doc(data).delete();
  }
  deletecliente(data: string) {
    this.clientesCollection.doc(data).delete();
  }
  deleteasesor(data: string) {
    this.asesorCollection.doc(data).delete();
  }

}
