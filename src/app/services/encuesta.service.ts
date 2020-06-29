import { Injectable } from '@angular/core';
import {EncuestaexInterface} from '../Models/Encuestaex';
import {ContadorInterface} from '../Models/contador';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, FirestoreSettingsToken} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import { RegistroCompletoInterface } from '../Models/Registrocompleto';
import { firestore } from 'firebase';
import { FirebaseFirestore } from 'angularfire2';
 
@Injectable({
 providedIn: 'root'
})
export class EncuestaService {
 EncuestareCollection: AngularFirestoreCollection<EncuestaexInterface>;
 typeCollection: AngularFirestoreCollection<EncuestaexInterface>;
 EncuestareCollectionC: AngularFirestoreCollection<EncuestaexInterface>;
 typeCollectionALL: AngularFirestoreCollection<EncuestaexInterface>;

//VIGA REPORTES
   ccp1mb: AngularFirestoreCollection<ContadorInterface>;
   ccp1b: AngularFirestoreCollection<ContadorInterface>;
   ccp1r: AngularFirestoreCollection<ContadorInterface>;
   ccp1m: AngularFirestoreCollection<ContadorInterface>;
   ccp1mm: AngularFirestoreCollection<ContadorInterface>;
   ccp2mb: AngularFirestoreCollection<ContadorInterface>;
   ccp2b: AngularFirestoreCollection<ContadorInterface>;
   ccp2r: AngularFirestoreCollection<ContadorInterface>;
   ccp2m: AngularFirestoreCollection<ContadorInterface>;
   ccp2mm: AngularFirestoreCollection<ContadorInterface>;
   ccp3mb: AngularFirestoreCollection<ContadorInterface>;
   ccp3b: AngularFirestoreCollection<ContadorInterface>;
   ccp3r: AngularFirestoreCollection<ContadorInterface>;
   ccp3m: AngularFirestoreCollection<ContadorInterface>;
   ccp3mm: AngularFirestoreCollection<ContadorInterface>;
   ccp4mb: AngularFirestoreCollection<ContadorInterface>;
   ccp4b: AngularFirestoreCollection<ContadorInterface>;
   ccp4r: AngularFirestoreCollection<ContadorInterface>;
   ccp4m: AngularFirestoreCollection<ContadorInterface>;
   ccp4mm: AngularFirestoreCollection<ContadorInterface>;
   ccp5mb: AngularFirestoreCollection<ContadorInterface>;
   ccp5b: AngularFirestoreCollection<ContadorInterface>;
   ccp5r: AngularFirestoreCollection<ContadorInterface>;
   ccp5m: AngularFirestoreCollection<ContadorInterface>;
   ccp5mm: AngularFirestoreCollection<ContadorInterface>;
   ccp6mb: AngularFirestoreCollection<ContadorInterface>;
   ccp6b: AngularFirestoreCollection<ContadorInterface>;
   ccp6r: AngularFirestoreCollection<ContadorInterface>;
   ccp6m: AngularFirestoreCollection<ContadorInterface>;
   ccp6mm: AngularFirestoreCollection<ContadorInterface>;
   ccp7mb: AngularFirestoreCollection<ContadorInterface>;
   ccp7b: AngularFirestoreCollection<ContadorInterface>;
   ccp7r: AngularFirestoreCollection<ContadorInterface>;
   ccp7m: AngularFirestoreCollection<ContadorInterface>;
   ccp7mm: AngularFirestoreCollection<ContadorInterface>;
   ccp8mb: AngularFirestoreCollection<ContadorInterface>;
   ccp8b: AngularFirestoreCollection<ContadorInterface>;
   ccp8r: AngularFirestoreCollection<ContadorInterface>;
   ccp8m: AngularFirestoreCollection<ContadorInterface>;
   ccp8mm: AngularFirestoreCollection<ContadorInterface>;
   ccp9mb: AngularFirestoreCollection<ContadorInterface>;
   ccp9mm: AngularFirestoreCollection<ContadorInterface>;
   ccp9r: AngularFirestoreCollection<ContadorInterface>;
   ccp10mb: AngularFirestoreCollection<ContadorInterface>;
   ccp10mm: AngularFirestoreCollection<ContadorInterface>;

