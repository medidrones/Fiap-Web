import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Receita } from '../models/receita';
import { ReceitaService } from './receita.service';

@Injectable()
export class ReceitaResolve implements Resolve<Receita> {

    constructor(private receitaService: ReceitaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.receitaService.obterPorId(route.params['id']);
    }
}
