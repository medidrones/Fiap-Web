import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitaService } from '../services/receita.service';

import { ToastrService } from 'ngx-toastr';

import { Receita } from '../models/receita';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  imagens: string = environment.imagensUrl;
  receita: Receita;

  constructor(private receitaService: ReceitaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.receita = this.route.snapshot.data['receita'];
  }

  public excluirReceita() {
    this.receitaService.excluirReceita(this.receita.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Receita excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/receitas/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
