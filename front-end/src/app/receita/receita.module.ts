import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from "ngx-spinner";
import { ImageCropperModule } from 'ngx-image-cropper';

import { ReceitaRoutingModule } from './receita.route';
import { ReceitaAppComponent } from './receita.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ReceitaService } from './services/receita.service';
import { ReceitaResolve } from './services/receita.resolve';
import { ReceitaGuard } from './services/receita.guard';

@NgModule({
  declarations: [
    ReceitaAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    ReceitaRoutingModule,
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  providers: [
    ReceitaService,
    ReceitaResolve,
    ReceitaGuard
  ]
})
export class ReceitaModule { }
