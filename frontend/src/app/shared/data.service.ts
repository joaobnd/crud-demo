import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:4200/api';

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/contact');
  }

  createContact(contactData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/contact', contactData);
  }

  getContact(contactId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contact/${contactId}`);
  }

  editContact(contactData: any, contactId: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/contact/${contactId}`, contactData);
  }

  deleteContact(contactId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/contact/${contactId}`)
  }
}
