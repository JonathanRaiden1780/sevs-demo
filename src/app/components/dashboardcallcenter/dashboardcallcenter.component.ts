import { Component, OnInit, ViewChild } from '@angular/core';
import { faHeadset, faCar } from '@fortawesome/free-solid-svg-icons';

import { MatTableDataSource, MatSort, MatPaginator, MatRadioButton } from '@angular/material';

import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

import { AngularFirestore } from 'angularfire2/firestore';
import { DatatableService } from 'src/app/services/datatable.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { RegistroCompletoInterface } from 'src/app/Models/Registrocompleto';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-dashboardcallcenter',
  templateUrl: './dashboardcallcenter.component.html',
  styleUrls: ['./dashboardcallcenter.component.css']
})

export class DashboardcallcenterComponent implements OnInit {

  @ViewChild(MatSort, { read: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource2: any;

  // Origen DATA tabla
  dataSource = new MatTableDataSource();
  // tslint:disable-next-line:max-line-length
  displayedColumns = ['Folio Encuesta', 'Fecha Entrada', 'Fecha Salida', 'Servicio', 'Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4', 'Pregunta 5', 'Pregunta 6', 'Pregunta 7', 'Pregunta 8', 'Pregunta 9', 'Pregunta 10', 'Total'];
  // tslint:disable-next-line:max-line-length
  displayedColumns2 = ['Folio Encuesta', 'Nombre Cliente', 'Numero Cliente', 'Correo Cliente', 'Llamada', 'Fecha de seguimiento', 'Comentario Taller', 'Comentario CallCenter'];
  displayedColumns3 = [ 'Comentario Llamada', 'Enviar comentarios'];
  comentarioscall: string;
  id: string;
  config: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'mytable5'
  };

//variables
rows1: any[] = [];
listado:any;
list = [];
list2 = [];
fechaent:string;
fechasal:string;
 // Iconos
  faHeadset = faHeadset;
  faCar = faCar;
  mod: any = {};
  constructor(
    private afs: AngularFirestore,
    private exportAsService: ExportAsService,
    private _dataService: DatatableService,
    public encuestase: EncuestaService,
    private controlService: EncuestaService
  ) {
  // this.listado = this.controlService.getAllEncuestaex();
    
  //  this.listado controlService.getAllEncuestaexC();
    this.dataSource.sort = this.sort;
    const today = new Date();
    this.mod.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  }
  

  ngOnInit() {
    return this._dataService.getDocs().subscribe(res => this.dataSource.data = res );
    this.getData1();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const ELEMENT_DATA: RegistroCompletoInterface[] = this.list;
    this.dataSource2 = ELEMENT_DATA;

  }

  getData1() {
    this.afs.collection('typeALL').valueChanges().subscribe((encuesta) => {
      this.rows1 = encuesta;
    });
    this.listado = this.rows1;
    this.list = this.rows1;
    this.list2 = this.rows1;
  }

  exportAs(type) {
    this.config.type = type;
    this.exportAsService.save(this.config, 'FileCallCenter' );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  coments({value}: {value: RegistroCompletoInterface}) {
    value.comentarioscall = this.comentarioscall;
    value.id = this.id;
    value.validacion = 'Ok';
    value.fechac = formatDate(new Date(), 'dd/MM/yyyy hh:mm:ss a', 'en');
      ////console.log (value, this.id);
    this.encuestase.updateTypeALL(value);
  }
  getval(id) {
    this.id = id.id;
  }
  myFunction2(filterValue: string) {
    this.comentarioscall = filterValue;
  }
  myFunction() {
    // Declare variables
    this._dataService.getDocs().subscribe(res => this.dataSource.data = res );

    let input, filter, table, tr, td, i, txtValue, input2, filter2;
    input = document.getElementById('inputfe');
    filter = input.value;
    input2 = document.getElementById('inputfs');
    filter2 = input2.value;
    table = document.getElementById('mytable5');
    tr = table.getElementsByTagName('tr');
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[3];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue >= filter && txtValue <= filter2 ) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
   this.dataSource2 = this.dataSource.data;
    const fromDate = filter;
    const toDate = filter2;
    const tempData = <any>this.dataSource2;
    let selectedItems: RegistroCompletoInterface[] = [];
    if(fromDate !== '' && toDate !== '') {
              tempData.forEach((item, index) => {
            if (item.fechaent >= fromDate && item.fechaent <= toDate) {
                selectedItems.push(item);
            }
        });

        this.dataSource2 = selectedItems;
        this.dataSource = this.dataSource2;
    }
   // $('#inputfe').val('').text('update');
   // $('#inputfs').val('').text('update');
  }
}