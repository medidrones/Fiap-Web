import { Component } from '@angular/core';
import { Restaurante } from '../models/restaurante';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  restaurante: Restaurante = new Restaurante();
  enderecoMap;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {

      this.restaurante = this.route.snapshot.data['restaurante'];
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
  }

  public EnderecoCompleto(): string {
    return this.restaurante.endereco.logradouro + ", " + this.restaurante.endereco.numero + " - " + this.restaurante.endereco.bairro + ", " + this.restaurante.endereco.cidade + " - " + this.restaurante.endereco.estado;
  }
}
