import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed , fakeAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { UserProfileEditFormComponent } from './user-profile-edit-form.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/authentication/auth.service';

describe('UserProfileEditFormComponent', () => {
  let component: UserProfileEditFormComponent;
  let fixture: ComponentFixture<UserProfileEditFormComponent>;
  let router: Router;
  let mockUserService;
  let mockAuthService;

  beforeEach(async () => {
    // AuthService mock setup
    mockAuthService = jasmine.createSpyObj(['getCurrentUser']);
    mockAuthService.getCurrentUser.and.returnValue(new User({
      userId: 4,
      username: "tester",
      email: "test@test.com",
      password: "1234",
      create_time: 513498,
      isAdmin: 0
    }));

    // UserService mock setup
    mockUserService = jasmine.createSpyObj(['updateUser', 'deleteUser']);
    mockUserService.updateUser.and.returnValue(
      new Promise<string>(
        (resolve) => {
          resolve("success")
        })
    );
    mockUserService.deleteUser.and.returnValue(
      new Promise<any>(
        (resolve) => {
          resolve({data: []})
        })
    );
  });
    

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileEditFormComponent ],
      imports: [ 
        HttpClientTestingModule, 
        FormsModule, 
        SharedModule,
        RouterTestingModule.withRoutes([
         { path: 'profil', component: UserProfileComponent}
        ])
      ],
      providers: [ 
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
      ]
  })
  .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should validate form', async () => {
    await fixture.whenStable();
    // Reset form
    component.username = "";
    component.email = "";
    component.password = "";
    component.confirm_password = "";

    // Tests all if-sentences in checkForm
    expect(component.checkForm()).toBeFalse();
    expect(component.statusMessage).toBe("Brukernavn kan ikke være tom");

    component.username = "Username";
    expect(component.checkForm()).toBeFalse();
    expect(component.statusMessage).toBe("Eposten kan ikke være tom");
    
    component.email = "Email";
    expect(component.checkForm()).toBeFalse();
    expect(component.statusMessage).toBe("Passordet kan ikke være tomt");

    component.password = "password";
    expect(component.checkForm()).toBeFalse();
    expect(component.statusMessage).toBe("Passordet kan ikke være tomt");

    component.confirm_password = "hei";
    expect(component.checkForm()).toBeFalse();
    expect(component.statusMessage).toBe("Passordene gitt samsvarer ikke");

    component.confirm_password = "password";
    expect(component.checkForm()).toBeTrue();
    expect(component.statusMessage).toBe("");
  });

  it('should get current user', async () => {
    expect(mockAuthService.getCurrentUser).toHaveBeenCalled();
    expect(component.user).toEqual(new User({
      userId: 4,
      username: "tester",
      email: "test@test.com",
      password: "1234",
      create_time: 513498,
      isAdmin: 0
    }));
  });

  it('should not update invalid user', fakeAsync(() => {
    // Reset form
    component.username = "";
    component.email = "";
    component.password = "";
    component.confirm_password = "";
    // Tests that updating should not happen when user is invalid
    component.updateUser();
    expect(component.statusMessage).toBe("Brukernavn kan ikke være tom");
  }));

  it('should route after updating user', async () => {
    // Waits for ngOnInit and tests that url is changed after user is updated
    await fixture.whenStable();
    component.username = "Username";
    component.email = "Email";
    component.password = "Password";
    component.confirm_password = "Password";
    component.updateUser();

    expect(mockUserService.updateUser).toHaveBeenCalled();
    expect(router.url).toBe('/');
  });

  it('should delete current user', async () => {
    // Waits for ngOnInit and checks that we can delete the current user
    await fixture.whenStable();
    component.deleteUser();
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(4);
  });
});
