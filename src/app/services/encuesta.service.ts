import { Injectable } from '@angular/core';
import {EncuestaexInterface} from '../Models/Encuestaex';
import {ContadorInterface} from '../Models/contador';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import { RegistroCompletoInterface } from '../Models/Registrocompleto';
 
@Injectable({
 providedIn: 'root'
})
export class EncuestaService {
 EncuestareCollection: AngularFirestoreCollection<EncuestaexInterface>;
 typeCollection: AngularFirestoreCollection<EncuestaexInterface>;
 EncuestareCollectionC: AngularFirestoreCollection<EncuestaexInterface>;
 typeCollectionALL: AngularFirestoreCollection<EncuestaexInterface>;

//VIGA REPORTES
   ccp1mb: AngularFirestoreCollection<EncuestaexInterface>;
   ccp1b: AngularFirestoreCollection<EncuestaexInterface>;
   ccp1r: AngularFirestoreCollection<EncuestaexInterface>;
   ccp1m: AngularFirestoreCollection<EncuestaexInterface>;
   ccp1mm: AngularFirestoreCollection<EncuestaexInterface>;
   ccp2mb: AngularFirestoreCollection<EncuestaexInterface>;
   ccp2b: AngularFirestoreCollection<EncuestaexInterface>;
   ccp2r: AngularFirestoreCollection<EncuestaexInterface>;
   ccp2m: AngularFirestoreCollection<EncuestaexInterface>;
   ccp2mm: AngularFirestoreCollection<EncuestaexInterface>;
   ccp3mb: AngularFirestoreCollection<EncuestaexInterface>;
   ccp3b: AngularFirestoreCollection<EncuestaexInterface>;
   ccp3r: AngularFirestoreCollection<EncuestaexInterface>;
   ccp3m: AngularFirestoreCollection<EncuestaexInterface>;
   ccp3mm: AngularFirestoreCollection<EncuestaexInterface>;
   ccp4mb: AngularFirestoreCollection<EncuestaexInterface>;
   ccp4b: AngularFirestoreCollection<EncuestaexInterface>;
   ccp4r: AngularFirestoreCollection<EncuestaexInterface>;
   ccp4m: AngularFirestoreCollection<EncuestaexInterface>;
   ccp4mm: AngularFirestoreCollection<EncuestaexInterface>;
   ccp5mb: AngularFirestoreCollection<EncuestaexInterface>;
   ccp5b: AngularFirestoreCollection<EncuestaexInterface>;
   ccp5r: AngularFirestoreCollection<EncuestaexInterface>;
   ccp5m: AngularFirestoreCollection<EncuestaexInterface>;
   ccp5mm: AngularFirestoreCollection<EncuestaexInterface>;
   ccp6mb: AngularFirestoreCollection<EncuestaexInterface>;
   ccp6b: AngularFirestoreCollection<EncuestaexInterface>;
   ccp6r: AngularFirestoreCollection<EncuestaexInterface>;
   ccp6m: AngularFirestoreCollection<EncuestaexInterface>;
   ccp6mm: AngularFirestoreCollection<EncuestaexInterface>;
   ccp7mb: AngularFirestoreCollection<EncuestaexInterface>;
   ccp7b: AngularFirestoreCollection<EncuestaexInterface>;
   ccp7r: AngularFirestoreCollection<EncuestaexInterface>;
   ccp7m: AngularFirestoreCollection<EncuestaexInterface>;
   ccp7mm: AngularFirestoreCollection<EncuestaexInterface>;
   ccp8mb: AngularFirestoreCollection<EncuestaexInterface>;
   ccp8b: AngularFirestoreCollection<EncuestaexInterface>;
   ccp8r: AngularFirestoreCollection<EncuestaexInterface>;
   ccp8m: AngularFirestoreCollection<EncuestaexInterface>;
   ccp8mm: AngularFirestoreCollection<EncuestaexInterface>;
   ccp9mb: AngularFirestoreCollection<EncuestaexInterface>;
   ccp9mm: AngularFirestoreCollection<EncuestaexInterface>;
   ccp9r: AngularFirestoreCollection<EncuestaexInterface>;
   ccp10mb: AngularFirestoreCollection<EncuestaexInterface>;
   ccp10mm: AngularFirestoreCollection<EncuestaexInterface>;

