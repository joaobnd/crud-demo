import { Component, Inject, Input, OnDestroy, OnInit, Optional, Output } from '@angular/core';

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
import { DataService } from '../../../shared/data.service';
import { ActivatedRoute } from '@angular/router';

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
export class AddContactComponent implements OnInit {

  isEditMode = false;
  @Input() contactToEdit: Contact | null = null;

  @Output() contactCreated = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.contactToEdit) { this.isEditMode = true };
    this.populateForm()
  }

  reset(): void {
    this.newContactForm.reset();
    this.isEditMode = false;
    this.contactToEdit = null;
  }

  close() {
    this.reset();
    this.closeModal.emit();
  };

  populateForm(): void {
    if (this.contactToEdit) {
      this.newContactForm.patchValue({
        name: this.contactToEdit.name,
        phone: this.contactToEdit.phone,
        street: this.contactToEdit.street,
        number: this.contactToEdit.number,
        neighborhood: this.contactToEdit.neighborhood,
        city: this.contactToEdit.city,
        state: this.contactToEdit.state
      });
    }
  }

  saveContact() {

    if (this.newContactForm.valid) {
      const formData = this.newContactForm.value;

      if (this.isEditMode) {
        this.dataService.editContact(formData, this.contactToEdit?.id).subscribe({
          next: () => {
            this.reset();
            this.contactCreated.emit();
            this.close();
          },
          error: (error: any) => {
            console.error('Error creating contact:', error);
          }
        });
      } else {
        this.dataService.createContact(formData).subscribe({
          next: () => {
            this.reset();
            this.contactCreated.emit();
            this.close();
          },
          error: (error: any) => {
            console.error('Error creating contact:', error);
          }
        });
      }
    }
  }

  newContactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^\d{2} \d \d{4}-\d{4}$/)]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),

  });
}
