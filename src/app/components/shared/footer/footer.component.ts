import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  autor = 'Diego Olvera - Jonathan A. Huerta';
  empresa = 'Casanovarent - Departamento de Redes y Soporte - ';

  constructor() { }

  ngOnInit() {
  }

}
