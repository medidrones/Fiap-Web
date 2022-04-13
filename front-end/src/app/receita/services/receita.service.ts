import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Receita, Restaurante } from '../models/receita';

@Injectable()
export class ReceitaService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Receita[]> {
        return this.http
            .get<Receita[]>(this.UrlServiceV1 + "receitas", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Receita> {
        return this.http
            .get<Receita>(this.UrlServiceV1 + "receitas/" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoReceita(receita: Receita): Observable<Receita> {
        return this.http
            .post(this.UrlServiceV1 + "receitas", receita, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarReceita(receita: Receita): Observable<Receita> {
        return this.http
            .put(this.UrlServiceV1 + "receitas/" + receita.id, receita, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirReceita(id: string): Observable<Receita> {
        return this.http
            .delete(this.UrlServiceV1 + "receitas/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

  obterRestaurantes(): Observable<Restaurante[]> {
        return this.http
            .get<Restaurante[]>(this.UrlServiceV1 + "restaurantes")
            .pipe(catchError(super.serviceError));
    }
}
