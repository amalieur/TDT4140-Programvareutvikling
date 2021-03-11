import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEditFormComponent } from './user-profile-edit-form.component';

describe('UserProfileEditFormComponent', () => {
  let component: UserProfileEditFormComponent;
  let fixture: ComponentFixture<UserProfileEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
