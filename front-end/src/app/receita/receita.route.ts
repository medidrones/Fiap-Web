import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceitaAppComponent } from './receita.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ReceitaResolve } from './services/receita.resolve';
import { ReceitaGuard } from './services/receita.guard';

const receitaRouterConfig: Routes = [
    {
        path: '', component: ReceitaAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [ReceitaGuard],
                canActivate: [ReceitaGuard],
                data: [{ claim: { nome: 'Receita', valor: 'Adicionar' } }],
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [ReceitaGuard],
                data: [{ claim: { nome: 'Receita', valor: 'Atualizar' } }],
                resolve: {
                    receita: ReceitaResolve
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    receita: ReceitaResolve
                }
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [ReceitaGuard],
                data: [{ claim: { nome: 'Receita', valor: 'Excluir' } }],
                resolve: {
                    receita: ReceitaResolve
                }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(receitaRouterConfig)
    ],
    exports: [RouterModule]
})
export class ReceitaRoutingModule { }
