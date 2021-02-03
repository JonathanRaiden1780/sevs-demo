import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { take } from 'rxjs/operators';
import { faArchive, faVoteYea, faBoxes, faStar, faTrophy, faThumbsUp, faThumbsDown, faCar, faCarCrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { Router } from '@angular/router';
import { LevelaccessService } from 'src/app/services/levelaccess.service';
import { ContadorInterface } from 'src/app/Models/contador';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('Modal',{ static:true }) Modal:TemplateRef<any>
  constructor(
   private modaldemo: NgbModal,
   private encuestaex: EncuestaService,
   private afs: AngularFirestore,
   private authservice: AuthService,
   private router: Router,
   private lvlaccess: LevelaccessService
 ) {
  const today = new Date();
    this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.mod.mesnumero =  today.getMonth()+1;
    this.mod.año =  today.getFullYear();
    this.sumas = 0;
    this.sumarep1 = 0;
    this.sumarep2 = 0;
    this.sumarep3 = 0;
    this.sumarep4 = 0;
    this.sumarep5 = 0;
    this.sumarep6 = 0;
    this.sumarep7 = 0;
    this.sumarep8 = 0;
    this.listpregunta1 = 0;
    this.listpregunta2 = 0;
    this.listpregunta3 = 0;
    this.listpregunta4 = 0;
    this.listpregunta5 = 0;
    this.listpregunta6 = 0;
    this.listpregunta7 = 0;
    this.listpregunta8 = 0;
    this.insre = 0;
    this.contadorreal = 0;
    this.insre2 = 0;
 }
 faArchive = faArchive;
 faBoxes = faBoxes;
 faVoteYea = faVoteYea;
 faTrophy = faTrophy;
 faStar = faStar;
 faThumbsUp = faThumbsUp;
 faThumbsDown = faThumbsDown;
 faCar = faCar;
 faCarCrash = faCarCrash;
 public rows1: any[];
 public isLogin: boolean;
 public isLoginSuadmin = false;
 // Variables
 ens: number;
 listpregunta1: number;
 listpregunta2: number;
 listpregunta3: number;
 listpregunta4: number;
 listpregunta5: number;
 listpregunta6: number;
 listpregunta7: number;
 listpregunta8: number;
// Promedio general de todas las encuestas
 sumas: number;
 prome: string;
 // numero de encuestas
 contadorreal: number;
 // Encuesta Reparacion
 // 1
 sumarep1: number;
 promere1: string;
 // 2
 sumarep2: number;
 promere2: string;
 // 3
 sumarep3: number;
 promere3: string;
 // 4
 sumarep4: number;
 promere4: string;
 // 5
 sumarep5: number;
 promere5: string;
 // 6
 sumarep6: number;
 promere6: string;
 // 7
 sumarep7: number;
 promere7: string;
 // 8
 sumarep8: number;
 promere8: string;
//
 contadorrep: number;
 user: RegistroInterface;
// comparadores
 insre: number;
 insre2: number;
// -------------
 public emailUsuario: string;
 nomUsuario: any;;
 fechareporte: string;
 typeCollection: AngularFirestoreCollection<EncuestaexInterface>;
 mod: any = {};
 meses:string[] = ["Mes","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
 cont() {
  for(var mc=1; mc<=12; mc++){
    if(this.mod.mesnumero == mc){
      this.mod.mes = this.meses[mc];
    }
  }
  this.fechareporte = this.mod.mes+this.mod.año;
  this.afs.collection('type').doc('Viga').collection(this.fechareporte).doc('contestadas').valueChanges().pipe(take(1)).subscribe(res => {this.cont2(res); });
  this.afs.collection('type').doc('Viga').collection(this.fechareporte).doc('registro').valueChanges().pipe(take(1)).subscribe(res => {this.cont3(res); });
}
cont2(x:ContadorInterface){
  this.contadorreal = <number><any>x.contador;
}
cont3(x:ContadorInterface){
  this.contadorrep = <number><any>x.contador;
}
arras() {
  if(this.contadorreal >= 1){
    if(this.contadorreal > 1){
      this.insre = this.rows1[0].total;
      this.insre2 = this.rows1[0].total;
      for (let i = 0 ; i < this.contadorreal ; i++ ) {
        this.ens = this.rows1[i].total as number;
        this.sumas = this.ens + this.sumas;
        if(this.insre <= this.rows1[i].total){
          this.insre = this.rows1[i].total;
        }
        if(this.insre2 >= this.rows1[i].total){
          this.insre2 = this.rows1[i].total;
        }
      }
    }
    else {
      this.sumas = this.rows1[0].total;
      this.insre = this.sumas;
      this.insre2 = this.insre;
    }
    this.prome= (this.sumas / this.contadorreal).toFixed(2);
  }
  else{
    this.insre = 0;
    this.insre2 = this.insre;
    this.prome = this.insre.toFixed(2);
  }
  this.arras2();
}
arras2() {
  if(this.contadorreal >= 1){
    if(this.contadorreal > 1){
      for (let i = 0 ; i < this.contadorreal ; i++ ) {
        var p1,p2,p3,p4,p5,p6,p7,p8;
        p1= this.rows1[i].pregunta1 as number;
        this.listpregunta1 = this.listpregunta1 + p1;
        p2= this.rows1[i].pregunta2 as number;
        this.listpregunta2 = this.listpregunta2 + p2;
        p3= this.rows1[i].pregunta3 as number;
        this.listpregunta3 = this.listpregunta3 + p3;
        p4= this.rows1[i].pregunta4 as number;
        this.listpregunta4 = this.listpregunta4 + p4;
        p5= this.rows1[i].pregunta5 as number;
        this.listpregunta5 = this.listpregunta5 + p5;
        p6= this.rows1[i].pregunta6 as number;
        this.listpregunta6 = this.listpregunta6 + p6;
        p7= this.rows1[i].pregunta7 as number;
        this.listpregunta7 = this.listpregunta7 + p7;
        p8= this.rows1[i].pregunta8 as number;
        this.listpregunta8 = this.listpregunta8 + p8;
      }
    }
    else {
      this.listpregunta1 = this.rows1[0].pregunta1;
      this.listpregunta2 = this.rows1[0].pregunta2;
      this.listpregunta3 = this.rows1[0].pregunta3;
      this.listpregunta4 = this.rows1[0].pregunta4;
      this.listpregunta5 = this.rows1[0].pregunta5;
      this.listpregunta6 = this.rows1[0].pregunta6;
      this.listpregunta7 = this.rows1[0].pregunta7;
      this.listpregunta8 = this.rows1[0].pregunta8;
    }
    this.promere1 = (this.listpregunta1 / this.contadorreal).toFixed(2);
    this.promere2 = (this.listpregunta2 / this.contadorreal).toFixed(2);
    this.promere3 = (this.listpregunta3 / this.contadorreal).toFixed(2);
    this.promere4 = (this.listpregunta4 / this.contadorreal).toFixed(2);
    this.promere5 = (this.listpregunta5 / this.contadorreal).toFixed(2);
    this.promere6 = (this.listpregunta6 / this.contadorreal).toFixed(2);
    this.promere7 = (this.listpregunta7 / this.contadorreal).toFixed(2);
    this.promere8 = (this.listpregunta8 / this.contadorreal).toFixed(2);
  }
  else{
    this.promere1 = "0";
    this.promere2 = "0";
    this.promere3 = "0";
    this.promere4 = "0";
    this.promere5 = "0";
    this.promere6 = "0";
    this.promere7 = "0";
    this.promere8 = "0";
  }
}
  ngOnInit() {
  //  this.modaldemo.open(this.Modal, {animation: true, backdropClass:'light'})
    this.cont();
    this.getData1();
    this.authservice.getAuth().subscribe( user => {
     if (user) {
       this.isLogin = true;
       this.lvlaccess.getUserData(user.email).subscribe( (info: RegistroInterface) => {
        if(info.suadmin === true){
          this.isLoginSuadmin = true;
        }
        else{
          this.isLoginSuadmin = false;
        }
      });
       this.emailUsuario = user.email;
      this.nombreusuaro(this.emailUsuario);
     } else {
       this.isLogin = false;
     }
   });
 }
 nombreusuaro(x: string) {
   this.afs.collection('Registro').doc(x).valueChanges().pipe(take(1)).subscribe(res => {this.arrayss(res); } );
 }
 arrayss(x: RegistroInterface): string {
   this.nomUsuario = x.nombre;
 return this.nomUsuario;
}
getData1(): any  {
return  this.encuestaex.getAllEncuestaexvig(this.fechareporte).subscribe(x => {
 this.rows1 = x;
 this.arras();
 return ;
  });
 }
 export() {
  this.router.navigate(['/dashboardt']);
}
}
