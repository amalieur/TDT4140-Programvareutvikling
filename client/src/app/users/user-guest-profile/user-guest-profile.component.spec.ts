import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { UserGuestProfileComponent } from './user-guest-profile.component';

describe('UserGuestProfileComponent', () => {
  let component: UserGuestProfileComponent;
  let fixture: ComponentFixture<UserGuestProfileComponent>;
  let mockPostService;
  const dateNow = new Date();
  
  beforeEach(async () => {
    // UserService mock setup
    mockPostService = jasmine.createSpyObj(['getUser']);
    mockPostService.getUser.and.returnValue(
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

    await TestBed.configureTestingModule({
      declarations: [ UserGuestProfileComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {params: {id: 1}}}},
        { provide: UserService, useValue: mockPostService }
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
      expect(mockPostService.getUser).toHaveBeenCalledWith(1);
      expect(component.user).toEqual(new User({
        userId: 1,
        username: "Test",
        email: "test@email.com",
        password: "testPassword",
        create_time: dateNow,
      }));
    });
  });
});