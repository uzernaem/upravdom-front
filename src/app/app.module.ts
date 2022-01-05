import { AddAnnouncementComponent } from './components/add-announcement/add-announcement.component';
import { AddInquiryComponent } from './components/add-todo/add-inquiry.component';
import { AddNotificationComponent } from './components/add-notification/add-notification.component';
import { AnnouncementModalComponent } from './components/announcement-modal/announcement-modal.component';
import { AnnouncementsListComponent } from './components/announcements-list/announcements-list.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CustomDateAdapter } from './custom-date-adapter';
import { DateAdapter, MatOptionModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ToDosListComponent } from './components/todos-list/todos-list.component';
import { InquiryModalComponent } from './components/todo-modal/inquiry-modal.component';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from './components/menu/menu.component';
import { NgModule } from '@angular/core';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { PollsListComponent } from './components/polls-list/polls-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { BaseInquiryComponent } from './components/base-inquiry/base-inquiry.component';


const modules = [
  AppRoutingModule,
  BrowserAnimationsModule,
  BrowserModule,
  FlexLayoutModule,
  FormsModule,
  HttpClientModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTableModule,
  MatToolbarModule,
  ReactiveFormsModule,
  RouterModule,
];

@NgModule({
  declarations: [
    AddAnnouncementComponent,
    AddInquiryComponent,
    AddNotificationComponent,
    AnnouncementModalComponent,
    AnnouncementsListComponent,
    AppComponent,
    HomeComponent,
    ToDosListComponent,
    InquiryModalComponent,
    LoginComponent,
    MenuComponent,
    NotificationModalComponent,
    NotificationsListComponent,
    PollsListComponent,
    ProfileComponent,
    RegisterComponent,
    BaseInquiryComponent,
  ],
  imports: [modules, BrowserAnimationsModule],
  exports: [modules],
  providers: [authInterceptorProviders, 
    { provide: DateAdapter, useClass: CustomDateAdapter }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('ru-RU');
  }
}