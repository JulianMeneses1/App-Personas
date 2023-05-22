import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDeleteModalComponent } from './person-delete-modal.component';

describe('PersonDeleteModalComponent', () => {
  let component: PersonDeleteModalComponent;
  let fixture: ComponentFixture<PersonDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
