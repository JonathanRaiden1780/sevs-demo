import { Component, OnInit } from '@angular/core';
import { faTired, faSadTear, faGrin, faSmileBeam, faCheckSquare, faTimesCircle, faMeh, faHourglassStart, faHourglassHalf, faHourglassEnd, faVoteYea, faCarSide, faTruck, faTruckPickup, faAmbulance } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { EncuestaService } from 'src/app/services/encuesta.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http, Headers, Response, URLSearchParams, RequestOptions, HttpModule } from '@angular/http';

@Component({
  selector: 'app-reparacion',
  templateUrl: './reparacion.component.html',
  styleUrls: ['./reparacion.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ReparacionComponent implements OnInit {
  
  totalnot: number;
  EncuestaexCollection: AngularFirestoreCollection<EncuestaexInterface>;
  constructor(
    private _formBuilder: FormBuilder,
    private encuestaService: EncuestaService,
    private router: Router,
    private http: Http,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private af: AngularFireDatabase
  ) 
  
  {
    const today = new Date();
    this.EncuestaexCollection = this.afs.collection('Contadores', ref => ref);
    this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.mod.mesnumero =  today.getMonth()+1;
    this.mod.año =  today.getFullYear();
   }
   meses:string[] = ["Mes","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  faTired = faTired;
  faSadTear = faSadTear;
  faGrin = faGrin;
  faSmileBeam = faSmileBeam;
  faCheckSquare = faCheckSquare;
  faTimesCircle = faTimesCircle;
  faMeh = faMeh;
  faHourglassStart = faHourglassStart;
  faHourglassHalf = faHourglassHalf;
  faHourglassEnd = faHourglassEnd;
  faVoteYea = faVoteYea;

  faCar = faCarSide;
  faTruck = faTruck;
  faTruckPickup = faTruckPickup;
  faAmbulance = faAmbulance;

  value: string;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixFormGroup: FormGroup;
  sevenFormGroup: FormGroup;
  y: number;
  ident: string;
  mod: any = {};
  model: any = {
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
    p6: 0,
    p7: 0,
    p8: 0,
    p9: false,
    p10: false,
    p9c: 0,
    p10c: 0
  };
  model2: any = {
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
    p6: 0,
    p7: 0,
    p8: 0,
    p9: 0,
    p10: 0
  };
  Encuesta: EncuestaexInterface = {

    fecha: '',
    pregunta1: 0,
    pregunta2: 0,
    pregunta3: 0,
    pregunta4: 0,
    pregunta5: 0,
    pregunta6: 0,
    pregunta7: 0,
    pregunta8: 0,
    pregunta9: '',
    pregunta10: '',
    total: 0
  };
  fechareporte: string;
  public isYes = true;
  public isNo = true;
  proms: string;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdFormGroup: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthFormGroup: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthFormGroup: ['', Validators.required]
    });
    this.sixFormGroup = this._formBuilder.group({
      sixFormGroup: ['', Validators.required]
    });
    this.sevenFormGroup = this._formBuilder.group({
      sevenFormGroup: ['', Validators.required]
    });
    this.onChange();
    for(var mc=1; mc<=12; mc++){
      if(this.mod.mesnumero == mc){
        this.mod.mes = this.meses[mc];
      }
    }
    this.fechareporte = this.mod.mes+this.mod.año;
   
  }
  onGuardarEncuesta({value}: {value: EncuestaexInterface}) {
    this.proms = this.y.toFixed(2);
    
    value.id = this.ident;
    value.pregunta1 = this.model.p1;
    value.pregunta2 = this.model.p2;
    value.pregunta3 = this.model.p3;
    value.pregunta4 = this.model.p4;
    value.pregunta5 = this.model.p5;
    value.pregunta6 = this.model.p6;
    value.pregunta7 = this.model.p7;
    value.pregunta8 = this.model.p8;
    value.pregunta9 = this.model.p9;
    value.pregunta10 = this.model.p10;
    value.pregunta9cont = this.model.p9c;
    value.pregunta10cont = this.model.p10c;
    value.contestada = true;
    value.fecha = formatDate(new Date(), 'dd/MM/yyyy hh:mm:ss a', 'en');
    value.total = +this.proms;
    value.fechareporte = this.fechareporte;
    this.totalnot = value.total;
  
    if(this.ident.includes('VI') == true){
      this.encuestaService.updateTypeALL(value);
      this.encuestaService.requestupdateTypee('Viga',this.fechareporte)
      this.encuestaService.updateEncuestarep(value);
      this.contador(value);
      this.sendemail(value.total);
    }
  else if(this.ident.includes('CE') == true){
    this.encuestaService.updateTypeALL(value);
    this.encuestaService.updateEncuestarepC(value);
    this.encuestaService.requestupdateTypee('Centenario',this.fechareporte)
    this.contadorC(value);
    this.sendemail(value.total);
  }
    this.router.navigate(['/home']);
  }
  contadorC(x:any){
    
    //P1
        if (this.model2.p1 == 100){
          this.EncuestaexCollection.doc('Pregunta1C/').collection('MuyBueno').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p1 == 80){
          this.EncuestaexCollection.doc('Pregunta1C/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p1 == 60){
          this.EncuestaexCollection.doc('Pregunta1C/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p1 == 40){
          this.EncuestaexCollection.doc('Pregunta1C/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p1 == 20){
          this.EncuestaexCollection.doc('Pregunta1C/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }
    //P2
        if (this.model2.p2 == 100){
          this.EncuestaexCollection.doc('Pregunta2C/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p2 == 50){
          this.EncuestaexCollection.doc('Pregunta2C/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }
    //P3
        if (this.model2.p3 == 100){
          this.EncuestaexCollection.doc('Pregunta3C/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p3 == 80){
          this.EncuestaexCollection.doc('Pregunta3C/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p3 == 60){
          this.EncuestaexCollection.doc('Pregunta3C/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p3 == 40){
          this.EncuestaexCollection.doc('Pregunta3C/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p3 == 20){
          this.EncuestaexCollection.doc('Pregunta3C/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }
        
    //P4
        if (this.model2.p4 == 100){
          this.EncuestaexCollection.doc('Pregunta4C/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p4 == 80){
          this.EncuestaexCollection.doc('Pregunta4C/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p4 == 60){
          this.EncuestaexCollection.doc('Pregunta4C/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p4 == 40){
          this.EncuestaexCollection.doc('Pregunta4C/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p4 == 20){
          this.EncuestaexCollection.doc('Pregunta4C/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }
    //P5
        if (this.model2.p5 == 100){
          this.EncuestaexCollection.doc('Pregunta5C/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p5 == 80){
          this.EncuestaexCollection.doc('Pregunta5C/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p5 == 60){
          this.EncuestaexCollection.doc('Pregunta5C/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p5 == 40){
          this.EncuestaexCollection.doc('Pregunta5C/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p5 == 20){
          this.EncuestaexCollection.doc('Pregunta5C/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }
    //P6
        if (this.model2.p6 == 100){
          this.EncuestaexCollection.doc('Pregunta6C/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p6 == 80){
          this.EncuestaexCollection.doc('Pregunta6C/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p6 == 60){
          this.EncuestaexCollection.doc('Pregunta6C/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p6 == 40){
          this.EncuestaexCollection.doc('Pregunta6C/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p6 == 20){
          this.EncuestaexCollection.doc('Pregunta6C/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }
    //P7
        if (this.model2.p7 == 100){
          this.EncuestaexCollection.doc('Pregunta7C/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p7 == 80){
          this.EncuestaexCollection.doc('Pregunta7C/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p7 == 60){
          this.EncuestaexCollection.doc('Pregunta7C/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p7 == 40){
          this.EncuestaexCollection.doc('Pregunta7C/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p7 == 20){
          this.EncuestaexCollection.doc('Pregunta7C/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }
    //P8
        if (this.model2.p8 == 100){
          this.EncuestaexCollection.doc('Pregunta8C/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p8 == 80){
          this.EncuestaexCollection.doc('Pregunta8C/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p8 == 60){
          this.EncuestaexCollection.doc('Pregunta8C/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p8 == 40){
          this.EncuestaexCollection.doc('Pregunta8C/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p8 == 20){
          this.EncuestaexCollection.doc('Pregunta8C/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }
    //P9
        if (this.model2.p9 == 1){
          this.EncuestaexCollection.doc('Pregunta9C/').collection('Si/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p9 == 0){
          this.EncuestaexCollection.doc('Pregunta9C/').collection('No/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p9 == 2){
          this.EncuestaexCollection.doc('Pregunta9C/').collection('N-A/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }
    //P10
        if (this.model2.p10 == 1){
          this.EncuestaexCollection.doc('Pregunta10C/').collection('Si/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }else if (this.model2.p10 == 0){
          this.EncuestaexCollection.doc('Pregunta10C/').collection('No/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
        }
      }
  contador(x:any){
    
//P1
    if (this.model2.p1 == 100){
      this.EncuestaexCollection.doc('Pregunta1/').collection('MuyBueno').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p1 == 80){
      this.EncuestaexCollection.doc('Pregunta1/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p1 == 60){
      this.EncuestaexCollection.doc('Pregunta1/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p1 == 40){
      this.EncuestaexCollection.doc('Pregunta1/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p1 == 20){
      this.EncuestaexCollection.doc('Pregunta1/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }
//P2
    if (this.model2.p2 == 100){
      this.EncuestaexCollection.doc('Pregunta2/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p2 == 50){
      this.EncuestaexCollection.doc('Pregunta2/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }
    
 //P3
    if (this.model2.p3 == 100){
      this.EncuestaexCollection.doc('Pregunta3/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p3 == 80){
      this.EncuestaexCollection.doc('Pregunta3/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p3 == 60){
      this.EncuestaexCollection.doc('Pregunta3/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p3 == 40){
      this.EncuestaexCollection.doc('Pregunta3/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p3 == 20){
      this.EncuestaexCollection.doc('Pregunta3/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }

    //P4
    if (this.model2.p4 == 100){
      this.EncuestaexCollection.doc('Pregunta4/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p4 == 80){
      this.EncuestaexCollection.doc('Pregunta4/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p4 == 60){
      this.EncuestaexCollection.doc('Pregunta4/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p4 == 40){
      this.EncuestaexCollection.doc('Pregunta4/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p4 == 20){
      this.EncuestaexCollection.doc('Pregunta4/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }
    //P5
    if (this.model2.p5 == 100){
      this.EncuestaexCollection.doc('Pregunta5/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p5 == 80){
      this.EncuestaexCollection.doc('Pregunta5/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p5 == 60){
      this.EncuestaexCollection.doc('Pregunta5/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p5 == 40){
      this.EncuestaexCollection.doc('Pregunta5/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p5 == 20){
      this.EncuestaexCollection.doc('Pregunta5/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }
    //P6
    if (this.model2.p6 == 100){
      this.EncuestaexCollection.doc('Pregunta6/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p6 == 80){
      this.EncuestaexCollection.doc('Pregunta6/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p6 == 60){
      this.EncuestaexCollection.doc('Pregunta6/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p6 == 40){
      this.EncuestaexCollection.doc('Pregunta6/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p6 == 20){
      this.EncuestaexCollection.doc('Pregunta6/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }
    //P7
    if (this.model2.p7 == 100){
      this.EncuestaexCollection.doc('Pregunta7/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p7 == 80){
      this.EncuestaexCollection.doc('Pregunta7/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p7 == 60){
      this.EncuestaexCollection.doc('Pregunta7/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p7 == 40){
      this.EncuestaexCollection.doc('Pregunta7/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p7 == 20){
      this.EncuestaexCollection.doc('Pregunta7/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }
    //P8
    if (this.model2.p8 == 100){
      this.EncuestaexCollection.doc('Pregunta8/').collection('MuyBueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p8 == 80){
      this.EncuestaexCollection.doc('Pregunta8/').collection('Bueno/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p8 == 60){
      this.EncuestaexCollection.doc('Pregunta8/').collection('Regular/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p8 == 40){
      this.EncuestaexCollection.doc('Pregunta8/').collection('Malo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p8 == 20){
      this.EncuestaexCollection.doc('Pregunta8/').collection('MuyMalo/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }
    //P9
    if (this.model2.p9 == 1){
      this.EncuestaexCollection.doc('Pregunta9/').collection('Si/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p9 == 0){
      this.EncuestaexCollection.doc('Pregunta9/').collection('No/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p9 == 2){
      this.EncuestaexCollection.doc('Pregunta9/').collection('N-A/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }
    //P10
    if (this.model2.p10 == 1){
      this.EncuestaexCollection.doc('Pregunta10/').collection('Si/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }else if (this.model2.p10 == 0){
      this.EncuestaexCollection.doc('Pregunta10/').collection('No/').doc(this.fechareporte).collection('contador').doc(x.id).set(x);
    }
  }

  onChange() {

    this.ident = this.route.snapshot.params['id'];
}
sendemail(t:number) { 
  //console.log('prueba');

  if (t <= 50){
  const name = 'Jonathan Huerta';
  const email = 'jonathan.huerta@casanovarentacar.mx';
  const message = 'ALERTA !!!!! HUBO UN PROBLEMA CON EL CLIENTE';
  const subject = 'Validar situación calificación de encuesta: ' + this.totalnot;

  let formRequest = { name, email, subject, message};
  this.af.list('/messages').push(formRequest);
  
  }
  if (t >= 95){
    const name = 'Jonathan Huerta';
    const email = 'jonathan.huerta@casanovarentacar.mx';
    const message = 'Felicidades el servicio fue el mejor';
    const subject = 'La calificación del servicio fue: ' + this.totalnot;

    let formRequest = { name, email, subject, message};
    this.af.list('/messages').push(formRequest);
    
    }

  /* let url = `https://us-central1-casanovaeva01.cloudfunctions.net/httpEmail`;
  let params: URLSearchParams = new URLSearchParams();
  //private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':"*" , 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'});
  let options = new RequestOptions({ headers: headers });

  params.set('to', 'darrell.1780@gmail.com');
  params.set('from', 'sevs@casanovarentacar.mx');
  params.set('subject', 'test-email');
  params.set('content', 'Hello World');
  console.log('enviado');
  return this.http.post(url, params, options)
                  .toPromise()
                  .then( res => {
                    console.log(res)
                  })
                  .catch(err => {
                    console.log(err)
                  })
                   */
                
}

p1ex(x) {
  this.model.p1 = x;
  this.model2.p1 = x;
}
p2ex(x) {
  this.model.p2 = x;
  this.model2.p2 = x;
}
p3ex(x) {
  this.model.p3 = x;
  this.model2.p3 = x;
  if (this.model.p3 === 100 || this.model.p3 === 80 || this.model.p3 === 60 ) {
    this.model.p9 = 'N/A';
    this.model.p9c = 1;
    this.model2.p9 = 2;
  }
}
p4ex(x) {
  this.model.p4 = x;
  this.model2.p4 = x;
}
p5ex(x) {
  this.model.p5 = x;
  this.model2.p5 = x;
}
p6ex(x) {
  this.model.p6 = x;
  this.model2.p6 = x;
}
p7ex(x) {
  this.model.p7 = x;
  this.model2.p7 = x;
}
p8ex(x) {
  this.model.p8 = x;
  this.model2.p8 = x;
}

p10ex(x) {
  if (x === true) {
    this.model.p10 = 'Si';
    this.model.p10c = 1;
    this.model2.p10 = 1;
  } else {
    this.model.p10 = 'No';
    this.model.p2 = 100;
    this.model2.p2 = 100;
    this.model.p10c = 0;
    this.model2.p10 = 0;
  }
  //pregunta 10 y 2 son juntas
  //pregunta 3 y 9 son juntas
  // //console.log(x, this.model.p10);
}
p9ex(x) {
  if (x === false ) {
    this.model.p9 = 'No';
    this.model.p9c = 0;
    this.model2.p9 = 0;
  } else {
    this.model.p9 = 'Si';
    this.model.p9c = 1;
    this.model2.p9 = 1;
  }
 
}
sum() {

  this.y =  (this.model.p1 + this.model.p2 + this.model.p3 + this.model.p4 + this.model.p5 + this.model.p6 + this.model.p7 + this.model.p8) / 8;
}


  onNo() {
    this.isYes = false;
  }
  onSi() {
    this.isNo = false;
  }
}
