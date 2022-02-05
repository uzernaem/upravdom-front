import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/_services/inquiry.service';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {

  info_list ?: Info[];

  constructor(public inquiryService: InquiryService) { }

  ngOnInit(): void {
    this.retrieveInfo();
  }

  retrieveInfo(): void {
    this.inquiryService.getInfo()
      .subscribe({
        next: (data) => {          
          this.info_list = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
