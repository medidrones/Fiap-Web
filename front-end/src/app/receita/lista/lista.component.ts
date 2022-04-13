import { Component, OnInit } from '@angular/core';
import { Receita } from '../models/receita';
import { ReceitaService } from '../services/receita.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  public receitas: Receita[];
  errorMessage: string;

  constructor(private receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.receitaService.obterTodos()
      .subscribe(
        receitas => this.receitas = receitas,
        error => this.errorMessage);
  }
}
