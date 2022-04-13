import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../services/restaurante.service';
import { Restaurante } from '../models/restaurante';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public restaurantes: Restaurante[];
  errorMessage: string;

  constructor(private restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.restauranteService.obterTodos()
      .subscribe(
        restaurantes => this.restaurantes = restaurantes,
        error => this.errorMessage);
  }
}
