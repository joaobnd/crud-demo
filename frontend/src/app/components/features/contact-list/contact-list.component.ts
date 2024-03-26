import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { Contact } from '../../../models/contact';
import { CommonModule } from '@angular/common';

const matModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatRadioModule,
  MatExpansionModule,
  MatTableModule,
  MatListModule,
];

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    ...matModules,
    CommonModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

  contactMock: Contact = {
    firstName: 'João',
    lastName: 'Martins',
    phone: '83 99650-3753'
  }

  contactList: Contact[] = [
    this.contactMock,
    this.contactMock
  ];
}
