import { Component, OnInit, ViewChild } from '@angular/core';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { faCarCrash, faSearch, faStickyNote, faPrint, faCar } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { LevelaccessService } from 'src/app/services/levelaccess.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { Observable } from 'rxjs';

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
  public data: any;
  list: [];
  listv: string[];
  count9_na: number;
  count9_si: number;
  count9_no: number;
  count10_na: number;
  count10_si: number;
  count10_no: number;

  list2 = [];

  // Variables
  rows1: any[] = [];

  dataSource = new MatTableDataSource();
  displayedColumns = ['Folio Encuesta', 'Fecha Entrada', 'Fecha Salida', 'Placa', 'Servicio', 'Asesor', 'Cliente', 'Calificacion'];
  ubi: string;
  expanded: any = {};
  timeout: any;

  config: ExportAsConfig = {
    type: 'csv',
    elementIdOrContent: 'mytable5',
  };

  cols = [{ name: 'Id' }, { name: 'Tipo' }, { name: 'fechaent' }];
  typeCollections: AngularFirestoreCollection<EncuestaexInterface>;
  Encuestaexes: Observable<EncuestaexInterface[]>;
  meses: string[] = ["Mes", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  mod: any = {};
  fechareporte: string;
  constructor(
    private exportAsService: ExportAsService,
    public authService: AuthService,
    public controlService: EncuestaService,
    private afs: AngularFirestore,
    private lvlaccess: LevelaccessService
  ) {
    const today = new Date();
    this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.mod.mesnumero = today.getMonth() + 1;
    this.mod.año = today.getFullYear();
    for (var mc = 1; mc <= 12; mc++) {
      if (this.mod.mesnumero == mc) {
        if (this.mod.mesnumero == 1) {
          this.mod.mes = this.meses[12];
        }
        else {
          this.mod.mes = this.meses[mc - 1];
        }
      }
    }
    if (this.mod.mes == 'Diciembre') {
      this.fechareporte = this.mod.mes + (this.mod.año - 1);
    }
    else {
      this.fechareporte = this.mod.mes + this.mod.año;
    }
  }
  num_encuestas: number;
  contadorreal: number;
  button: boolean;
  ngOnInit() {
    this.afs.collection('Ubicacion').valueChanges().subscribe(x => { this.data = x })
    this.button = false;
    this.authService.getAuth().subscribe(user => {
      if (user) {
        this.lvlaccess.getUserData(user.email).subscribe((info: RegistroInterface) => {
          if (info.ubicacion == 'ALL') {
            this.button = true;
          }
          else {
            for (var u = 0; u <= this.data.length; u++) {
              if (info.ubicacion == this.data[u].ubicacion) {
                this.ubi = this.data[u].ubicacion;
              }
            }
            this.listado = this.controlService.getAllEncuestas(this.ubi);
          }
        });
      }
    });
  }
  changesitio(sitio: string) {
    this.listado = this.controlService.getAllEncuestas(sitio);
    this.ubi = sitio
    setTimeout(() => {
      this.getsum();
    }, 1500)
  }
  getsum() {
    this.count9_na = 0
    this.count9_si = 0
    this.count9_no = 0
    this.count10_na = 0
    this.count10_si = 0
    this.count10_no = 0

    document.querySelectorAll('.Total').forEach(total => {
      var letra = total.classList[1];
      var suma = 0;
      document.querySelectorAll('.preguntas' + letra).forEach(celda => {
        var valor = parseFloat(celda.innerHTML);
        this.num_encuestas = document.querySelectorAll('.preguntas' + letra).length
        suma += valor;
      });
      var prom = suma / this.num_encuestas
      total.innerHTML = prom.toString();
    })
    var v = [0, 0, 0, 0, 0, 0]
    var pond = [20, 40, 50, 60, 80, 100]
    for (var i = 0; i < 6; i++) {
      document.querySelectorAll('.Ponderacion' + pond[i]).forEach(total => {
        var letra = total.classList[1];
        v[i] = 0;
        document.querySelectorAll('.preguntas' + letra).forEach(celda => {
          var valor = celda.innerHTML.toString();
          if (valor == pond[i].toString()) {
            v[i] = v[i] + 1;
          }
          total.innerHTML = v[i].toString();
        })
      })
    }
    document.querySelectorAll('.nueve').forEach(celda => {
      var valor = celda.innerHTML.toString();
      if (valor == 'N/A') {
        this.count9_na = this.count9_na + 1;
      }
      if (valor == 'Si') {
        this.count9_si = this.count9_si + 1;
      }
      if (valor == 'No') {
        this.count9_no = this.count9_no + 1;
      }
    });
    document.querySelectorAll('.diez').forEach(celda => {
      var valor = celda.innerHTML.toString();
      if (valor == 'N/A') {
        this.count10_na = this.count10_na + 1;
      }
      if (valor == 'Si') {
        this.count10_si = this.count10_si + 1;
      }
      if (valor == 'No') {
        this.count10_no = this.count10_no + 1;
      }
    });
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }
  Global(){

  }
  exportAs(type) {
    this.config.type = type;
    this.exportAsService.save(this.config, 'Reporte'+this.fechareporte).subscribe(() => { });
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
