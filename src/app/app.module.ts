import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InquiriesListComponent } from './components/inquiries-list/inquiries-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DateAdapter, MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InquiryModalComponent } from './components/inquiry-modal/inquiry-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddInquiryComponent } from './components/add-inquiry/add-inquiry.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AnnouncementsListComponent } from './components/announcements-list/announcements-list.component';
import { AddAnnouncementComponent } from './components/add-announcement/add-announcement.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AnnouncementModalComponent } from './components/announcement-modal/announcement-modal.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { AddNotificationComponent } from './components/add-notification/add-notification.component';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';
import { CustomDateAdapter } from './custom-date-adapter';
import { PollsListComponent } from './components/polls-list/polls-list.component';



const modules = [
  MatSidenavModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  ReactiveFormsModule,
  MatDialogModule,
  BrowserModule,
  AppRoutingModule,
  FlexLayoutModule,
  FormsModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatFormFieldModule,
  RouterModule,
  HttpClientModule,
];

@NgModule({
  declarations: [
    AppComponent,
    InquiriesListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    InquiryModalComponent,
    AddInquiryComponent,
    AnnouncementsListComponent,
    AddAnnouncementComponent,
    AnnouncementModalComponent,
    MenuComponent,
    NotificationsListComponent,
    AddNotificationComponent,
    NotificationModalComponent,
    PollsListComponent
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