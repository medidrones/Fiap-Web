import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestauranteAppComponent } from './restaurante.app.component';
import { NovoComponent } from './novo/novo.component';
import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { RestauranteResolve } from './services/restaurante.resolve';
import { RestauranteGuard } from './services/restaurante.guard';

const restauranteRouterConfig: Routes = [
    {
        path: '', component: RestauranteAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [RestauranteGuard],
                canActivate: [RestauranteGuard],
                data: [{ claim: { nome: 'Restaurante', valor: 'Adicionar'}}]
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [RestauranteGuard],
                data: [{ claim: { nome: 'Restaurante', valor: 'Atualizar' } }],
                resolve: {
                    restaurante: RestauranteResolve
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    restaurante: RestauranteResolve
                }
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [RestauranteGuard],
                data: [{ claim: { nome: 'Restaurante', valor: 'Excluir' } }],
                resolve: {
                    restaurante: RestauranteResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(restauranteRouterConfig)
    ],
    exports: [RouterModule]
})
export class RestauranteRoutingModule { }
