import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ParteIncompleta } from '../models/partes-incompleta.model';
import { Parte } from '../models/partes.model';

/**
 * Serviço para gerenciar as partes no armazenamento local.
 * Contém uma lista de partes observável e métodos para obter e salvar partes.
 */
@Injectable({
  providedIn: 'root',
})
export class PartesService {
  private partsId = 0;
  private storageKey = 'partes';
  private partesSubject = new BehaviorSubject<Parte[]>(
    this.carregaPartesDoStorage()
  );
  partes$: Observable<Parte[]> = this.partesSubject.asObservable();

  getPartes(): Parte[] {
    return this.partesSubject.value;
  }

  findById(id: string): Parte | undefined {
    return this.partesSubject.value.find((parte) => parte.id === id);
  }

  salvarParte(parte: ParteIncompleta): void {
    const partes = [
      ...this.partesSubject.value,
      {
        ...parte,
        id: (this.partsId++).toString(),
      },
    ];
    localStorage.setItem(this.storageKey, JSON.stringify(partes));
    this.partesSubject.next(partes);
  }

  excluirParte(parte: Parte): void {
    const partes = this.partesSubject.value.filter((p) => p !== parte);
    localStorage.setItem(this.storageKey, JSON.stringify(partes));
    this.partesSubject.next(partes);
  }

  private carregaPartesDoStorage(): Parte[] {
    const partesJson = localStorage.getItem(this.storageKey);
    return partesJson ? JSON.parse(partesJson) : [];
  }

  editarParte(parteId: string, parteEditada: ParteIncompleta) {
    const partes = this.partesSubject.value.map((p) =>
      p.id === parteId ? { id: p.id, ...parteEditada } : p
    );
    localStorage.setItem(this.storageKey, JSON.stringify(partes));
    this.partesSubject.next(partes);
  }
}
