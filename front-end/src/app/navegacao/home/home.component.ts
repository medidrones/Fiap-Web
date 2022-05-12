import { Component } from '@angular/core';
import { RestauranteService } from 'src/app/restaurante/services/restaurante.service';
import { Restaurante } from 'src/app/restaurante/models/restaurante';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent {

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
