import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, throwError } from 'rxjs';

import { Processo } from '../models/processo.model';

interface ProcessoRequestBody {
  size: number;
  sort: { '@timestamp': { order: string } }[];
  search_after?: number[];
}

@Injectable({
  providedIn: 'root',
})
export class ProcessosService {
  constructor(private httpClient: HttpClient) {}

  getProcessos() {
    return this.httpClient
      .post<Processo[]>(
        '/api/api_publica_tjrn/_search',
        { size: 200 },
        {
          headers: {
            Authorization:
              'APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==',
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(map((res) => this.mapFromResponse(res)));
  }

  private mapFromResponse(data: any): Processo[] {
    return data['hits']['hits'].map((element: any) => {
      return {
        numero: element['_source']['numeroProcesso'],
        unidade: element['_source']['orgaoJulgador']['codigo'],
        assuntos: element['_source']['assuntos'].map(
          (assunto: any) => assunto['nome']
        ),
        classe: element['_source']['classe']['nome'],
        grau: element['_source']['grau'],
        justica: 'ESTADUAL',
      };
    });
  }
}