  //CENTE REPORTES
  cccp1mb: AngularFirestoreCollection<EncuestaexInterface>;
  cccp1b: AngularFirestoreCollection<EncuestaexInterface>;
  cccp1r: AngularFirestoreCollection<EncuestaexInterface>;
  cccp1m: AngularFirestoreCollection<EncuestaexInterface>;
  cccp1mm: AngularFirestoreCollection<EncuestaexInterface>;
  cccp2mb: AngularFirestoreCollection<EncuestaexInterface>;
  cccp2b: AngularFirestoreCollection<EncuestaexInterface>;
  cccp2r: AngularFirestoreCollection<EncuestaexInterface>;
  cccp2m: AngularFirestoreCollection<EncuestaexInterface>;
  cccp2mm: AngularFirestoreCollection<EncuestaexInterface>;
  cccp3mb: AngularFirestoreCollection<EncuestaexInterface>;
  cccp3b: AngularFirestoreCollection<EncuestaexInterface>;
  cccp3r: AngularFirestoreCollection<EncuestaexInterface>;
  cccp3m: AngularFirestoreCollection<EncuestaexInterface>;
  cccp3mm: AngularFirestoreCollection<EncuestaexInterface>;
  cccp4mb: AngularFirestoreCollection<EncuestaexInterface>;
  cccp4b: AngularFirestoreCollection<EncuestaexInterface>;
  cccp4r: AngularFirestoreCollection<EncuestaexInterface>;
  cccp4m: AngularFirestoreCollection<EncuestaexInterface>;
  cccp4mm: AngularFirestoreCollection<EncuestaexInterface>;
  cccp5mb: AngularFirestoreCollection<EncuestaexInterface>;
  cccp5b: AngularFirestoreCollection<EncuestaexInterface>;
  cccp5r: AngularFirestoreCollection<EncuestaexInterface>;
  cccp5m: AngularFirestoreCollection<EncuestaexInterface>;
  cccp5mm: AngularFirestoreCollection<EncuestaexInterface>;
  cccp6mb: AngularFirestoreCollection<EncuestaexInterface>;
  cccp6b: AngularFirestoreCollection<EncuestaexInterface>;
  cccp6r: AngularFirestoreCollection<EncuestaexInterface>;
  cccp6m: AngularFirestoreCollection<EncuestaexInterface>;
  cccp6mm: AngularFirestoreCollection<EncuestaexInterface>;
  cccp7mb: AngularFirestoreCollection<EncuestaexInterface>;
  cccp7b: AngularFirestoreCollection<EncuestaexInterface>;
  cccp7r: AngularFirestoreCollection<EncuestaexInterface>;
  cccp7m: AngularFirestoreCollection<EncuestaexInterface>;
  cccp7mm: AngularFirestoreCollection<EncuestaexInterface>;
  cccp8mb: AngularFirestoreCollection<EncuestaexInterface>;
  cccp8b: AngularFirestoreCollection<EncuestaexInterface>;
  cccp8r: AngularFirestoreCollection<EncuestaexInterface>;
  cccp8m: AngularFirestoreCollection<EncuestaexInterface>;
  cccp8mm: AngularFirestoreCollection<EncuestaexInterface>;
  cccp9mb: AngularFirestoreCollection<EncuestaexInterface>;
  cccp9r: AngularFirestoreCollection<EncuestaexInterface>;
  cccp9mm: AngularFirestoreCollection<EncuestaexInterface>;
  cccp10mb: AngularFirestoreCollection<EncuestaexInterface>;
  cccp10mm: AngularFirestoreCollection<EncuestaexInterface>;
 
  typeCollections: AngularFirestoreCollection<EncuestaexInterface>;
  EncuestaexDoc: AngularFirestoreDocument<EncuestaexInterface>;
  EncuestaexDoc1: AngularFirestoreDocument<ContadorInterface>;
 Encuestaexes: Observable<EncuestaexInterface[]>;

contadores:number;
mod: any = {};
fechareporte: string;
constructor(
 private afs: AngularFirestore) {
  const today = new Date();
  this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  this.mod.mesnumero =  today.getMonth()+1;
  this.mod.año =  today.getFullYear();
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
getcolections(){
  this.ccp1mb = this.afs.collection('Contadores').doc('Pregunta1').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
   this.ccp1b =  this.afs.collection('Contadores').doc('Pregunta1').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
   this.ccp1r =  this.afs.collection('Contadores').doc('Pregunta1').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
   this.ccp1m =  this.afs.collection('Contadores').doc('Pregunta1').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
   this.ccp1mm = this.afs.collection('Contadores').doc('Pregunta1').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);

   this.cccp1mb = this.afs.collection('Contadores').doc('Pregunta1C').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
   this.cccp1b =  this.afs.collection('Contadores').doc('Pregunta1C').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
   this.cccp1r =  this.afs.collection('Contadores').doc('Pregunta1C').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
   this.cccp1m =  this.afs.collection('Contadores').doc('Pregunta1C').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
   this.cccp1mm = this.afs.collection('Contadores').doc('Pregunta1C').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);
  
