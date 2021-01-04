import { Component, OnInit, ViewChild } from '@angular/core';

import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

import { faCarCrash, faSearch, faStickyNote, faPrint, faCar } from '@fortawesome/free-solid-svg-icons';


import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { DatatableService } from 'src/app/services/datatable.service';
import { LevelaccessService } from 'src/app/services/levelaccess.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboardtaller',
  templateUrl: './dashboardtaller.component.html',
  styleUrls: ['./dashboardtaller.component.css'],
})
export class DashboardtallerComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Iconos

  faCarCrash = faCarCrash;
  faSearch = faSearch;
  faStickyNote = faStickyNote;
  faPrint = faPrint;
  faCar = faCar;

  fechaent: string;
  fechasal: string;
  listado: any;

  list: [];
  listv: string[];

  list2 = [];

  // Variables
  rows1: any[] = [];

  dataSource = new MatTableDataSource();
  displayedColumns = ['Folio Encuesta', 'Fecha Entrada', 'Fecha Salida', 'Placa', 'Servicio', 'Asesor', 'Cliente', 'Calificacion'];
ubi:string;
  expanded: any = {};
  timeout: any;

  config: ExportAsConfig = {
    type: 'csv',
    elementIdOrContent: 'mytable5',
  };

  cols = [{name: 'Id'}, {name: 'Tipo'}, {name: 'fechaent'}];
  typeCollections: AngularFirestoreCollection<EncuestaexInterface>;
  Encuestaexes: Observable<EncuestaexInterface[]>;
  meses:string[] = ["Mes","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  mod: any = {};
  fechareporte: string;
  constructor(
    private afs: AngularFirestore,
    private exportAsService: ExportAsService,
    private controlService: EncuestaService,
    private _dataService: DatatableService,
    public authService: AuthService,
    private lvlaccess: LevelaccessService
  ) {
    const today = new Date();
    this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.mod.mesnumero =  today.getMonth()+1;
    this.mod.año =  today.getFullYear();
    for(var mc=1; mc<=12; mc++){
      if(this.mod.mesnumero == mc){
        if(this.mod.mesnumero == 1){
          this.mod.mes = this.meses[12];
        }
        else{
          this.mod.mes = this.meses[mc-1];
        }
      }
    }
    if(this.mod.mes == 'Diciembre'){
        this.fechareporte = this.mod.mes + (this.mod.año - 1);
    }
    else{
        this.fechareporte = this.mod.mes + this.mod.año;
    }
   }


   contadorreal: number;
   button:boolean;
 ngOnInit() {
  this.button = false;
  this.authService.getAuth().subscribe( user => {
    if (user) {
      this.lvlaccess.getUserData(user.email).subscribe( (info: RegistroInterface) => {
////console.log('usuario desde lvl:', info);
            if(info.ubicacion == 'Centenario'){
              this.ubi = 'Centenario';
              this.listado = this.controlService.getAllEncuestaexCen(this.fechareporte);
            }
            else if (info.ubicacion === 'Viga') {
              this.ubi = 'Viga';
              this.listado = this.controlService.getAllEncuestaexvig(this.fechareporte);
          }
           else if (info.ubicacion === 'ALL') {
              this.button = true;

          } else {
           // //console.log('Error de sistema: Usuario sin Permisos')
          }
      });
    }
  });
  }
  changesitio(sitio : string){
    if(sitio == 'viga'){
        this.ubi = 'Viga';
        this.listado = this.controlService.getAllEncuestaexvig(this.fechareporte);
    }
    if(sitio == 'cente'){
       this.ubi = 'Centenario';
       this.listado = this.controlService.getAllEncuestaexCen(this.fechareporte);
    }
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      ////console.log('paged!', event);
    }, 100);
  }

  onDetailToggle(event) {
    ////console.log('Detail Toggled', event);
  }

  exportAs(type) {
    this.config.type = type;
    this.exportAsService.save(this.config, 'myFile').subscribe(()=>{});
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
