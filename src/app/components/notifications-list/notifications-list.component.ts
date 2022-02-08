import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { User } from 'src/app/models/user.model';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { BaseInquiryComponent } from '../base-inquiry/base-inquiry.component';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent extends BaseInquiryComponent implements OnInit {

  notifications?: Notification[];
  listednotifications?: Notification[];
  search_title = '';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  filters!: FormGroup;

  statusFilter: string[] = [];
  categoryFilter: string[] = [];

  constructor(inquiryService: InquiryService, public dialog: MatDialog, fb: FormBuilder) {
    super(inquiryService);
    this.filters = fb.group({
    });
  }

  ngOnInit(): void {
    var s = new Date();
    var e = new Date();
    s.setDate(s.getMonth()-10);
    this.range.patchValue({start: s, end: e})
    this.retrieveNotifications();            
    this.retrieveCurrentUser();
  }

  retrieveNotifications(): void {    
    // const s = new Date(this.range.value.start + this.range.value.start.getTimezoneOffset());    
    // const e = new Date(this.range.value.end + this.range.value.end.getTimezoneOffset());
    this.inquiryService.getNotifications()
      .subscribe({
        next: (data) => {          
          this.notifications = data;
          this.notifications.forEach(a => (a.inquiry_created_at = new Date(a.inquiry_created_at!)));
          this.applyFilters();
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  setStatusFilter(event: MatCheckboxChange): void{
    if(event.source.checked) {
      this.statusFilter.push(event.source.value);
    }
    else {
      this.statusFilter = this.statusFilter.filter(x => x != event.source.value);
    }
    this.applyFilters();
  }

  setCategoryFilter(event: MatCheckboxChange): void{
    if(event.source.checked) {
      this.categoryFilter.push(event.source.value);
    }
    else {
      this.categoryFilter = this.categoryFilter.filter(x => x != event.source.value);
    }
    this.applyFilters();
  }

  applyFilters() {    
    const s = new Date(this.range.value.start + this.range.value.start.getTimezoneOffset());    
    const e = new Date(this.range.value.end + this.range.value.end.getTimezoneOffset());
    this.listednotifications = this.notifications!.filter(x => ((x.inquiry_created_at! >= s) && (x.inquiry_created_at! <= e))).filter(x => (x.inquiry_title?.includes(this.search_title)));
  }

  inquiryDialog(id?: number) {
    const dialogRef = this.dialog.open(NotificationModalComponent, {
      data: {
        id: id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.retrieveNotifications();
      console.log(`Dialog result: ${result}`);
    });
  }

  addInquiryDialog() {
    const dialogRef = this.dialog.open(AddNotificationComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveNotifications();
      console.log(`Dialog result: ${result}`);
    });
  }
}