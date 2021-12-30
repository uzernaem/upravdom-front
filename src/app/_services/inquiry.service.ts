import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo, InquiryCategory, Comment, Announcement, Notification, Poll } from '../models/inquiry.model';
import { User } from '../models/user.model';
import { serverUrl } from '../_services/baseurl';

const API_URL = serverUrl+'inquiries/api/';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {    
    return this.http.get<User[]>(API_URL + 'users');
  }

  getUser(): Observable<User> {    
    return this.http.get<User>(API_URL + 'user');
  }

  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(API_URL + 'todos');
  }

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(API_URL + 'announcements');
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(API_URL + 'notifications');
  }

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(API_URL + 'polls');
  }

  // getCategories(): Observable<ToDoCategory[]> {
  //   return this.http.get<ToDoCategory[]>(categoriesUrl);
  // }

  getCategory(id: any): Observable<InquiryCategory> {
    return this.http.get(`${API_URL + 'categories'}/${id}`);
  }

  get(id: any): Observable<ToDo> {
    return this.http.get(`${API_URL + 'todos'}/${id}`);
  }

  getAnnouncement(id: any): Observable<Announcement> {
    return this.http.get(`${API_URL + 'announcements'}/${id}`);
  }

  getNotification(id: any): Observable<Notification> {
    return this.http.get(`${API_URL + 'notifications'}/${id}`);
  }
  
  getComments(id: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${API_URL + 'comments'}/${id}`)
  }

  createComment(data: any, id: any): Observable<any> {
    return this.http.post(`${API_URL + 'comments'}/${id}`, data);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_URL + 'todos', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL + 'todos'}/${id}`, data);
  }

  updateAnnouncement(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL + 'announcements'}/${id}`, data);
  }
  
  updateNotification(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL + 'notifications'}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL + 'todos'}/${id}`);
  }

  deleteAnnouncement(id: any): Observable<any> {
    return this.http.delete(`${API_URL + 'announcements'}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(API_URL + 'todos');
  }

  findByTitle(title: any): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${API_URL + 'todos'}?title=${title}`);
  }

  createAnnouncement(data: any): Observable<Announcement> {
    return this.http.post<Announcement>(API_URL + 'announcements', data);
  }
  
  createNotification(data: any): Observable<Notification> {
    return this.http.post<Notification>(API_URL + 'notifications', data);
  }
}
