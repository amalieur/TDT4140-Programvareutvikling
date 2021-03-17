import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed , fakeAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { UserProfileEditFormComponent } from './user-profile-edit-form.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

describe('UserProfileEditFormComponent', () => {
  let component: UserProfileEditFormComponent;
  let fixture: ComponentFixture<UserProfileEditFormComponent>;
  let router: Router;
  let mockUserService;

  beforeEach(async () => {
    // UserService mock setup
    mockUserService = jasmine.createSpyObj(['updateUser']);
   
    mockUserService.updateUser.and.returnValue(
      new Promise<string>(
        (resolve) => {
          resolve("success")
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
    providers: [ { provide: UserService, useValue: mockUserService } ]
  })
  .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should validate form', () => {
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

  it('should not update invalid user', fakeAsync(() => {
    // Tests that updating should not happen when user is invalid
    component.updateUser();
    expect(component.statusMessage).toBe("Brukernavn kan ikke være tom");
  }));

  it('should route after updating user', () => {
    // Tests that url is changed after user is updated
    component.username = "Username";
    component.email = "Email";
    component.password = "Password";
    component.confirm_password = "Password";
    component.updateUser();

    expect(mockUserService.updateUser).toHaveBeenCalled();
    expect(router.url).toBe('/');
  });
});
