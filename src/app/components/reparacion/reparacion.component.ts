import { Component, OnInit, ViewChild } from '@angular/core';
import { faTired, faSadTear, faGrin, faSmileBeam, faCheckSquare, faTimesCircle, faMeh, faHourglassStart, faHourglassHalf, faHourglassEnd, faVoteYea, faCarSide, faTruck, faTruckPickup, faAmbulance } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { MatStepper } from '@angular/material/stepper'

@Component({
  selector: 'app-reparacion',
  templateUrl: './reparacion.component.html',
  styleUrls: ['./reparacion.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})

export class ReparacionComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;
  totalStepsCount: number;
  totalnot: number;
  EncuestaexCollection: AngularFirestoreCollection<EncuestaexInterface>;
  constructor(
    private _formBuilder: FormBuilder,
    private encuestaService: EncuestaService,
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
  ) {
    const today = new Date();
    this.EncuestaexCollection = this.afs.collection('Contadores', ref => ref);
    this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.mod.mesnumero = today.getMonth() + 1;
    this.mod.año = today.getFullYear();
  }
  meses: string[] = ["Mes", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
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
  public p1 = "Pregunta1";
  public p2 = "Pregunta2";
  public p3 = "Pregunta3";
  public p4 = "Pregunta4";
  public p5 = "Pregunta5";
  public p6 = "Pregunta6";
  public p7 = "Pregunta7";
  public p8 = "Pregunta8";
  public p9 = "Pregunta9";
  public p10 = "Pregunta10";
  public mb = 'MuyBueno';
  public b = 'Bueno';
  public r = 'Regular';
  public m = 'Malo';
  public mm = 'MuyMalo';
  public s = 'Si';
  public n = 'No';
  public na = 'N-A';
  value: string;
  public data: any
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixFormGroup: FormGroup;
  sevenFormGroup: FormGroup;
  eightFormGroup: FormGroup;
  nineFormGroup: FormGroup;
  tenFormGroup: FormGroup;
  finalFormGroup: FormGroup;
  y: number;
  ident: string;
  mod: any = {};
  model: any = { p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0, p7: 0, p8: 0, p9: false, p10: false, p9c: 0, p10c: 0 };
  model2: any = { p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0, p7: 0, p8: 0, p9: 0, p10: 0 };
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
    this.afs.collection('Ubicacion').valueChanges().subscribe(x => { this.data = x })
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
    this.eightFormGroup = this._formBuilder.group({
      eightFormGroup: ['', Validators.required]
    });
    this.nineFormGroup = this._formBuilder.group({
      nineFormGroup: ['', Validators.required]
    });
    this.tenFormGroup = this._formBuilder.group({
      tenFormGroup: ['', Validators.required]
    });
    this.finalFormGroup = this._formBuilder.group({
      finalFormGroup: ['', Validators.required]
    });

    this.onChange();
    for (var mc = 1; mc <= 12; mc++) {
      if (this.mod.mesnumero == mc) {
        this.mod.mes = this.meses[mc];
      }
    }
    this.fechareporte = this.mod.mes + this.mod.año;
  }
  onGuardarEncuesta({ value }: { value: EncuestaexInterface }) {
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
    const search = this.ident.slice(0, 2)
    for (var u = 0; u < this.data.length; u++) {
      if (search == this.data[u].id) {
        var ubicacion = this.data[u].ubicacion;
      }
    }
    if (value.pregunta1 == 0 || value.pregunta2 == 0 || value.pregunta3 == 0 || value.pregunta4 == 0 || value.pregunta5 == 0 ||
      value.pregunta6 == 0 || value.pregunta7 == 0 || value.pregunta8 == 0) {
      confirm("Comunicarse con Soporte... Problema de Registro");
    }
    else {
      this.encuestaService.updateTypeALL(value);
      var año = this.mod.año as string + '_encuestas'
      this.encuestaService.getcontador2(ubicacion, this.fechareporte, año)
      this.encuestaService.updateEncuestarep(value, ubicacion);
      //    this.sendemail(value.total);
      this.valcontadores(search);
    }
    this.router.navigate(['/home']);
  }
  valcontadores(x: string) {
    var docref = this.afs.firestore.collection('Contadores').doc(this.fechareporte).collection(this.p1 + x).doc(this.mb);
    docref.get().then(doc => {
      if (doc.exists == true) {
        console.log(doc.exists)
        this.contador(x);
      }
      else {
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p1 + x).doc(this.mb).set({ contador: 0, calificacion: 'MuyBueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p1 + x).doc(this.b).set({ contador: 0, calificacion: 'Bueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p1 + x).doc(this.r).set({ contador: 0, calificacion: 'Regular' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p1 + x).doc(this.m).set({ contador: 0, calificacion: 'Malo' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p1 + x).doc(this.mm).set({ contador: 0, calificacion: 'MuyMalo' })

        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p2 + x).doc(this.mb).set({ contador: 0, calificacion: 'MuyBueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p2 + x).doc(this.mm).set({ contador: 0, calificacion: 'MuyMalo' })

        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p3 + x).doc(this.mb).set({ contador: 0, calificacion: 'MuyBueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p3 + x).doc(this.b).set({ contador: 0, calificacion: 'Bueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p3 + x).doc(this.r).set({ contador: 0, calificacion: 'Regular' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p3 + x).doc(this.m).set({ contador: 0, calificacion: 'Malo' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p3 + x).doc(this.mm).set({ contador: 0, calificacion: 'MuyMalo' })

        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p4 + x).doc(this.mb).set({ contador: 0, calificacion: 'MuyBueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p4 + x).doc(this.b).set({ contador: 0, calificacion: 'Bueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p4 + x).doc(this.r).set({ contador: 0, calificacion: 'Regular' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p4 + x).doc(this.m).set({ contador: 0, calificacion: 'Malo' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p4 + x).doc(this.mm).set({ contador: 0, calificacion: 'MuyMalo' })

        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p5 + x).doc(this.mb).set({ contador: 0, calificacion: 'MuyBueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p5 + x).doc(this.b).set({ contador: 0, calificacion: 'Bueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p5 + x).doc(this.r).set({ contador: 0, calificacion: 'Regular' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p5 + x).doc(this.m).set({ contador: 0, calificacion: 'Malo' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p5 + x).doc(this.mm).set({ contador: 0, calificacion: 'MuyMalo' })

        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p6 + x).doc(this.mb).set({ contador: 0, calificacion: 'MuyBueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p6 + x).doc(this.b).set({ contador: 0, calificacion: 'Bueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p6 + x).doc(this.r).set({ contador: 0, calificacion: 'Regular' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p6 + x).doc(this.m).set({ contador: 0, calificacion: 'Malo' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p6 + x).doc(this.mm).set({ contador: 0, calificacion: 'MuyMalo' })

        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p7 + x).doc(this.mb).set({ contador: 0, calificacion: 'MuyBueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p7 + x).doc(this.b).set({ contador: 0, calificacion: 'Bueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p7 + x).doc(this.r).set({ contador: 0, calificacion: 'Regular' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p7 + x).doc(this.m).set({ contador: 0, calificacion: 'Malo' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p7 + x).doc(this.mm).set({ contador: 0, calificacion: 'MuyMalo' })

        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p8 + x).doc(this.mb).set({ contador: 0, calificacion: 'MuyBueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p8 + x).doc(this.b).set({ contador: 0, calificacion: 'Bueno' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p8 + x).doc(this.r).set({ contador: 0, calificacion: 'Regular' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p8 + x).doc(this.m).set({ contador: 0, calificacion: 'Malo' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p8 + x).doc(this.mm).set({ contador: 0, calificacion: 'MuyMalo' })

        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p9 + x).doc(this.s).set({ contador: 0, calificacion: 'mb' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p9 + x).doc(this.n).set({ contador: 0, calificacion: 'mb' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p9 + x).doc(this.na).set({ contador: 0, calificacion: 'mb' })

        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p10 + x).doc(this.s).set({ contador: 0, calificacion: 'mb' })
        this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p10 + x).doc(this.n).set({ contador: 0, calificacion: 'mb' })

        this.contador(x);
      }
    })
  }
  contador(x: string) {
    //P1
    if (this.model2.p1 == 100) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p1 + x).doc(this.mb).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p1 == 80) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p1 + x).doc(this.b).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p1 == 60) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p1 + x).doc(this.r).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p1 == 40) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p1 + x).doc(this.m).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p1 == 20) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p1 + x).doc(this.mm).update({ contador: firebase.firestore.FieldValue.increment(1) });
    }
    //P2
    if (this.model2.p2 == 100) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p2 + x).doc(this.mb).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p2 == 50) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p2 + x).doc(this.mm).update({ contador: firebase.firestore.FieldValue.increment(1) });
    }
    //P3
    if (this.model2.p3 == 100) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p3 + x).doc(this.mb).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p3 == 80) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p3 + x).doc(this.b).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p3 == 60) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p3 + x).doc(this.r).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p3 == 40) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p3 + x).doc(this.m).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p3 == 20) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p3 + x).doc(this.mm).update({ contador: firebase.firestore.FieldValue.increment(1) });
    }

    //P4
    if (this.model2.p4 == 100) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p4 + x).doc(this.mb).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p4 == 80) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p4 + x).doc(this.b).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p4 == 60) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p4 + x).doc(this.r).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p4 == 40) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p4 + x).doc(this.m).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p4 == 20) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p4 + x).doc(this.mm).update({ contador: firebase.firestore.FieldValue.increment(1) });
    }
    //P5
    if (this.model2.p5 == 100) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p5 + x).doc(this.mb).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p5 == 80) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p5 + x).doc(this.b).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p5 == 60) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p5 + x).doc(this.r).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p5 == 40) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p5 + x).doc(this.m).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p5 == 20) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p5 + x).doc(this.mm).update({ contador: firebase.firestore.FieldValue.increment(1) });
    }
    //P6
    if (this.model2.p6 == 100) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p6 + x).doc(this.mb).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p6 == 80) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p6 + x).doc(this.b).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p6 == 60) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p6 + x).doc(this.r).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p6 == 40) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p6 + x).doc(this.m).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p6 == 20) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p6 + x).doc(this.mm).update({ contador: firebase.firestore.FieldValue.increment(1) });
    }
    //P7
    if (this.model2.p7 == 100) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p7 + x).doc(this.mb).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p7 == 80) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p7 + x).doc(this.b).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p7 == 60) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p7 + x).doc(this.r).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p7 == 40) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p7 + x).doc(this.m).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p7 == 20) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p7 + x).doc(this.mm).update({ contador: firebase.firestore.FieldValue.increment(1) });
    }
    //P8
    if (this.model2.p8 == 100) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p8 + x).doc(this.mb).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p8 == 80) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p8 + x).doc(this.b).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p8 == 60) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p8 + x).doc(this.r).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p8 == 40) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p8 + x).doc(this.mb).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p8 == 20) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p8 + x).doc(this.mm).update({ contador: firebase.firestore.FieldValue.increment(1) });
    }
    //P9
    if (this.model2.p9 == 1) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p9 + x).doc(this.s).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p9 == 0) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p9 + x).doc(this.n).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p9 == 2) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p9 + x).doc(this.na).update({ contador: firebase.firestore.FieldValue.increment(1) });
    }
    //P10
    if (this.model2.p10 == 1) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p10 + x).doc(this.s).update({ contador: firebase.firestore.FieldValue.increment(1) });
    } else if (this.model2.p10 == 0) {
      this.afs.collection('Contadores').doc(this.fechareporte).collection(this.p10 + x).doc(this.n).update({ contador: firebase.firestore.FieldValue.increment(1) });
    }
  }
  onChange() {
    this.ident = this.route.snapshot.params['id'];
  }
  sendemail(t: number) {
    //console.log('prueba');
    if (t <= 50) {
      const name = 'Jonathan Huerta';
      const email = 'jonathan.huerta@casanovarentacar.mx';
      const message = 'ALERTA !!!!! HUBO UN PROBLEMA CON EL CLIENTE';
      const subject = 'Validar situación calificación de encuesta: ' + this.totalnot;

    }
    /* let url = `https://us-central1-Demoeva01.cloudfunctions.net/httpEmail`;
    let params: URLSearchParams = new URLSearchParams();
    //private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':"*" , 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'});
    let options = new RequestOptions({ headers: headers });
  
    params.set('to', 'darrell.1780@gmail.com');
    params.set('from', 'sevs@Demorentacar.mx');
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
  @ViewChild('stepper') private myStep: MatStepper;
  p1ex(x) {
    this.myStep.next();
    this.model.p1 = x;
    this.model2.p1 = x;
  }
  p2ex(x) {
    this.myStep.next();
    this.model.p2 = x;
    this.model2.p2 = x;
  }
  p3ex(x) {
    this.model.p3 = x;
    this.model2.p3 = x;
    if (this.model.p3 === 100 || this.model.p3 === 80 || this.model.p3 === 60) {
      this.model.p9 = 'N/A';
      this.model.p9c = 1;
      this.model2.p9 = 2;
      this.myStep.next();
    }
    else {
      this.myStep.next();
    }
  }
  p4ex(x) {
    this.myStep.next();
    this.model.p4 = x;
    this.model2.p4 = x;
  }
  p5ex(x) {
    this.myStep.next();
    this.model.p5 = x;
    this.model2.p5 = x;
  }
  p6ex(x) {
    this.myStep.next();
    this.model.p6 = x;
    this.model2.p6 = x;
  }
  p7ex(x) {
    this.myStep.next();
    this.model.p7 = x;
    this.model2.p7 = x;
  }
  p8ex(x) {
    this.myStep.next();
    this.model.p8 = x;
    this.model2.p8 = x;
  }
  p10ex(x) {
    if (x === true) {
      this.model.p10 = 'Si';
      this.model.p10c = 1;
      this.model2.p10 = 1;
      this.myStepper.selectedIndex = 2
      console.log(x, this.isYes, this.model.p2)
    } else {
      this.model.p10 = 'No';
      this.model.p2 = 100;
      this.model2.p2 = 100;
      this.model.p10c = 0;
      this.model2.p10 = 0;
      this.myStepper.selectedIndex = 2
      console.log(x, this.isYes, this.model.p2)
    }
  }
  p9ex(x) {
    this.myStep.next();
    if (x === false) {
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
    this.y = (this.model.p1 + this.model.p2 + this.model.p3 + this.model.p4 + this.model.p5 + this.model.p6 + this.model.p7 + this.model.p8) / 8;
  }
  onNo() {
    this.isYes = false;
  }
  onSi() {
    this.isNo = false;
  }
}
