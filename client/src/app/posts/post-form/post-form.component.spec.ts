import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/authentication/auth.service';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserLoginFormComponent } from 'src/app/users/user-login-form/user-login-form.component';
import { PostListComponent } from '../post-list/post-list.component';
import { PostService } from '../post.service';

import { PostFormComponent } from './post-form.component';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let router: Router;
  let mockPostService, mockAuthService;

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

    // PostService mock setup
    mockPostService = jasmine.createSpyObj(['getAllCategories', 'addPost', 'deletePost']);
    mockPostService.getAllCategories.and.returnValue(
      new Promise<Array<Category>>(
        (resolve) => {
          resolve([new Category({categoryid: 1, name: "Elektronikk"}), new Category({categoryid: 2, name: "Bil"})])
        })
    );
    mockPostService.addPost.and.returnValue(
      new Promise<string>(
        (resolve) => {
          resolve("success")
        })
    );
    mockPostService.deletePost.and.returnValue(
      new Promise<any>(
        (resolve) => {
          resolve({data: []})
        })
    );

    await TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
      imports: [ 
        HttpClientTestingModule, 
        FormsModule, 
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'annonse', component: PostListComponent},
          { path: 'login', component: UserLoginFormComponent}
        ])
      ],
      providers: [
        { provide: PostService, useValue: mockPostService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should get current user', async () => {
    // Waits for ngOnInit and checks that we get categories
    await fixture.whenStable();
    expect(mockAuthService.getCurrentUser).toHaveBeenCalled();
    expect(component.currentUser.getUserId).toBe(4);
  });

  it('should get all categories', async () => {
    // Waits for ngOnInit and checks that we get categories
    await fixture.whenStable();
    expect(mockPostService.getAllCategories).toHaveBeenCalled();
    expect(component.categories.length).toBe(2);
    expect(component.categories[0].getCategoryId).toBe(1);
    expect(component.categories[1].getName).toBe("Bil");
  });

  it('should validate form', () => {
    // Tests all if-sentences in checkForm
    expect(component.checkForm()).toBeFalse();
    expect(component.statusMessage).toBe("Tittelen kan ikke være tom");

    component.title = "Title";
    expect(component.checkForm()).toBeFalse();
    expect(component.statusMessage).toBe("Beskrivelsen kan ikke være tom");
    
    component.description = "Description";
    component.price = -100;
    expect(component.checkForm()).toBeFalse();
    expect(component.statusMessage).toBe("Prisen kan ikke være negativ");

    component.price = null;
    expect(component.checkForm()).toBeFalse();
    expect(component.statusMessage).toBe("Annonsen må ha en pris");

    component.price = 50;
    expect(component.checkForm()).toBeFalse();
    expect(component.statusMessage).toBe("Annonsen må ha en kategori");

    component.categoryid = 2;
    expect(component.checkForm()).toBeTrue();
    expect(component.statusMessage).toBe("");
  });

  it('should stop publishing invalid post', fakeAsync(() => {
    // Tests that publishing should be stopped on invalid post
    component.publishPost();
    expect(component.statusMessage).toBe("Tittelen kan ikke være tom");
  }));

  it('should route after publishing post', () => {
    // Tests that url is changed after post is published
    component.title = "Title";
    component.description = "Description";
    component.price = 50;
    component.categoryid = 2;
    component.publishPost();

    expect(mockPostService.addPost).toHaveBeenCalled();
    expect(router.url).toBe('/');
  });

  it('should show image', () => {
    // Tests that image is updated with new URL
    component.showImage("test");
    expect(component.displayImageUrl).toBe("test");
  });

  it('should delete post with id', async () => {
    component.id = 5;

    // Waits for ngOnInit and checks that we can delete post
    await fixture.whenStable();
    component.deletePost();
    expect(mockPostService.deletePost).toHaveBeenCalledWith(5);
  });

  it('should not delete new post', async () => {
    // Waits for ngOnInit and checks that we can delete post
    await fixture.whenStable();
    component.deletePost();
    expect(mockPostService.deletePost).not.toHaveBeenCalledWith(5);
  });
});
