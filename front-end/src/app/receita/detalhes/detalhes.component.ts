import { Component } from '@angular/core';
import { Receita } from '../models/receita';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;
  receita: Receita;

  constructor(private route: ActivatedRoute) {

    this.receita = this.route.snapshot.data['receita'];
  }
}
