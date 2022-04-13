import { Component, Input } from '@angular/core';
import { Receita } from 'src/app/receita/models/receita';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'lista-receita',
  templateUrl: './lista-receitas.component.html'
})
export class ListaReceitasComponent {

  imagens: string = environment.imagensUrl;

  @Input()
  receitas: Receita[];
}
