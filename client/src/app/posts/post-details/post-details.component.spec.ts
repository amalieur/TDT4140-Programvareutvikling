import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/authentication/auth.service';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostListComponent } from '../post-list/post-list.component';
import { PostService } from '../post.service';

import { PostDetailsComponent } from './post-details.component';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
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
    mockPostService = jasmine.createSpyObj(['getPost', 'deletePost']);
    mockPostService.getPost.and.returnValue(
      new Promise<Post>(
        (resolve) => {
          resolve(new Post({
            id: 5,
            title: "Test",
            description: "TestDescription",
            timestamp: 23947298,
            owner: 4,
            imageUrl: null,
            price: 49,
            categoryid: 2
          }));
        })
    );
    mockPostService.deletePost.and.returnValue(
      new Promise<any>(
        (resolve) => {
          resolve({data: []})
        })
    );

    await TestBed.configureTestingModule({
      declarations: [ PostDetailsComponent ],
      imports: [ 
        HttpClientTestingModule, 
        SharedModule, 
        RouterTestingModule.withRoutes([
          { path: 'annonse', component: PostListComponent}
        ])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {params: {id: 5}}}},
        { provide: PostService, useValue: mockPostService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get post with id from url parameter', async () => {
    // Waits for ngOnInit and checks that we get post
    await fixture.whenStable();
    expect(mockPostService.getPost).toHaveBeenCalledWith(5);
    expect(component.post).toEqual(new Post({
      id: 5,
      title: "Test",
      description: "TestDescription",
      timestamp: 23947298,
      owner: 4,
      imageUrl: null,
      price: 49,
      categoryid: 2
    }));
  });

  it('should get current user', async () => {
    // Waits for ngOnInit and checks that we get post
    await fixture.whenStable();

    expect(mockAuthService.getCurrentUser).toHaveBeenCalledWith(false);
    expect(component.userId).toBe(4);
  });

  it('should delete post with id', async () => {
    // Waits for ngOnInit and checks that we can delete post
    await fixture.whenStable();
    component.deletePost();
    expect(mockPostService.deletePost).toHaveBeenCalledWith(5);
  });
});
