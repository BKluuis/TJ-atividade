import { Injectable } from '@angular/core';
import { Parte } from '../models/partes.model';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Serviço para gerenciar as partes no armazenamento local.
 * Contém uma lista de partes observável e métodos para obter e salvar partes.
 */
@Injectable({
  providedIn: 'root'
})
export class PartesService {
    private storageKey = 'partes';
    private partesSubject = new BehaviorSubject<Parte[]>(this.loadPartesFromStorage());
    partes$: Observable<Parte[]> = this.partesSubject.asObservable();

  getPartes(): Parte[] {
    return this.partesSubject.value;
  }

  saveParte(parte: Parte): void {
    const partes = [...this.partesSubject.value, parte];
    localStorage.setItem(this.storageKey, JSON.stringify(partes));
    this.partesSubject.next(partes);
  }

  excluirParte(parte: Parte): void {
    const partes = this.partesSubject.value.filter(p => p !== parte);
    localStorage.setItem(this.storageKey, JSON.stringify(partes));
    this.partesSubject.next(partes);
  }

  private loadPartesFromStorage(): Parte[] {
    const partesJson = localStorage.getItem(this.storageKey);
    return partesJson ? JSON.parse(partesJson) : [];
  }
}
