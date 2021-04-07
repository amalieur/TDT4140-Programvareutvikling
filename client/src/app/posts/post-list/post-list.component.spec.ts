import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Category } from 'src/app/models/category.model';
import { Post } from 'src/app/models/post.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostService } from '../post.service';

import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let mockPostService;

  beforeEach(async () => {
    // PostService mock setup
    mockPostService = jasmine.createSpyObj(['getAllCategories', 'getAllPosts', 'getMaxPrice', 'getPostsByCategory']);
    mockPostService.getAllCategories.and.returnValue(
      new Promise<Array<Category>>(
        (resolve) => {
          resolve([new Category({categoryid: 1, name: "Elektronikk"}), new Category({categoryid: 2, name: "Bil"})])
        })
    );
    mockPostService.getAllPosts.and.returnValue(
      new Promise<Array<Post>>((resolve) => {
        resolve([
          new Post({
            id: 1,
            title: "Test1",
            description: "TestDescription",
            timestamp: 23947298234,
            owner: "user",
            imageUrl: null,
            price: 49,
            categoryid: 1
          }), 
          new Post({
            id: 2,
            title: "Test2",
            description: "TestDescription",
            timestamp: 23453246527,
            owner: "user",
            imageUrl: null,
            price: 159,
            categoryid: 2
          })
        ]);
      })
    );
    mockPostService.getPostsByCategory.and.returnValue(
      new Promise<Array<Post>>((resolve) => {
        resolve([
          new Post({
            id: 1,
            title: "Test1",
            description: "TestDescription",
            timestamp: 23947298234,
            owner: "user",
            imageUrl: null,
            price: 49,
            categoryid: 1
          })
        ]);
      })
    );
    mockPostService.getMaxPrice.and.returnValue(
      new Promise<number>((resolve) => {
        resolve(159);
      })
    );

    await TestBed.configureTestingModule({
      declarations: [ PostListComponent ],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers: [ { provide: PostService, useValue: mockPostService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all posts', async () => {
    // Waits for ngOnInit and checks that we get all posts
    await fixture.whenStable();
    expect(mockPostService.getAllPosts).toHaveBeenCalled();
    expect(component.allPosts.length).toBe(2);
    expect(component.allPosts[0].getId).toBe(1);
    expect(mockPostService.getMaxPrice).toHaveBeenCalled();
    expect(component.postMaxPrice).toBe(159);
    expect(component.priceMax).toBe(159);
  });

  it('should get filtered posts', async () => {
    // Waits for ngOnInit and checks that we get all posts
    await fixture.whenStable();

    component.selectedCategory = 1;
    component.priceMax = 50;
    component.selectedSort = 2;
    await component.filterCategory(true);

    expect(mockPostService.getPostsByCategory).toHaveBeenCalledWith(1, 2, 0, 159);
    expect(component.allPosts.length).toBe(1);
    expect(component.allPosts[0].getId).toBe(1);

    expect(mockPostService.getMaxPrice).toHaveBeenCalled();
    expect(component.postMaxPrice).toBe(159);
    expect(component.priceMax).toBe(159);
  });
});
