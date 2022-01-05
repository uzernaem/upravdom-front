import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDosListComponent as ToDosListComponent } from './todos-list.component';

describe('ToDosListComponent', () => {
  let component: ToDosListComponent;
  let fixture: ComponentFixture<ToDosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
