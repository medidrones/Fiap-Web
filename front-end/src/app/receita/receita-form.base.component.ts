import { Receita, Restaurante } from './models/receita';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class ReceitaBaseComponent extends FormBaseComponent {

    receita: Receita;
    restaurantes: Restaurante[];
    errors: any[] = [];
    receitaForm: FormGroup;

    constructor() {
        super();

        this.validationMessages = {
            restauranteId: {
                required: 'Escolha um restaurante',
            },
            nome: {
                required: 'Informe o Nome',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 200 caracteres'
            },
            descricao: {
                required: 'Informe a Descrição',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 1000 caracteres'
            },
            ingrediente: {
              required: 'Informe os Ingredientes',
              minlength: 'Mínimo de 2 caracteres',
              maxlength: 'Máximo de 1000 caracteres'
            },
            modoPreparo: {
              required: 'Informe o Modo de preparo',
              minlength: 'Mínimo de 2 caracteres',
              maxlength: 'Máximo de 1000 caracteres'
            },
            tag: {
              required: 'Informe as Tags',
              minlength: 'Mínimo de 2 caracteres',
              maxlength: 'Máximo de 100 caracteres'
            },
            imagem: {
                required: 'Informe a Imagem',
            },
            valor: {
                required: 'Informe o Valor',
            }
        }

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.receitaForm);
    }
}
