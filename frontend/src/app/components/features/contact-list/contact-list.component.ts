import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Contact } from '../../../models/contact';
import { CommonModule } from '@angular/common';
import { AddContactComponent } from '../add-contact/add-contact.component';

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
  MatTableModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatSelectModule
];

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    ...matModules,
    CommonModule,
    AddContactComponent
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements AfterViewInit {

  constructor() { }

  showModal: boolean = false;

  displayedColumns: string[] = ['position', 'name', 'phone', 'address', 'actions'];
  dataSource = new MatTableDataSource<Contact>([
    contactMock,
    contactMock
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editContact(contact: Contact) {
  }

  deleteContact(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  openModalNewContact() {
    this.showModal = !this.showModal;
  }
}

const contactMock: Contact = {
  firstName: 'João',
  lastName: 'Martins',
  phone: '83 99650-3753',
  address: {
    number: 175,
    street: 'Av Rodrigues Alves',
    neighborhood: 'Universitário',
    city: 'Campina Grande',
    state: 'PB'
  }
}



