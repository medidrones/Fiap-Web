import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';

import { ReceitaService } from '../services/receita.service';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { ReceitaBaseComponent } from '../receita-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ReceitaBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  imagemNome: string;

  constructor(private fb: FormBuilder,
    private receitaService: ReceitaService,
    private router: Router,
    private toastr: ToastrService) { super(); }

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
      imagem: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      ativo: [true]
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarReceita() {
    if (this.receitaForm.dirty && this.receitaForm.valid) {
      this.receita = Object.assign({}, this.receita, this.receitaForm.value);

      this.receita.imagemUpload = this.croppedImage.split(',')[1];
      this.receita.imagem = this.imagemNome;
      this.receita.valor = CurrencyUtils.StringParaDecimal(this.receita.valor);

      this.receitaService.novoReceita(this.receita)
        .subscribe({
          next: (sucesso: any) => { this.processarSucesso(sucesso) },
          error: (falha: any) => { this.processarFalha(falha) }
        });

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.receitaForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Receita cadastrado com sucesso!', 'Sucesso!');
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
  }
}
