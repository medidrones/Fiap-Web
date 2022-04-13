import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { ReceitaModule } from '../receita.module';

import { DetalhesComponent } from './detalhes.component';

describe('DetalhesComponent', () => {
  let component: DetalhesComponent;
  let fixture: ComponentFixture<DetalhesComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReceitaModule, AppModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesComponent);
    component = fixture.componentInstance;

    component.imagens = "";
    component.receita = {
                          'id': 'string',
                          'nome': 'string',
                          'descricao': 'string',
                          'ingrediente': 'string',
                          'modoPreparo': 'string',
                          'tag': 'string',
                          'imagem': 'string',
                          'imagemUpload': 'string',
                          'valor': 1,
                          'dataCadastro': '01/01/2000',
                          'ativo': true,
                          'restauranteId': 'string',
                          'nomeRestaurante': 'string'
                        }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