    this.ccp2mb = this.afs.collection('Contadores').doc('Pregunta2').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp2b =  this.afs.collection('Contadores').doc('Pregunta2').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp2r =  this.afs.collection('Contadores').doc('Pregunta2').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp2m =  this.afs.collection('Contadores').doc('Pregunta2').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp2mm = this.afs.collection('Contadores').doc('Pregunta2').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);

    this.cccp2mb = this.afs.collection('Contadores').doc('Pregunta2C').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp2b =  this.afs.collection('Contadores').doc('Pregunta2C').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp2r =  this.afs.collection('Contadores').doc('Pregunta2C').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp2m =  this.afs.collection('Contadores').doc('Pregunta2C').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp2mm = this.afs.collection('Contadores').doc('Pregunta2C').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);
    
    this.ccp3mb = this.afs.collection('Contadores').doc('Pregunta3').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp3b =  this.afs.collection('Contadores').doc('Pregunta3').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp3r =  this.afs.collection('Contadores').doc('Pregunta3').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp3m =  this.afs.collection('Contadores').doc('Pregunta3').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp3mm=  this.afs.collection('Contadores').doc('Pregunta3').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);
    
    this.cccp3mb = this.afs.collection('Contadores').doc('Pregunta3C').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp3b =  this.afs.collection('Contadores').doc('Pregunta3C').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp3r =  this.afs.collection('Contadores').doc('Pregunta3C').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp3m =  this.afs.collection('Contadores').doc('Pregunta3C').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp3mm=  this.afs.collection('Contadores').doc('Pregunta3C').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);
  
    this.ccp4mb = this.afs.collection('Contadores').doc('Pregunta4').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp4b =  this.afs.collection('Contadores').doc('Pregunta4').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp4r =  this.afs.collection('Contadores').doc('Pregunta4').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp4m =  this.afs.collection('Contadores').doc('Pregunta4').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp4mm = this.afs.collection('Contadores').doc('Pregunta4').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);
    
    this.cccp4mb = this.afs.collection('Contadores').doc('Pregunta4C').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp4b =  this.afs.collection('Contadores').doc('Pregunta4C').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp4r =  this.afs.collection('Contadores').doc('Pregunta4C').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp4m =  this.afs.collection('Contadores').doc('Pregunta4C').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp4mm = this.afs.collection('Contadores').doc('Pregunta4C').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);
  
    this.ccp5mb = this.afs.collection('Contadores').doc('Pregunta5').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp5b =  this.afs.collection('Contadores').doc('Pregunta5').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp5r =  this.afs.collection('Contadores').doc('Pregunta5').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp5m =  this.afs.collection('Contadores').doc('Pregunta5').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp5mm = this.afs.collection('Contadores').doc('Pregunta5').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);
    
    this.cccp5mb = this.afs.collection('Contadores').doc('Pregunta5C').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp5b =  this.afs.collection('Contadores').doc('Pregunta5C').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp5r =  this.afs.collection('Contadores').doc('Pregunta5C').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp5m =  this.afs.collection('Contadores').doc('Pregunta5C').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp5mm = this.afs.collection('Contadores').doc('Pregunta5C').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);
  
    this.ccp6mb = this.afs.collection('Contadores').doc('Pregunta6').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp6b =  this.afs.collection('Contadores').doc('Pregunta6').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp6r =  this.afs.collection('Contadores').doc('Pregunta6').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp6m =  this.afs.collection('Contadores').doc('Pregunta6').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp6mm = this.afs.collection('Contadores').doc('Pregunta6').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);
    
    this.cccp6mb = this.afs.collection('Contadores').doc('Pregunta6C').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp6b =  this.afs.collection('Contadores').doc('Pregunta6C').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp6r =  this.afs.collection('Contadores').doc('Pregunta6C').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp6m =  this.afs.collection('Contadores').doc('Pregunta6C').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp6mm = this.afs.collection('Contadores').doc('Pregunta6C').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);
  
    this.ccp7mb = this.afs.collection('Contadores').doc('Pregunta7').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp7b =  this.afs.collection('Contadores').doc('Pregunta7').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp7r =  this.afs.collection('Contadores').doc('Pregunta7').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp7m =  this.afs.collection('Contadores').doc('Pregunta7').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp7mm = this.afs.collection('Contadores').doc('Pregunta7').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);

    this.cccp7mb = this.afs.collection('Contadores').doc('Pregunta7C').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp7b =  this.afs.collection('Contadores').doc('Pregunta7C').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp7r =  this.afs.collection('Contadores').doc('Pregunta7C').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp7m =  this.afs.collection('Contadores').doc('Pregunta7C').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp7mm = this.afs.collection('Contadores').doc('Pregunta7C').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);

    this.ccp8mb = this.afs.collection('Contadores').doc('Pregunta8').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);  
    this.ccp8b =  this.afs.collection('Contadores').doc('Pregunta8').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp8r =  this.afs.collection('Contadores').doc('Pregunta8').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp8m =  this.afs.collection('Contadores').doc('Pregunta8').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp8mm = this.afs.collection('Contadores').doc('Pregunta8').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);

    this.cccp8mb = this.afs.collection('Contadores').doc('Pregunta8C').collection('MuyBueno').doc(this.fechareporte).collection('contador', ref => ref);  
    this.cccp8b =  this.afs.collection('Contadores').doc('Pregunta8C').collection('Bueno').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp8r =  this.afs.collection('Contadores').doc('Pregunta8C').collection('Regular').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp8m =  this.afs.collection('Contadores').doc('Pregunta8C').collection('Malo').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp8mm = this.afs.collection('Contadores').doc('Pregunta8C').collection('MuyMalo').doc(this.fechareporte).collection('contador', ref => ref);

    this.ccp9mb = this.afs.collection('Contadores').doc('Pregunta9').collection('Si').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp9mm = this.afs.collection('Contadores').doc('Pregunta9').collection('N-A').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp9r  = this.afs.collection('Contadores').doc('Pregunta9').collection('No').doc(this.fechareporte).collection('contador', ref => ref);

    this.cccp9mb = this.afs.collection('Contadores').doc('Pregunta9C').collection('Si').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp9r  = this.afs.collection('Contadores').doc('Pregunta9C').collection('N-A').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp9mm = this.afs.collection('Contadores').doc('Pregunta9C').collection('No').doc(this.fechareporte).collection('contador', ref => ref);
  
    this.ccp10mb = this.afs.collection('Contadores').doc('Pregunta10').collection('Si').doc(this.fechareporte).collection('contador', ref => ref);
    this.ccp10mm = this.afs.collection('Contadores').doc('Pregunta10').collection('No').doc(this.fechareporte).collection('contador', ref => ref);

    this.cccp10mb = this.afs.collection('Contadores').doc('Pregunta10C').collection('Si').doc(this.fechareporte).collection('contador', ref => ref);
    this.cccp10mm = this.afs.collection('Contadores').doc('Pregunta10C').collection('No').doc(this.fechareporte).collection('contador', ref => ref);
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
  //___________________________________________________________________ Collection Contadores VIGA
 getitemcoll1mbc(): Observable<EncuestaexInterface[]> {
   this.Encuestaexes = this.cccp1mb.snapshotChanges()
   .pipe(map(changes => {
     return changes.map(action => {
       const data = action.payload.doc.id as EncuestaexInterface;
       // data.id = action.payload.doc.id;
       return data;
     });
   }));
   return this.Encuestaexes;
 }
 getitemcoll1bc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp1b.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
}
getitemcoll1rc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp1r.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
}
getitemcoll1mc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp1m.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
}
getitemcoll1mmc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp1mm.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
}
 //___________________________________________________________________
