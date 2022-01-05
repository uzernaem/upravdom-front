import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInquiryComponent } from './base-inquiry.component';

describe('BaseInquiryComponent', () => {
  let component: BaseInquiryComponent;
  let fixture: ComponentFixture<BaseInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
