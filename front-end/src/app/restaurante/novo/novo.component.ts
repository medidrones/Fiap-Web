import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Restaurante } from '../models/restaurante';
import { RestauranteService } from '../services/restaurante.service';
import { CepConsulta } from '../models/endereco';
import { StringUtils } from 'src/app/utils/string-utils';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  restauranteForm: FormGroup;
  restaurante: Restaurante = new Restaurante();

  textoDocumento: string = 'CPF (requerido)';
  formResult: string = '';

  constructor(private fb: FormBuilder,
    private restauranteService: RestauranteService,
    private router: Router,
    private toastr: ToastrService) {

    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido'
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido'
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit() {

    this.restauranteForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      ativo: ['', [Validators.required]],
      tipoRestaurante: ['', [Validators.required]],

      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })
    });

    this.restauranteForm.patchValue({ tipoRestaurante: '1', ativo: true });
  }

  ngAfterViewInit(): void {

    this.tipoRestauranteForm().valueChanges
      .subscribe(() => {
        this.trocarValidacaoDocumento();
        super.configurarValidacaoFormularioBase(this.formInputElements, this.restauranteForm)
        super.validarFormulario(this.restauranteForm);
      });

      super.configurarValidacaoFormularioBase(this.formInputElements, this.restauranteForm)
  }

  trocarValidacaoDocumento() {
    if (this.tipoRestauranteForm().value === "1") {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required]);
      this.textoDocumento = "CPF (requerido)";
    }
    else {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required]);
      this.textoDocumento = "CNPJ (requerido)";
    }
  }

  tipoRestauranteForm(): AbstractControl {
    return this.restauranteForm.get('tipoRestaurante');
  }

  documento(): AbstractControl {
    return this.restauranteForm.get('documento');
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.restauranteService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {

    this.restauranteForm.patchValue({
      endereco: {
        logradouro: cepConsulta.logradouro,
        bairro: cepConsulta.bairro,
        cep: cepConsulta.cep,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf
      }
    });
  }

  adicionarRestaurante() {
    if (this.restauranteForm.dirty && this.restauranteForm.valid) {

      this.restaurante = Object.assign({}, this.restaurante, this.restauranteForm.value);
      this.formResult = JSON.stringify(this.restaurante);

      this.restaurante.endereco.cep = StringUtils.somenteNumeros(this.restaurante.endereco.cep);
      this.restaurante.documento = StringUtils.somenteNumeros(this.restaurante.documento);
      this.restaurante.tipoRestaurante = parseInt(this.restaurante.tipoRestaurante.toString());

      this.restauranteService.novoRestaurante(this.restaurante)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    this.restauranteForm.reset();
    this.errors = [];

    this.mudancasNaoSalvas = false;

    let toast = this.toastr.success('Restaurante cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/restaurantees/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
