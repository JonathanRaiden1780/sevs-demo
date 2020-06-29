import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { take } from 'rxjs/operators';
import { ContadorInterface } from 'src/app/Models/contador';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [];
  public pieChartLabels: Label[] = ['Muy Malo', 'Malo', 'Regular', 'Bueno',  'Muy Bueno'];
   // P1 El tiempo que transcurrió para que lo atendieran en recepción fue:
  public pieChartDataP1: SingleDataSet = [9, 6, 6, 3, 6];
    // P2 Durante la recepción ¿Nuestro asesor le preguntó si su vehículo requería de 
    //    algún servicio adicional a lo previamente solicitado?
  public pieChartLabelP2: Label[] = ['No', 'Si'];
  public pieChartDataP2: SingleDataSet = [15, 3];
    // P3 El tiempo de entrega acorde al proporcionado posterior al diagnostico fue:
  public pieChartDataP3: SingleDataSet = [18, 6, 1.5, 1.5, 3];
    // P4 ¿Cómo calificaría la imagen de nuestras instalaciones?
  public pieChartDataP4: SingleDataSet = [21, 6, 1.5, .75, .75];
    // P5 La atención que recibió de nuestro asesor de servicio fue….
  public pieChartDataP5: SingleDataSet = [21, 6, 1.5, .75, .75];
    // P6 Considera que la imagen de nuestro asesor de servicio es...
  public pieChartDataP6: SingleDataSet = [12, 9, 6, 1.5, 1.5];
    // P7 La limpieza de su vehículo fue:
    public pieChartDataP7: SingleDataSet = [12, 9, 6, 1.5, 1.5];
    // P8 La experiencia en general de su visita a Casanova fue…
    public pieChartDataP8: SingleDataSet = [12, 9, 6, 1.5, 1.5];
  // Rep
   // P9 ¿Se le explicó el motivo?
    public pieChartLabelP1_R: Label[] = ['No', 'Si', 'N/A'];
    public pieChartDataP1_R: SingleDataSet = [30, 0, 1];
     // P10 ¿Usted es la persona que ingresó el vehículo al taller?
    public pieChartLabelP2_R: Label[] = ['No', 'Si'];
    public pieChartDataP2_R: SingleDataSet = [12, 18, 9];
  /* Iconos */
  faChartLine = faChartLine;

  rows2: any;

  colums: any;
  contadorre: number;
  meses:string[] = ["Mes","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  mod: any = {};
  fechareporte: string;
  constructor(
    private afs: AngularFirestore, 
    private encuestaex: EncuestaService
  ) {
    const today = new Date();
  this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  this.mod.mesnumero =  today.getMonth()+1;
  this.mod.año =  today.getFullYear();
  for(var mc=1; mc<=12; mc++){
    if(this.mod.mesnumero == mc){
      this.mod.mes = this.meses[mc];
    }
  }
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  // this.encuestaex.getcolections();
   this.fechareporte = this.mod.mes+this.mod.año;
}
   cp1mb: number; cp1b: number; cp1r: number; cp1m: number; cp1mm: number;
   cp2mb: number; cp2mm: number;
   cp3mb: number; cp3b: number; cp3r: number; cp3m: number; cp3mm: number;
   cp4mb: number; cp4b: number; cp4r: number; cp4m: number; cp4mm: number;
   cp5mb: number; cp5b: number; cp5r: number; cp5m: number; cp5mm: number;
   cp6mb: number; cp6b: number; cp6r: number; cp6m: number; cp6mm: number;
   cp7mb: number; cp7b: number; cp7r: number; cp7m: number; cp7mm: number;
   cp8mb: number; cp8b: number; cp8r: number; cp8m: number; cp8mm: number;
   cp9mb: number; cp9mm: number; cp9r:number; cp10mb: number; cp10mm: number;
  ngOnInit() {
   this.getData();
  }
 arras() {
    this.pieChartDataP1 = [this.cp1mm,this.cp1m,this.cp1r,this.cp1b,this.cp1mb];
    this.pieChartDataP2 = [this.cp2mm,this.cp2mb];
    this.pieChartDataP3 = [this.cp3mm,this.cp3m,this.cp3r,this.cp3b,this.cp3mb];
    this.pieChartDataP4 = [this.cp4mm,this.cp4m,this.cp4r,this.cp4b,this.cp4mb];
    this.pieChartDataP5 = [this.cp5mm,this.cp5m,this.cp5r,this.cp5b,this.cp5mb];
    this.pieChartDataP6 = [this.cp6mm,this.cp6m,this.cp6r,this.cp6b,this.cp6mb];
    this.pieChartDataP7 = [this.cp7mm,this.cp7m,this.cp7r,this.cp7b,this.cp7mb];
    this.pieChartDataP8 = [this.cp8mm,this.cp8m,this.cp8r,this.cp8b,this.cp8mb];
    this.pieChartDataP1_R = [this.cp9mb,this.cp9mm,this.cp9r];
    this.pieChartDataP2_R = [this.cp10mm,this.cp10mb];
    this.encuestaex.getAllEncuestaexvig(this.fechareporte).subscribe((encuesta) => {
      this.rows2 = encuesta ;
    });
 }
  getData() {
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1').doc('MuyBueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll1mb(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1').doc('Bueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll1b(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1').doc('Regular').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll1r(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1').doc('Malo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll1m(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta1').doc('MuyMalo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll1mm(dat)} );
//________________________________________
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2').doc('MuyBueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll2mb(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta2').doc('MuyMalo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll2mm(dat)} );
    //________________________________________
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3').doc('MuyBueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll3mb(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3').doc('Bueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll3b(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3').doc('Regular').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll3r(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3').doc('Malo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll3m(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta3').doc('MuyMalo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll3mm(dat)} );
//________________________________________
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4').doc('MuyBueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll4mb(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4').doc('Bueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll4b(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4').doc('Regular').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll4r(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4').doc('Malo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll4m(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta4').doc('MuyMalo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll4mm(dat)} );
    //________________________________________
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5').doc('MuyBueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll5mb(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5').doc('Bueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll5b(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5').doc('Regular').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll5r(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5').doc('Malo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll5m(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta5').doc('MuyMalo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll5mm(dat)} );
    //________________________________________
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6').doc('MuyBueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll6mb(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6').doc('Bueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll6b(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6').doc('Regular').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll6r(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6').doc('Malo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll6m(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta6').doc('MuyMalo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll6mm(dat)} );
    //________________________________________
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7').doc('MuyBueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll7mb(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7').doc('Bueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll7b(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7').doc('Regular').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll7r(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7').doc('Malo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll7m(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta7').doc('MuyMalo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll7mm(dat)} );
    //________________________________________
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8').doc('MuyBueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll8mb(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8').doc('Bueno').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll8b(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8').doc('Regular').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll8r(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8').doc('Malo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll8m(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta8').doc('MuyMalo').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll8mm(dat)} );
    //________________________________________
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta9').doc('Si').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll9mb(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta9').doc('N-A').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll9r(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta9').doc('No').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll9mm(dat)} );
    //________________________________________
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta10').doc('Si').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcomll10mb(dat)} );
    this.afs.collection('Contadores').doc(this.fechareporte).collection('Pregunta10').doc('No').valueChanges().pipe(take(1)).subscribe(dat => {this.getitemcoll10mm(dat)} );
  }

      // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }
  
//___________________________________________________________________
//___________________________________________________________________ Collection Contadores VIGA
getitemcoll1mb(con: ContadorInterface){
 this.cp1mb = con.contador
}
getitemcoll1b(con: ContadorInterface){
this.cp1b = con.contador 
}
getitemcoll1r(con: ContadorInterface){
this.cp1r = con.contador 
}
getitemcoll1m(con: ContadorInterface){
this.cp1m = con.contador 
}
getitemcoll1mm(con: ContadorInterface){
this.cp1mm = con.contador 
}
//___________________________________________________________________
getitemcoll2mb(con: ContadorInterface){
this.cp2mb = con.contador 
}
getitemcoll2mm(con: ContadorInterface){
this.cp2mm = con.contador 
}
//___________________________________________________________________
getitemcoll3mb(con: ContadorInterface){
this.cp3mb = con.contador 
}
getitemcoll3b(con: ContadorInterface){
this.cp3b = con.contador 
}
getitemcoll3r(con: ContadorInterface){
this.cp3r = con.contador 
}
getitemcoll3m(con: ContadorInterface){
this.cp3m = con.contador 
}
getitemcoll3mm(con: ContadorInterface){
this.cp3mm = con.contador 
}
//___________________________________________________________________
getitemcoll4mb(con: ContadorInterface){
this.cp4mb = con.contador 
}
getitemcoll4b(con: ContadorInterface){
this.cp4b = con.contador 
}
getitemcoll4r(con: ContadorInterface){
this.cp4r = con.contador 
}
getitemcoll4m(con: ContadorInterface){
this.cp4m = con.contador 
}
getitemcoll4mm(con: ContadorInterface){
this.cp4mm = con.contador 
}
//___________________________________________________________________
getitemcoll5mb(con: ContadorInterface){
this.cp5mb = con.contador 
}
getitemcoll5b(con: ContadorInterface){
this.cp5b = con.contador 
}
getitemcoll5r(con: ContadorInterface){
this.cp5r = con.contador 
}
getitemcoll5m(con: ContadorInterface){
this.cp5m = con.contador 
}
getitemcoll5mm(con: ContadorInterface){
this.cp5mm = con.contador 
}
//___________________________________________________________________
getitemcoll6mb(con: ContadorInterface){
this.cp6mb = con.contador 
}
getitemcoll6b(con: ContadorInterface){
this.cp6b = con.contador 
}
getitemcoll6r(con: ContadorInterface){
this.cp6r = con.contador 
}
getitemcoll6m(con: ContadorInterface){
this.cp6m = con.contador 
}
getitemcoll6mm(con: ContadorInterface){
this.cp6mm = con.contador 
}
//___________________________________________________________________
getitemcoll7mb(con: ContadorInterface){
this.cp7mb = con.contador 
}
getitemcoll7b(con: ContadorInterface){
this.cp7b = con.contador 
}
getitemcoll7r(con: ContadorInterface){
this.cp7r = con.contador 
}
getitemcoll7m(con: ContadorInterface){
this.cp7m = con.contador 
}
getitemcoll7mm(con: ContadorInterface){
this.cp7mm = con.contador 
}
//___________________________________________________________________
getitemcoll8mb(con: ContadorInterface){
this.cp8mb = con.contador 
}
getitemcoll8b(con: ContadorInterface){
this.cp8b = con.contador 
}
getitemcoll8r(con: ContadorInterface){
this.cp8r = con.contador 
}
getitemcoll8m(con: ContadorInterface){
this.cp8m = con.contador 
}
getitemcoll8mm(con: ContadorInterface){
this.cp8mm = con.contador 
}
//___________________________________________________________________
getitemcoll9mb(con: ContadorInterface){
this.cp9mb = con.contador 
}
getitemcoll9r(con: ContadorInterface){
 this.cp9r = con.contador 
}
getitemcoll9mm(con: ContadorInterface){
this.cp9mm = con.contador 
}
//___________________________________________________________________
getitemcomll10mb(con: ContadorInterface){
this.cp10mb = con.contador 
}
getitemcoll10mm(con: ContadorInterface){
this.cp10mm = con.contador 
this.arras()
}
}
