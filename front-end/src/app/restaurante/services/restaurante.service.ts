import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Restaurante } from '../models/restaurante';
import { CepConsulta, Endereco } from '../models/endereco';

@Injectable()
export class RestauranteService extends BaseService {

    restaurante: Restaurante = new Restaurante();

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Restaurante[]> {
        return this.http
            .get<Restaurante[]>(this.UrlServiceV1 + "restaurantes")
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Restaurante> {
        return this.http
            .get<Restaurante>(this.UrlServiceV1 + "restaurantes/" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoRestaurante(restaurante: Restaurante): Observable<Restaurante> {
        return this.http
            .post(this.UrlServiceV1 + "restaurantes", restaurante, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarRestaurante(restaurante: Restaurante): Observable<Restaurante> {
        return this.http
            .put(this.UrlServiceV1 + "restaurantes/" + restaurante.id, restaurante, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirRestaurante(id: string): Observable<Restaurante> {
        return this.http
            .delete(this.UrlServiceV1 + "restaurantes/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarEndereco(endereco: Endereco): Observable<Endereco> {
        return this.http
            .put(this.UrlServiceV1 + "restaurantes/endereco/" + endereco.id, endereco, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    consultarCep(cep: string): Observable<CepConsulta> {
        return this.http
            .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(catchError(super.serviceError))
    }
}
