import { Component, DestroyRef, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PartesService } from '../../../core/services/partes.service';
import { NgIf } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Parte } from '../../../core/models/partes.model';

@Component({
  selector: 'app-partes-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    NgIf,
    InputGroupModule,
    InputGroupAddonModule,
    InputMaskModule,
  ],
  templateUrl: './form-partes.component.html',
  styleUrl: './form-partes.component.css',
})
export class FormPartesComponent implements OnInit {
  parteForm: FormGroup;
  tiposPessoa = [
    { label: 'Pessoa Física', value: 'FISICA' },
    { label: 'Pessoa Jurídica', value: 'JURIDICA' },
  ];
  placeholderDocumento = 'Digite o CPF';
  @Output() formSubmit = new EventEmitter<Parte>();

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef
  ) {
    this.parteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      tipoPessoa: ['FISICA', Validators.required],
      documento: ['', [Validators.required, this.validarCpfCnpj]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.parteForm
      .get('tipoPessoa')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.placeholderDocumento = value === 'FISICA' ? 'Digite o CPF' : 'Digite o CNPJ';
        this.parteForm.get('documento')?.reset();
      });
  }


  onSubmit() {
    console.log('Formulário enviado:', this.parteForm.value);
    if (this.parteForm.valid) {
      this.formSubmit.emit({
        nome: this.parteForm.value.nome,
        tipoPessoa: this.parteForm.value.tipoPessoa,
        cpfCnpj: this.parteForm.value.documento,
        email: this.parteForm.value.email,
      });
    } else {
      this.parteForm.markAllAsTouched();
    }
  }

  validarCpfCnpj(control: AbstractControl): ValidationErrors | null {
    let value = control.value || '';
    if (!value) return null;

    value = value.replace(/\D/g, '');
    if (!value) return { cpfCnpjInvalido: true };

    const isCpf = value.length === 11;
    const isCnpj = value.length === 14;

    if (!isCpf && !isCnpj) {
      return { cpfCnpjInvalido: true };
    }

    return null;
  }

  get f() {
    return this.parteForm.controls;
  }
}
