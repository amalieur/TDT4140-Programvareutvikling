import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/models/user.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserService } from '../user.service';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let mockAuthService, mockUserService;

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

    // UserService mock setup
    mockUserService = jasmine.createSpyObj(['deleteUser']);
    mockUserService.deleteUser.and.returnValue(
      new Promise<any>(
        (resolve) => {
          resolve({data: []})
        })
    );
    

    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: UserLoginFormComponent}
        ]) 
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService }
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

  it('should delete current user', async () => {
    // Waits for ngOnInit and checks that we can delete the current user
    await fixture.whenStable();
    component.deleteUser();
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(4);
  });
});
