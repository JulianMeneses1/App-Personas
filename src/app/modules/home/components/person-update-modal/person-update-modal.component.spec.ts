import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonUpdateModalComponent } from './person-update-modal.component';

describe('PersonUpdateModalComponent', () => {
  let component: PersonUpdateModalComponent;
  let fixture: ComponentFixture<PersonUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonUpdateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
