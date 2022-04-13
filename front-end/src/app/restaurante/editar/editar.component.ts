import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { StringUtils } from 'src/app/utils/string-utils';
import { Restaurante } from '../models/restaurante';
import { Endereco, CepConsulta } from '../models/endereco';
import { RestauranteService } from '../services/restaurante.service';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  errorsEndereco: any[] = [];
  restauranteForm: FormGroup;
  enderecoForm: FormGroup;

  restaurante: Restaurante = new Restaurante();
  endereco: Endereco = new Endereco();

  textoDocumento: string = '';
  tipoRestaurante: number;

  constructor(private fb: FormBuilder,
              private restauranteService: RestauranteService,
              private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              config: NgbModalConfig,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService) {

    super();

    config.backdrop = 'static';
    config.keyboard = false;

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
        cep: 'CEP em formato inválido',
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);

    this.restaurante = this.route.snapshot.data['restaurante'];
    this.tipoRestaurante = this.restaurante.tipoRestaurante;
  }

  ngOnInit() {

    this.spinner.show();

    this.restauranteForm = this.fb.group({
      id: '',
      nome: ['', [Validators.required]],
      documento: '',
      ativo: ['', [Validators.required]],
      tipoRestaurante: ['', [Validators.required]]
    });

    this.enderecoForm = this.fb.group({
      id: '',
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      restauranteId: ''
    });

    this.preencherForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  preencherForm() {

    this.restauranteForm.patchValue({
      id: this.restaurante.id,
      nome: this.restaurante.nome,
      ativo: this.restaurante.ativo,
      tipoRestaurante: this.restaurante.tipoRestaurante.toString(),
      documento: this.restaurante.documento
    });

    if (this.tipoRestauranteForm().value === "1") {
      this.documento().setValidators([Validators.required]);
    }
    else {
      this.documento().setValidators([Validators.required]);
    }

    this.enderecoForm.patchValue({
      id: this.restaurante.endereco.id,
      logradouro: this.restaurante.endereco.logradouro,
      numero: this.restaurante.endereco.numero,
      complemento: this.restaurante.endereco.complemento,
      bairro: this.restaurante.endereco.bairro,
      cep: this.restaurante.endereco.cep,
      cidade: this.restaurante.endereco.cidade,
      estado: this.restaurante.endereco.estado
    });
  }

  ngAfterViewInit() {
    this.tipoRestauranteForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      super.configurarValidacaoFormularioBase(this.formInputElements, this.restauranteForm)
      super.validarFormulario(this.restauranteForm)
    });

    super.configurarValidacaoFormularioBase(this.formInputElements, this.restauranteForm);
  }

  trocarValidacaoDocumento() {

    if (this.tipoRestauranteForm().value === "1") {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required]);
    }

    else {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required]);
    }
  }

  documento(): AbstractControl {
    return this.restauranteForm.get('documento');
  }

  tipoRestauranteForm(): AbstractControl {
    return this.restauranteForm.get('tipoRestaurante');
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.restauranteService.consultarCep(cep)
      .subscribe({
        next: cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        error: erro => this.errors.push(erro)
      });
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {

    this.enderecoForm.patchValue({
      logradouro: cepConsulta.logradouro,
      bairro: cepConsulta.bairro,
      cep: cepConsulta.cep,
      cidade: cepConsulta.localidade,
      estado: cepConsulta.uf
    });
  }

  editarRestaurante() {
    if (this.restauranteForm.dirty && this.restauranteForm.valid) {

      this.restaurante = Object.assign({}, this.restaurante, this.restauranteForm.value);
      this.restaurante.documento = StringUtils.somenteNumeros(this.restaurante.documento);

      this.restaurante.tipoRestaurante = parseInt(this.restaurante.tipoRestaurante.toString());

      this.restauranteService.atualizarRestaurante(this.restaurante)
        .subscribe({
          next: sucesso => { this.processarSucesso(sucesso) },
          error: falha => { this.processarFalha(falha) }
        });
    }
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Restaurante atualizado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/restaurantes/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  editarEndereco() {
    if (this.enderecoForm.dirty && this.enderecoForm.valid) {

      this.endereco = Object.assign({}, this.endereco, this.enderecoForm.value);

      this.endereco.cep = StringUtils.somenteNumeros(this.endereco.cep);
      this.endereco.restauranteId = this.restaurante.id;

      this.restauranteService.atualizarEndereco(this.endereco)
        .subscribe({
          next: () => this.processarSucessoEndereco(this.endereco),
          error: falha => { this.processarFalhaEndereco(falha) }
        });
    }
  }

  processarSucessoEndereco(endereco: Endereco) {
    this.errors = [];

    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!');
    this.restaurante.endereco = endereco
    this.modalService.dismissAll();
  }

  processarFalhaEndereco(fail: any) {
    this.errorsEndereco = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  abrirModal(content) {
    this.modalService.open(content);
  }
}
