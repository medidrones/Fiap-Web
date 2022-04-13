import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Restaurante } from '../models/restaurante';
import { RestauranteService } from './restaurante.service';

@Injectable()
export class RestauranteResolve implements Resolve<Restaurante> {

    constructor(private restauranteService: RestauranteService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.restauranteService.obterPorId(route.params['id']);
    }
}
