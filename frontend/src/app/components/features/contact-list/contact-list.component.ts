import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { DataService } from '../../../shared/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  MatSelectModule,
  MatSortModule
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
export class ContactListComponent implements AfterViewInit, OnInit {

  constructor(private router: Router, private dataService: DataService) { }

  showModal: boolean = false;

  sortedData!: Contact[];

  displayedColumns: string[] = ['position', 'name', 'phone', 'address', 'actions'];
  dataSource = new MatTableDataSource<Contact>();

  contactToEdit: Contact | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadContactList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sortedData = this.dataSource.data;
  }

  loadContactList() {
    this.dataService.getAllContacts().subscribe(
      {
        next: (contacts) => {
          const contactsArray = Object.values(contacts);
          this.dataSource.data = contactsArray;
        },
        error: (erro) => {
          alert("Error while getting contact list.");
          console.log(erro)
        }
      }
    )
  };

  onContactCreated(): void {
    this.loadContactList();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: Contact, b: Contact) => {
      const isAsc = sort.direction === 'asc';
      return compare(a.name, b.name, isAsc);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editContact(contactToEdit: Contact) {
    this.contactToEdit = contactToEdit;
    this.openModalNewContact();
  }

  deleteContact(contactId: number) {
    this.dataService.deleteContact(contactId).subscribe(
      {
        next: () => {
          this.loadContactList();
        },
        error: (erro) => {
          alert("Error while deleting contact.");
          console.log(erro)
        }
      }
    )
  }


  openModalNewContact() {
    this.showModal = true;
  }

  closeModalNewContact() {
    this.contactToEdit = null;
    this.showModal = false;
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



