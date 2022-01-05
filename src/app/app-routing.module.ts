import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDosListComponent } from './components/todos-list/todos-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AnnouncementsListComponent } from './components/announcements-list/announcements-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { PollsListComponent } from './components/polls-list/polls-list.component';

const routes: Routes = [ 
  { path: '', component: MenuComponent },
  { path: 'todos', component: ToDosListComponent },
  { path: 'announcements', component: AnnouncementsListComponent },
  { path: 'notifications', component: NotificationsListComponent },
  { path: 'polls', component: PollsListComponent },
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
