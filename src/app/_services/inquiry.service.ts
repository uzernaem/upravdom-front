import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo, InquiryCategory, Comment, Announcement, Notification } from '../models/inquiry.model';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8000/inquiries/api/';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {    
    return this.http.get<User[]>(baseUrl + 'users');
  }

  getUser(): Observable<User> {    
    return this.http.get<User>(baseUrl + 'user');
  }

  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(baseUrl + 'todos');
  }

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(baseUrl + 'announcements');
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(baseUrl + 'notifications');
  }

  // getCategories(): Observable<ToDoCategory[]> {
  //   return this.http.get<ToDoCategory[]>(categoriesUrl);
  // }

  getCategory(id: any): Observable<InquiryCategory> {
    return this.http.get(`${baseUrl + 'categories'}/${id}`);
  }

  get(id: any): Observable<ToDo> {
    return this.http.get(`${baseUrl + 'todos'}/${id}`);
  }

  getAnnouncement(id: any): Observable<Announcement> {
    return this.http.get(`${baseUrl + 'announcements'}/${id}`);
  }

  getNotification(id: any): Observable<Notification> {
    return this.http.get(`${baseUrl + 'notifications'}/${id}`);
  }
  getComments(id: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseUrl + 'comments'}/${id}`)
  }

  createComment(data: any, id: any): Observable<any> {
    return this.http.post(`${baseUrl + 'comments'}/${id}`, data);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + 'todos', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl + 'todos'}/${id}`, data);
  }

  updateAnnouncement(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl + 'announcements'}/${id}`, data);
  }
  
  updateNotification(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl + 'notifications'}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl + 'todos'}/${id}`);
  }

  deleteAnnouncement(id: any): Observable<any> {
    return this.http.delete(`${baseUrl + 'announcements'}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl + 'todos');
  }

  findByTitle(title: any): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${baseUrl + 'todos'}?title=${title}`);
  }

  createAnnouncement(data: any): Observable<Announcement> {
    return this.http.post<Announcement>(baseUrl + 'announcements', data);
  }
  
  createNotification(data: any): Observable<Notification> {
    return this.http.post<Notification>(baseUrl + 'notifications', data);
  }
}
