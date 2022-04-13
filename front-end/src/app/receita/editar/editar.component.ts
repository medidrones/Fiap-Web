import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ReceitaService } from '../services/receita.service';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { ReceitaBaseComponent } from '../receita-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ReceitaBaseComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;

  constructor(private fb: FormBuilder,
    private receitaService: ReceitaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

    super();
    this.receita = this.route.snapshot.data['receita'];
  }

  ngOnInit(): void {

    this.receitaService.obterRestaurantes()
      .subscribe(
        restaurantes => this.restaurantes = restaurantes);

    this.receitaForm = this.fb.group({
      restauranteId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      ingrediente: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      modoPreparo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      tag: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      imagem: [''],
      valor: ['', [Validators.required]],
      ativo: [0]
    });

    this.receitaForm.patchValue({
      restauranteId: this.receita.restauranteId,
      id: this.receita.id,
      nome: this.receita.nome,
      descricao: this.receita.descricao,
      ingrediente: this.receita.ingrediente,
      modoPreparo: this.receita.modoPreparo,
      tag: this.receita.tag,
      ativo: this.receita.ativo,
      valor: CurrencyUtils.DecimalParaString(this.receita.valor)
    });

    this.imagemOriginalSrc = this.imagens + this.receita.imagem;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarReceita() {
    if (this.receitaForm.dirty && this.receitaForm.valid) {
      this.receita = Object.assign({}, this.receita, this.receitaForm.value);

      if (this.imageBase64) {
        this.receita.imagemUpload = this.imageBase64;
        this.receita.imagem = this.imagemNome;
      }

      this.receita.valor = CurrencyUtils.StringParaDecimal(this.receita.valor);

      this.receitaService.atualizarReceita(this.receita)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.receitaForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Receita editado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/receitas/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  upload(file: any) {
    this.imagemNome = file[0].name;

    var reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsBinaryString(file[0]);
  }

  manipularReader(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
    this.imagemPreview = "data:image/jpeg;base64," + this.imageBase64;
  }
}
