import { Component, Inject, Optional, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Contact } from '../../../models/contact';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter, HostListener } from '@angular/core';

const matModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatRadioModule,
  MatExpansionModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule
];

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [...matModules, CommonModule, ReactiveFormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {

  @Output() savedContact = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
  saveContact() {
    throw new Error('Method not implemented.');
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEsc(event: KeyboardEvent) {
    this.close();
  }

  newContactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^\(\d{2}\) 9 \d{4}-\d{4}$/)]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),

  });
}
