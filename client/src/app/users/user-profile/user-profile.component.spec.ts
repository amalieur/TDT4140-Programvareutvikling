import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/models/user.model';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let mockAuthService;

  beforeEach(async () => {
    // AuthService mock setup
    mockAuthService = jasmine.createSpyObj(['getCurrentUser']);
    mockAuthService.getCurrentUser.and.returnValue(new User({
      userId: 4,
      username: "tester",
      email: "test@test.com",
      password: "1234",
      create_time: 513498
    }));
    

    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: UserLoginFormComponent}
        ]) 
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get current user', async () => {
    await fixture.whenStable();
    expect(mockAuthService.getCurrentUser).toHaveBeenCalled();
    expect(component.user).toEqual(new User({
      userId: 4,
      username: "tester",
      email: "test@test.com",
      password: "1234",
      create_time: 513498
    }));
  });
});