getitemcoll2mbc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp2mb.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
}
getitemcoll2bc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp2b.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll2rc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp2r.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll2mc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp2m.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll2mmc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp2mm.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
 //___________________________________________________________________
getitemcoll3mbc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp3mb.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
}
getitemcoll3bc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp3b.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll3rc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp3r.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll3mc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp3m.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll3mmc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp3mm.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
//___________________________________________________________________
getitemcoll4mbc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp4mb.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll4bc(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.cccp4b.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll4rc(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.cccp4r.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll4mc(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.cccp4m.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll4mmc(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.cccp4mm.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
//___________________________________________________________________
getitemcoll5mbc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp5mb.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
 }
 getitemcoll5bc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp5b.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll5rc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp5r.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll5mc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp5m.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll5mmc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp5mm.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 //___________________________________________________________________
 getitemcoll6mbc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp6mb.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
 }
 getitemcoll6bc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp6b.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll6rc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp6r.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll6mc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp6m.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll6mmc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp6mm.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 //___________________________________________________________________
 getitemcoll7mbc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp7mb.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
 }
 getitemcoll7bc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp7b.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll7rc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp7r.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll7mc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp7m.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll7mmc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp7mm.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 //___________________________________________________________________
 getitemcoll8mbc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp8mb.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
 }
 getitemcoll8bc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp8b.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll8rc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp8r.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll8mc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp8m.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll8mmc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp8mm.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 //___________________________________________________________________
 getitemcoll9mbc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp9mb.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
 }
 getitemcoll9rc(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.cccp9r.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
 }
 getitemcoll9mmc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp9mm.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 //___________________________________________________________________
 getitemcoll10mbc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp10mb.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 getitemcoll10mmc(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.cccp10mm.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
 }
 //___________________________________________________________________
