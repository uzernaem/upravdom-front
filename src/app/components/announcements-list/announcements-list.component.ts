import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AddAnnouncementComponent } from '../add-announcement/add-announcement.component';
import { AnnouncementModalComponent } from '../announcement-modal/announcement-modal.component';

@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.css']
})

export class AnnouncementsListComponent implements OnInit {

  announcements?: Announcement[];
  listedannouncements?: Announcement[];
  search_title = '';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  filters!: FormGroup;  
  categoryFilter: string[] = [];

  constructor(private inquiryService: InquiryService, public dialog: MatDialog, fb: FormBuilder) { 
    this.filters = fb.group({
      category0: true,
      category1: true,
      category2: true,
      category3: true,
      category4: true,
      category5: true
    });
  }

  ngOnInit(): void {
    var s = new Date();
    var e = new Date();
    s.setDate(s.getMonth()-10);
    this.range.patchValue({start: s, end: e})
    this.categoryFilter = ['0', '1', '2', '3', '4', '5'];
    this.retrieveAnnouncements();
  }

  retrieveAnnouncements(): void {
    this.inquiryService.getAnnouncements()
      .subscribe({
        next: (data) => {
          this.announcements = data;
          this.announcements.forEach(a => (a.inquiry_created_at = new Date(a.inquiry_created_at!)));
          this.applyFilters();
          console.log(data);
        },
        error: (e) => console.error(e)
      });
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
    this.listedannouncements = this.announcements?.filter(x =>
       (this.categoryFilter.includes(x.announcement_category!))).filter(x => (x.inquiry_title?.includes(this.search_title))).filter(x => ((x.inquiry_created_at! >= s) && (x.inquiry_created_at! <= e)));
  }

  inquiryDialog(id?: number) {
    const dialogRef = this.dialog.open(AnnouncementModalComponent, {
      data: {
        id: id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.retrieveAnnouncements();
      console.log(`Dialog result: ${result}`);
    });
  }

  addInquiryDialog() {
    const dialogRef = this.dialog.open(AddAnnouncementComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveAnnouncements();
      console.log(`Dialog result: ${result}`);
    });
  }
}