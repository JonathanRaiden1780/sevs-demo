import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { take } from 'rxjs/operators';

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

  rows1: any;
  rows2: any;
  rows3: any;

  colums: any;
  contadorre: number;
  
  constructor(
    private afs: AngularFirestore,
    private encuestaex: EncuestaService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    //this.encuestaex.getcolections();
    this.encuestaex.getitemcoll1mb().subscribe(id => this.listp1mb = id as Array<string>); 
   this.encuestaex.getitemcoll1b().subscribe(id =>  this.listp1b = id as Array<string>);
   this.encuestaex.getitemcoll1r().subscribe(id =>  this.listp1r = id as Array<string>);
   this.encuestaex.getitemcoll1m().subscribe(id =>  this.listp1m = id as Array<string>);
   this.encuestaex.getitemcoll1mm().subscribe(id => this.listp1mm = id as Array<string>);

   this.encuestaex.getitemcoll2mb().subscribe(id => this.listp2mb = id as Array<string>);
   this.encuestaex.getitemcoll2b().subscribe(id =>  this.listp2b = id as Array<string>);
   this.encuestaex.getitemcoll2r().subscribe(id =>  this.listp2r = id as Array<string>);
   this.encuestaex.getitemcoll2m().subscribe(id =>  this.listp2m = id as Array<string>);
   this.encuestaex.getitemcoll2mm().subscribe(id => this.listp2mm = id as Array<string>);
   
   this.encuestaex.getitemcoll3mb().subscribe(id => this.listp3mb = id as Array<string>);
   this.encuestaex.getitemcoll3b().subscribe(id =>  this.listp3b = id as Array<string>);
   this.encuestaex.getitemcoll3r().subscribe(id =>  this.listp3r = id as Array<string>);
   this.encuestaex.getitemcoll3m().subscribe(id =>  this.listp3m = id as Array<string>);
   this.encuestaex.getitemcoll3mm().subscribe(id => this.listp3mm = id as Array<string>);

   this.encuestaex.getitemcoll4mb().subscribe(id => this.listp4mb = id as Array<string>);
   this.encuestaex.getitemcoll4b().subscribe(id =>  this.listp4b = id as Array<string>);
   this.encuestaex.getitemcoll4r().subscribe(id =>  this.listp4r = id as Array<string>);
   this.encuestaex.getitemcoll4m().subscribe(id =>  this.listp4m = id as Array<string>);
   this.encuestaex.getitemcoll4mm().subscribe(id => this.listp4mm = id as Array<string>);

   this.encuestaex.getitemcoll5mb().subscribe(id => this.listp5mb = id as Array<string>);
   this.encuestaex.getitemcoll5b().subscribe(id =>  this.listp5b = id as Array<string>);
   this.encuestaex.getitemcoll5r().subscribe(id =>  this.listp5r = id as Array<string>);
   this.encuestaex.getitemcoll5m().subscribe(id =>  this.listp5m = id as Array<string>);
   this.encuestaex.getitemcoll5mm().subscribe(id => this.listp5mm = id as Array<string>);

   this.encuestaex.getitemcoll6mb().subscribe(id => this.listp6mb = id as Array<string>);
   this.encuestaex.getitemcoll6b().subscribe(id =>  this.listp6b = id as Array<string>);
   this.encuestaex.getitemcoll6r().subscribe(id =>  this.listp6r = id as Array<string>);
   this.encuestaex.getitemcoll6m().subscribe(id =>  this.listp6m = id as Array<string>);
   this.encuestaex.getitemcoll6mm().subscribe(id => this.listp6mm = id as Array<string>);

   this.encuestaex.getitemcoll7mb().subscribe(id => this.listp7mb = id as Array<string>);
   this.encuestaex.getitemcoll7b().subscribe(id =>  this.listp7b = id as Array<string>);
   this.encuestaex.getitemcoll7r().subscribe(id =>  this.listp7r = id as Array<string>);
   this.encuestaex.getitemcoll7m().subscribe(id =>  this.listp7m = id as Array<string>);
   this.encuestaex.getitemcoll7mm().subscribe(id => this.listp7mm = id as Array<string>);

   this.encuestaex.getitemcoll8mb().subscribe(id => this.listp8mb = id as Array<string>);
   this.encuestaex.getitemcoll8b().subscribe(id =>  this.listp8b = id as Array<string>);
   this.encuestaex.getitemcoll8r().subscribe(id =>  this.listp8r = id as Array<string>);
   this.encuestaex.getitemcoll8m().subscribe(id =>  this.listp8m = id as Array<string>);
   this.encuestaex.getitemcoll8mm().subscribe(id => this.listp8mm = id as Array<string>);

   this.encuestaex.getitemcoll9mb().subscribe(id => this.listp9mb = id as Array<string>);
   this.encuestaex.getitemcoll9r().subscribe(id => this.listp9r = id as Array<string>);
   this.encuestaex.getitemcoll9mm().subscribe(id =>  this.listp9mm = id as Array<string>);

   this.encuestaex.getitemcoll10mb().subscribe(id => this.listp10mb = id as Array<string>);
   this.encuestaex.getitemcoll10mm().subscribe(id =>  this.listp10mm = id as Array<string>);

   }
   cp1mb: number; cp1b: number; cp1r: number; cp1m: number; cp1mm: number;
   cp2mb: number; cp2b: number; cp2r: number; cp2m: number; cp2mm: number;
   cp3mb: number; cp3b: number; cp3r: number; cp3m: number; cp3mm: number;
   cp4mb: number; cp4b: number; cp4r: number; cp4m: number; cp4mm: number;
   cp5mb: number; cp5b: number; cp5r: number; cp5m: number; cp5mm: number;
   cp6mb: number; cp6b: number; cp6r: number; cp6m: number; cp6mm: number;
   cp7mb: number; cp7b: number; cp7r: number; cp7m: number; cp7mm: number;
   cp8mb: number; cp8b: number; cp8r: number; cp8m: number; cp8mm: number;
   cp9mb: number; cp9mm: number; cp9r:number; cp10mb: number; cp10mm: number;

   listp1mb: string[]; listp2mb: string[]; listp3mb: string[]; listp4mb: string[]; listp5mb: string[]; listp6mb: string[]; listp7mb: string[]; listp8mb: string[]; listp9mb: string[]; listp10mb: string[];
   listp1b: string[]; listp2b: string[]; listp3b: string[]; listp4b: string[]; listp5b: string[]; listp6b: string[]; listp7b: string[]; listp8b: string[]; 
   listp1r: string[]; listp2r: string[]; listp3r: string[]; listp4r: string[]; listp5r: string[]; listp6r: string[]; listp7r: string[]; listp8r: string[];  listp9r:string[];
   listp1m: string[]; listp2m: string[]; listp3m: string[]; listp4m: string[]; listp5m: string[]; listp6m: string[]; listp7m: string[]; listp8m: string[]; 
   listp1mm: string[]; listp2mm: string[]; listp3mm: string[]; listp4mm: string[]; listp5mm: string[]; listp6mm: string[]; listp7mm: string[]; listp8mm: string[]; listp9mm: string[]; listp10mm: string[];

  ngOnInit() {
    this.getData2();
    this.cont()
  }
  cont() {
    this.afs.collection('type').doc('VI0001').valueChanges().pipe(take(1)).subscribe(res => {this.arras(res); } ); // se tomara de otra base
 }
 arras( x: EncuestaexInterface) {
    this.cp1mb = this.listp1mb.length;
    this.cp1b =  this.listp1b.length;
    this.cp1r =  this.listp1r.length;
    this.cp1m =  this.listp1m.length;
    this.cp1mm = this.listp1mm.length;

    this.cp2mb = this.listp2mb.length;
    this.cp2b =  this.listp2b.length;
    this.cp2r =  this.listp2r.length;
    this.cp2m =  this.listp2m.length;
    this.cp2mm = this.listp2mm.length;
    
    this.cp3mb = this.listp3mb.length;
    this.cp3b =  this.listp3b.length;
    this.cp3r =  this.listp3r.length;
    this.cp3m =  this.listp3m.length;
    this.cp3mm = this.listp3mm.length;

    this.cp4mb = this.listp4mb.length;
    this.cp4b =  this.listp4b.length;
    this.cp4r =  this.listp4r.length;
    this.cp4m =  this.listp4m.length;
    this.cp4mm = this.listp4mm.length;

    this.cp5mb = this.listp5mb.length;
    this.cp5b =  this.listp5b.length;
    this.cp5r =  this.listp5r.length;
    this.cp5m =  this.listp5m.length;
    this.cp5mm = this.listp5mm.length;

    this.cp6mb = this.listp6mb.length;
    this.cp6b =  this.listp6b.length;
    this.cp6r =  this.listp6r.length;
    this.cp6m =  this.listp6m.length;
    this.cp6mm = this.listp6mm.length;

    this.cp7mb = this.listp7mb.length;
    this.cp7b =  this.listp7b.length;
    this.cp7r =  this.listp7r.length;
    this.cp7m =  this.listp7m.length;
    this.cp7mm = this.listp7mm.length;

    this.cp8mb = this.listp8mb.length;
    this.cp8b =  this.listp8b.length;
    this.cp8r =  this.listp8r.length;
    this.cp8m =  this.listp8m.length;
    this.cp8mm = this.listp8mm.length;

    this.cp9mb = this.listp9mb.length;
    this.cp9r = this.listp9r.length;
    this.cp9mm = this.listp9mm.length;

    this.cp10mb =this.listp10mb.length;
    this.cp10mm =this.listp10mm.length;

    this.pieChartDataP1 = [this.cp1mm,this.cp1m,this.cp1r,this.cp1b,this.cp1mb];
    
    this.pieChartDataP2 = [this.cp2mm,this.cp2mb];
    
    this.pieChartDataP3 = [this.cp3mm,this.cp3m,this.cp3r,this.cp3b,this.cp3mb];

    this.pieChartDataP4 = [this.cp4mm,this.cp4m,this.cp4r,this.cp4b,this.cp4mb];
    
    this.pieChartDataP5 = [this.cp5mm,this.cp5m,this.cp5r,this.cp5b,this.cp5mb];
    
    this.pieChartDataP6 = [this.cp6mm,this.cp6m,this.cp6r,this.cp6b,this.cp6mb];
    
    this.pieChartDataP7 = [this.cp7mm,this.cp7m,this.cp7r,this.cp7b,this.cp7mb];

    this.pieChartDataP8 = [this.cp8mm,this.cp8m,this.cp8r,this.cp8b,this.cp8mb];
    
    this.pieChartDataP1_R = [this.cp9r,this.cp9mb,this.cp9mm];

    this.pieChartDataP2_R = [this.cp10mm,this.cp10mb];
 }
  getData2() {
    this.afs.collection('Encuestareps').valueChanges().subscribe((encuesta) => {
      this.rows2 = encuesta ;
    });
  }
      // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }
}
