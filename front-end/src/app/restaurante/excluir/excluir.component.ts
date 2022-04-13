import { Component } from '@angular/core';
import { Restaurante } from '../models/restaurante';

import { ActivatedRoute, Router } from '@angular/router';
import { RestauranteService } from '../services/restaurante.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  restaurante: Restaurante = new Restaurante();
  enderecoMap;
  errors: any[] = [];

  constructor(
    private restauranteService: RestauranteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer) {

    this.restaurante = this.route.snapshot.data['restaurante'];
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
  }

  public EnderecoCompleto(): string {
    return this.restaurante.endereco.logradouro + ", " + this.restaurante.endereco.numero + " - " + this.restaurante.endereco.bairro + ", " + this.restaurante.endereco.cidade + " - " + this.restaurante.endereco.estado;
  }

  excluirEvento() {
    this.restauranteService.excluirRestaurante(this.restaurante.id)
      .subscribe(
        restaurante => { this.sucessoExclusao(restaurante) },
        error => { this.falha(error) }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Restaurante excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/restaurantes/listar-todos']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
