import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoComponent } from './novo/novo.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RestauranteRoutingModule } from './restaurante.route';
import { RestauranteAppComponent } from './restaurante.app.component';
import { ListaComponent } from './lista/lista.component';
import { RestauranteService } from './services/restaurante.service';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from "ngx-spinner";

import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { RestauranteResolve } from './services/restaurante.resolve';
import { RestauranteGuard } from './services/restaurante.guard';
import { ListaReceitasComponent } from './receitas/lista-receitas.component';

@NgModule({
  declarations: [
    RestauranteAppComponent,
    NovoComponent,
    ListaComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent,
    ListaReceitasComponent
  ],
  imports: [
    CommonModule,
    RestauranteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgxSpinnerModule
  ],
  providers: [
    RestauranteService,
    RestauranteResolve,
    RestauranteGuard
  ]
})
export class RestauranteModule { }
