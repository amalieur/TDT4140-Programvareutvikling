import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserService } from '../user.service';
import { UserGuestProfileComponent } from './user-guest-profile.component';

describe('UserGuestProfileComponent', () => {
  let component: UserGuestProfileComponent;
  let fixture: ComponentFixture<UserGuestProfileComponent>;
  let mockUserService;
  const dateNow = new Date();
  
  beforeEach(async () => {
    // UserService mock setup
    mockUserService = jasmine.createSpyObj(['getUser', 'getAllReceivedUserReviews']);
    mockUserService.getUser.and.returnValue(
      new Promise<User>(
        (resolve) => {
          resolve(new User({
            userId: 1,
            username: "Test",
            email: "test@email.com",
            password: "testPassword",
            create_time: dateNow,
          }));
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
      declarations: [ UserGuestProfileComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'user', component: UserGuestProfileComponent},
          { path: 'login', component: UserLoginFormComponent},
        ])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {params: {id: 1}}}},
        { provide: UserService, useValue: mockUserService }
      ]
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

  it('should get user with id from url parameter', async () => {
    // Waits for ngOnInit and checks that we get user
    expect(component.user).not.toBeNull();

    fixture.whenStable().then(() => {
      expect(mockUserService.getUser).toHaveBeenCalledWith(1);
      expect(component.user).toEqual(new User({
        userId: 1,
        username: "Test",
        email: "test@email.com",
        password: "testPassword",
        create_time: dateNow,
      }));
    });
  });

  it('should get user received reviews', async () => {
    // Waits for ngOnInit and checks that we get reviews
    await fixture.whenStable();
    component.getUserReceivedReviewsByUserId();
    expect(mockUserService.getAllReceivedUserReviews).toHaveBeenCalledWith(1);
  });
});