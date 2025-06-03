import { NgIf } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { Parte } from '../../../core/models/partes.model';
import { RequiredComponent } from "../../../shared/required/required.component";

@Component({
  selector: 'app-partes-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputMaskModule,
    RequiredComponent
],
  templateUrl: './form-partes.component.html',
  styleUrl: './form-partes.component.css',
})
export class FormPartesComponent implements OnInit {
  parteForm: FormGroup;
  private errorsList: string[] = [];
  tiposPessoa = [
    { label: 'Pessoa Física', value: 'FISICA' },
    { label: 'Pessoa Jurídica', value: 'JURIDICA' },
  ];
  placeholderDocumento = '000.000.000-00';
  @Output() formSubmit = new EventEmitter<Parte>();
  @Input() parte?: Parte;

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef
  ) {
    this.parteForm = this.fb.group({
      nome: [this.parte?.nome || '', [Validators.required, Validators.minLength(3)]],
      tipoPessoa: [this.parte?.tipoPessoa || 'FISICA', Validators.required],
      documento: [this.parte?.cpfCnpj || '', [Validators.required, this.validarCpfCnpj]],
      email: [this.parte?.email || '', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.parteForm
      .get('tipoPessoa')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.placeholderDocumento = value === 'FISICA' ? '000.000.000-00' : '000.000.000/0000-00';
        this.parteForm.get('documento')?.reset();
      });
  }


  onSubmit() {
    if (this.parteForm.valid) {
      this.formSubmit.emit({
        nome: this.parteForm.value.nome,
        tipoPessoa: this.parteForm.value.tipoPessoa,
        cpfCnpj: this.parteForm.value.documento,
        email: this.parteForm.value.email,
      });
      this.parteForm.reset({tipoPessoa: 'FISICA'});
    } else {
      this.parteForm.markAllAsTouched();
    }
  }

validarCpfCnpj(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';

  if (!value) return null;

  const onlyDigits = /^\d+$/;
  if (!onlyDigits.test(value)) {
    return { cpfCnpjInvalido: true };
  }

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

  get errors() {
    const form = this.parteForm;
    const controls = form.controls;
    this.errorsList = [];

    if(form.invalid) {
      if(controls['nome'].invalid && (controls['nome'].touched || controls['nome'].dirty)) {
        this.errorsList.push('O campo Nome é obrigatório e deve ter pelo menos 3 caracteres.');
      }
      if(controls['tipoPessoa'].invalid && (controls['tipoPessoa'].touched || controls['tipoPessoa'].dirty)) {
        this.errorsList.push('O campo Tipo de Pessoa é obrigatório.');
      }
      if(controls['documento'].invalid && (controls['documento'].touched || controls['documento'].dirty)) {
        this.errorsList.push('O campo CPF ou CNPJ é obrigatório.');
      }
      if(controls['email'].invalid && (controls['email'].touched || controls['email'].dirty)) {
        this.errorsList.push('O campo E-mail é obrigatório e deve ser um e-mail válido.');
      }
    }

    return this.errorsList;
  }
}