//___________________________________________________________________ Collection Contadores VIGA
getitemcoll1mb(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.ccp1mb.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
}
getitemcoll1b(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.ccp1b.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll1r(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.ccp1r.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll1m(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.ccp1m.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll1mm(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.ccp1mm.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
//___________________________________________________________________
getitemcoll2mb(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.ccp2mb.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll2b(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp2b.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll2r(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp2r.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll2m(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp2m.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll2mm(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp2mm.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
//___________________________________________________________________
getitemcoll3mb(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.ccp3mb.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll3b(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp3b.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll3r(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp3r.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll3m(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp3m.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll3mm(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp3mm.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
//___________________________________________________________________
getitemcoll4mb(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp4mb.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll4b(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp4b.snapshotChanges()
.pipe(map(changes => {
 return changes.map(action => {
   const data = action.payload.doc.id as EncuestaexInterface;
   // data.id = action.payload.doc.id;
   return data;
 });
}));
return this.Encuestaexes;
}
getitemcoll4r(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp4r.snapshotChanges()
.pipe(map(changes => {
 return changes.map(action => {
   const data = action.payload.doc.id as EncuestaexInterface;
   // data.id = action.payload.doc.id;
   return data;
 });
}));
return this.Encuestaexes;
}
getitemcoll4m(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp4m.snapshotChanges()
.pipe(map(changes => {
 return changes.map(action => {
   const data = action.payload.doc.id as EncuestaexInterface;
   // data.id = action.payload.doc.id;
   return data;
 });
}));
return this.Encuestaexes;
}
getitemcoll4mm(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp4mm.snapshotChanges()
.pipe(map(changes => {
 return changes.map(action => {
   const data = action.payload.doc.id as EncuestaexInterface;
   // data.id = action.payload.doc.id;
   return data;
 });
}));
return this.Encuestaexes;
}
//___________________________________________________________________
getitemcoll5mb(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.ccp5mb.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll5b(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp5b.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll5r(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp5r.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll5m(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp5m.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll5mm(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp5mm.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
//___________________________________________________________________
getitemcoll6mb(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.ccp6mb.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll6b(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp6b.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll6r(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp6r.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll6m(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp6m.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll6mm(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp6mm.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
//___________________________________________________________________
getitemcoll7mb(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.ccp7mb.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll7b(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp7b.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll7r(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp7r.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll7m(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp7m.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll7mm(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp7mm.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
//___________________________________________________________________
getitemcoll8mb(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.ccp8mb.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll8b(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp8b.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll8r(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp8r.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll8m(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp8m.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll8mm(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp8mm.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
//___________________________________________________________________
getitemcoll9mb(): Observable<EncuestaexInterface[]> {
 this.Encuestaexes = this.ccp9mb.snapshotChanges()
 .pipe(map(changes => {
   return changes.map(action => {
     const data = action.payload.doc.id as EncuestaexInterface;
     // data.id = action.payload.doc.id;
     return data;
   });
 }));
 return this.Encuestaexes;
}
getitemcoll9r(): Observable<EncuestaexInterface[]> {
  this.Encuestaexes = this.ccp9r.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(action => {
      const data = action.payload.doc.id as EncuestaexInterface;
      // data.id = action.payload.doc.id;
      return data;
    });
  }));
  return this.Encuestaexes;
 }
getitemcoll9mm(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp9mm.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
//___________________________________________________________________
getitemcoll10mb(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp10mb.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
getitemcoll10mm(): Observable<EncuestaexInterface[]> {
this.Encuestaexes = this.ccp10mm.snapshotChanges()
.pipe(map(changes => {
  return changes.map(action => {
    const data = action.payload.doc.id as EncuestaexInterface;
    // data.id = action.payload.doc.id;
    return data;
  });
}));
return this.Encuestaexes;
}
//___________________________________________________________________

 
}
