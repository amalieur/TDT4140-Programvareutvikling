import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGuestProfileComponent } from './user-guest-profile.component';

describe('UserGuestProfileComponent', () => {
  let component: UserGuestProfileComponent;
  let fixture: ComponentFixture<UserGuestProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGuestProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGuestProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
