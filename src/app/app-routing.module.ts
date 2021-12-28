import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiriesListComponent } from './components/inquiries-list/inquiries-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AddInquiryComponent } from './components/add-inquiry/add-inquiry.component';
import { InquiryModalComponent } from './components/inquiry-modal/inquiry-modal.component';
import { AnnouncementsListComponent } from './components/announcements-list/announcements-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';

const routes: Routes = [ 
  { path: '', component: MenuComponent },
  { path: 'todos', component: InquiriesListComponent },
  { path: 'todos/:id', component: InquiryModalComponent },
  { path: 'todos/add', component: AddInquiryComponent },  
  { path: 'announcements', component: AnnouncementsListComponent },  
  { path: 'notifications', component: NotificationsListComponent },
  { path: 'todos', component: InquiriesListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