  //CENTE REPORTES
  cccp1mb: AngularFirestoreCollection<ContadorInterface>;
  cccp1b: AngularFirestoreCollection<ContadorInterface>;
  cccp1r: AngularFirestoreCollection<ContadorInterface>;
  cccp1m: AngularFirestoreCollection<ContadorInterface>;
  cccp1mm: AngularFirestoreCollection<ContadorInterface>;
  cccp2mb: AngularFirestoreCollection<ContadorInterface>;
  cccp2b: AngularFirestoreCollection<ContadorInterface>;
  cccp2r: AngularFirestoreCollection<ContadorInterface>;
  cccp2m: AngularFirestoreCollection<ContadorInterface>;
  cccp2mm: AngularFirestoreCollection<ContadorInterface>;
  cccp3mb: AngularFirestoreCollection<ContadorInterface>;
  cccp3b: AngularFirestoreCollection<ContadorInterface>;
  cccp3r: AngularFirestoreCollection<ContadorInterface>;
  cccp3m: AngularFirestoreCollection<ContadorInterface>;
  cccp3mm: AngularFirestoreCollection<ContadorInterface>;
  cccp4mb: AngularFirestoreCollection<ContadorInterface>;
  cccp4b: AngularFirestoreCollection<ContadorInterface>;
  cccp4r: AngularFirestoreCollection<ContadorInterface>;
  cccp4m: AngularFirestoreCollection<ContadorInterface>;
  cccp4mm: AngularFirestoreCollection<ContadorInterface>;
  cccp5mb: AngularFirestoreCollection<ContadorInterface>;
  cccp5b: AngularFirestoreCollection<ContadorInterface>;
  cccp5r: AngularFirestoreCollection<ContadorInterface>;
  cccp5m: AngularFirestoreCollection<ContadorInterface>;
  cccp5mm: AngularFirestoreCollection<ContadorInterface>;
  cccp6mb: AngularFirestoreCollection<ContadorInterface>;
  cccp6b: AngularFirestoreCollection<ContadorInterface>;
  cccp6r: AngularFirestoreCollection<ContadorInterface>;
  cccp6m: AngularFirestoreCollection<ContadorInterface>;
  cccp6mm: AngularFirestoreCollection<ContadorInterface>;
  cccp7mb: AngularFirestoreCollection<ContadorInterface>;
  cccp7b: AngularFirestoreCollection<ContadorInterface>;
  cccp7r: AngularFirestoreCollection<ContadorInterface>;
  cccp7m: AngularFirestoreCollection<ContadorInterface>;
  cccp7mm: AngularFirestoreCollection<ContadorInterface>;
  cccp8mb: AngularFirestoreCollection<ContadorInterface>;
  cccp8b: AngularFirestoreCollection<ContadorInterface>;
  cccp8r: AngularFirestoreCollection<ContadorInterface>;
  cccp8m: AngularFirestoreCollection<ContadorInterface>;
  cccp8mm: AngularFirestoreCollection<ContadorInterface>;
  cccp9mb: AngularFirestoreCollection<ContadorInterface>;
  cccp9r: AngularFirestoreCollection<ContadorInterface>;
  cccp9mm: AngularFirestoreCollection<ContadorInterface>;
  cccp10mb: AngularFirestoreCollection<ContadorInterface>;
  cccp10mm: AngularFirestoreCollection<ContadorInterface>;
 db: FirebaseFirestore;
  typeCollections: AngularFirestoreCollection<EncuestaexInterface>;
  EncuestaexDoc: AngularFirestoreDocument<EncuestaexInterface>;
  EncuestaexDoc1: AngularFirestoreDocument<ContadorInterface>;
 Encuestaexes: Observable<EncuestaexInterface[]>;
 contadorex: Observable<ContadorInterface[]>;
 meses:string[] = ["Mes","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
contadores:number;
mod: any = {};
fechareporte: string;
constructor(
 private afs: AngularFirestore) {
  const today = new Date();
  this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  this.mod.mesnumero =  today.getMonth()+1;
  this.mod.año =  today.getFullYear();
  for(var mc=1; mc<=12; mc++){
    if(this.mod.mesnumero == mc){
      this.mod.mes = this.meses[mc];
    }
  }
  this.fechareporte = this.mod.mes+this.mod.año;
   this.EncuestareCollection = this.afs.collection('Encuestareps', ref => ref);
   this.EncuestareCollectionC = this.afs.collection('EncuestarepsC', ref => ref);
   this.typeCollectionALL = this.afs.collection('typeALL', ref => ref);

  
  }
 //___________________________________________________________________ Delete Encuesta
 deleteEncuestaex(Encuestaex: EncuestaexInterface) {
   this.EncuestaexDoc = this.afs.doc('Encuestaexes/' + Encuestaex.id);
   this.EncuestaexDoc.delete();
 }
 deleteType(Encuestaex: EncuestaexInterface) {
   this.EncuestaexDoc = this.afs.doc('type/' + Encuestaex.id);
   this.EncuestaexDoc.delete();
 }
 //___________________________________________________________________ Update Encuesta
 //Update registro completo
   updateEncuestarep(Encuestaex: RegistroCompletoInterface) {
     this.EncuestaexDoc = this.afs.doc('Encuestareps/' + Encuestaex.id);
     this.EncuestaexDoc.update(Encuestaex);
   }
  updateEncuestarepC(Encuestaex: RegistroCompletoInterface) {
    this.EncuestaexDoc = this.afs.doc('EncuestarepsC/' + Encuestaex.id);
    this.EncuestaexDoc.update(Encuestaex);
  }
  updateTypeALL(Encuestaex: RegistroCompletoInterface) {
    this.EncuestaexDoc = this.afs.doc('typeALL/' + Encuestaex.id);
    this.EncuestaexDoc.update(Encuestaex).then(function() {
      confirm('Registro ' + Encuestaex.id + ' guardado');
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      confirm('No se pudo guardar correctamente '+ error );
  });  
  }
  //todo este bloque realiza el conteo de registros y contestadas
  requestupdateType(y: string, x:string) {
    this.EncuestaexDoc1 = this.afs.doc('type/' + y + '/' + x + '/' + 'registro');
    this.getcontador(y,x);
  }
  getcontador(x: string, y:string) {
    this.afs.firestore.collection('type').doc(x).collection(y).get().then(doc => {
      if(doc.docs.length > 0){
        this.afs.collection('type').doc(x).collection(y).doc('registro').valueChanges().pipe(take(1)).subscribe(res => {this.arrayss(res); } );
      }
      else{
        this.add(x,y);
        this.afs.collection('type').doc(x).collection(y).doc('registro').valueChanges().pipe(take(1)).subscribe(res => {this.arrayss(res); } );
      }
    })
  }
  add(x:string,y:string){
    this.afs.collection('type').doc(x).collection(y).doc('contestadas').set({contador:0})
    this.afs.collection('type').doc(x).collection(y).doc('registro').set({contador:0})
    this.afs.collection('type').doc(x).collection(y).doc('registro').valueChanges().pipe(take(1)).subscribe(res => {this.arrayss(res); } );
  }
  arrayss(x:ContadorInterface ): number {
    this.contadores = <number><any>x.contador;
    x.contador = this.contadores +1;
    this.EncuestaexDoc1.update(x);
  return this.contadores;
  }
  requestupdateTypee(y: string, x:string) {
    this.EncuestaexDoc1 = this.afs.doc('type/' + y + '/' + x + '/' + 'contestadas');
    this.getcontador2(y,x);
  }
  getcontador2(x: string, y:string) {
    this.afs.collection('type').doc(x).collection(y).doc('contestadas').valueChanges().pipe(take(1)).subscribe(res => {this.arrayss(res); } );      
  }
//___________________________________________________________________ Add Encuesta

 addEncuestare(Encuestaex: EncuestaexInterface) {
   // this.EncuestaexCollection.add(Encuestaex);
   this.EncuestareCollection.doc(Encuestaex.id).set(Encuestaex);
 }
 addTypeAll(Encuestaex: EncuestaexInterface) {
  // this.EncuestaexCollection.add(Encuestaex);
  this.typeCollectionALL.doc(Encuestaex.id).set(Encuestaex);
}
addEncuestareC(Encuestaex: EncuestaexInterface) {
  // this.EncuestaexCollection.add(Encuestaex);
  this.EncuestareCollectionC.doc(Encuestaex.id).set(Encuestaex);
}
 //___________________________________________________________________
 //Get collections
 //___________________________________________________________________
 datos : ContadorInterface;
getcolections(){
 
   this.ccp1b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1', ref => ref);
   this.ccp1r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1', ref => ref);
   this.ccp1m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1', ref => ref);
   this.ccp1mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1', ref => ref);

   this.cccp1mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1C', ref => ref);
   this.cccp1b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1C', ref => ref);
   this.cccp1r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1C', ref => ref);
   this.cccp1m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1C', ref => ref);
   this.cccp1mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1C', ref => ref);
  
    this.ccp2mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2', ref => ref);
    this.ccp2b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2', ref => ref);
    this.ccp2r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2', ref => ref);
    this.ccp2m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2', ref => ref);
    this.ccp2mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2', ref => ref);

    this.cccp2mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2C', ref => ref);
    this.cccp2b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2C', ref => ref);
    this.cccp2r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2C', ref => ref);
    this.cccp2m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2C', ref => ref);
    this.cccp2mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2C', ref => ref);
    
    this.ccp3mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3', ref => ref);
    this.ccp3b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3', ref => ref);
    this.ccp3r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3', ref => ref);
    this.ccp3m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3', ref => ref);
    this.ccp3mm=  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3', ref => ref);
    
    this.cccp3mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3C', ref => ref);
    this.cccp3b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3C', ref => ref);
    this.cccp3r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3C', ref => ref);
    this.cccp3m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3C', ref => ref);
    this.cccp3mm=  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3C', ref => ref);
  
    this.ccp4mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4', ref => ref);
    this.ccp4b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4', ref => ref);
    this.ccp4r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4', ref => ref);
    this.ccp4m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4', ref => ref);
    this.ccp4mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4', ref => ref);
    
    this.cccp4mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4C', ref => ref);
    this.cccp4b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4C', ref => ref);
    this.cccp4r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4C', ref => ref);
    this.cccp4m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4C', ref => ref);
    this.cccp4mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4C', ref => ref);
  
    this.ccp5mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5', ref => ref);
    this.ccp5b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5', ref => ref);
    this.ccp5r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5', ref => ref);
    this.ccp5m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5', ref => ref);
    this.ccp5mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5', ref => ref);
    
    this.cccp5mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5C', ref => ref);
    this.cccp5b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5C', ref => ref);
    this.cccp5r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5C', ref => ref);
    this.cccp5m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5C', ref => ref);
    this.cccp5mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5C', ref => ref);
  
    this.ccp6mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6', ref => ref);
    this.ccp6b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6', ref => ref);
    this.ccp6r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6', ref => ref);
    this.ccp6m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6', ref => ref);
    this.ccp6mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6', ref => ref);
    
    this.cccp6mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6C', ref => ref);
    this.cccp6b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6C', ref => ref);
    this.cccp6r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6C', ref => ref);
    this.cccp6m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6C', ref => ref);
    this.cccp6mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6C', ref => ref);
  
    this.ccp7mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7', ref => ref);
    this.ccp7b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7', ref => ref);
    this.ccp7r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7', ref => ref);
    this.ccp7m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7', ref => ref);
    this.ccp7mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7', ref => ref);

    this.cccp7mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7C', ref => ref);
    this.cccp7b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7C', ref => ref);
    this.cccp7r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7C', ref => ref);
    this.cccp7m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7C', ref => ref);
    this.cccp7mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7C', ref => ref);

    this.ccp8mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8', ref => ref);  
    this.ccp8b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8', ref => ref);
    this.ccp8r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8', ref => ref);
    this.ccp8m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8', ref => ref);
    this.ccp8mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8', ref => ref);

    this.cccp8mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8C', ref => ref);  
    this.cccp8b =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8C', ref => ref);
    this.cccp8r =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8C', ref => ref);
    this.cccp8m =  this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8C', ref => ref);
    this.cccp8mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8C', ref => ref);

    this.ccp9mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta9', ref => ref);
    this.ccp9mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta9', ref => ref);
    this.ccp9r  = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta9', ref => ref);

    this.cccp9mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta', ref => ref);
    this.cccp9r  = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta9', ref => ref);
    this.cccp9mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta', ref => ref);
  
    this.ccp10mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta10', ref => ref);
    this.ccp10mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta10', ref => ref);

    this.cccp10mb = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1', ref => ref);
    this.cccp10mm = this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1', ref => ref);
}

 getAllEncuestaexCen(x:string): Observable<EncuestaexInterface[]> {
  this.typeCollections = this.afs.collection('EncuestarepsC', ref => ref.where("fechareporte","==",x));
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
getAllEncuestaexvig(x:string): Observable<EncuestaexInterface[]> {
  this.typeCollections = this.afs.collection('Encuestareps', ref => ref.where("fechareporte","==",x));
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
}
