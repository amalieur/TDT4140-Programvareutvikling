import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/authentication/auth.service';
import { Review } from 'src/app/models/review.model';
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
      create_time: 513498,
      isAdmin: 0
    }));

    // UserService mock setup
    mockUserService = jasmine.createSpyObj(['deleteUser', 'getAllGivenReviews', 'getAllReceivedUserReviews']);
    mockUserService.deleteUser.and.returnValue(
      new Promise<any>(
        (resolve) => {
          resolve({data: []})
        })
    );
    mockUserService.getAllGivenReviews.and.returnValue(
      new Promise<Review[]>(
        (resolve) => {
          resolve([new Review({
            id: 2,
            userId: 1,
            stars: 5,
            comment: "Test comment",
          })]);
        })
    );
    mockUserService.getAllReceivedUserReviews.and.returnValue(
      new Promise<Review[]>(
        (resolve) => {
          resolve([new Review({
            id: 2,
            userId: 1,
            stars: 5,
            comment: "Test comment",
          })]);
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
      create_time: 513498,
      isAdmin: 0
    }));
  });

  it('should get user given reviews', async () => {
    // Waits for ngOnInit and checks that we get reviews
    await fixture.whenStable();
    component.getUserGivenReviewsByUserId();
    expect(mockUserService.getAllGivenReviews).toHaveBeenCalledWith(4);
  });

  it('should get user received reviews', async () => {
    // Waits for ngOnInit and checks that we get reviews
    await fixture.whenStable();
    component.getUserReceivedReviewsByUserId();
    expect(mockUserService.getAllReceivedUserReviews).toHaveBeenCalledWith(4);
  });
});
