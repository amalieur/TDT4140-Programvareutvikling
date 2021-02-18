import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from 'src/app/models/category.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostService } from '../post.service';

import { PostFormComponent } from './post-form.component';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let router: Router;
  let mockPostService;

  beforeEach(async () => {
    // PostService mock setup
    mockPostService = jasmine.createSpyObj(['getAllCategories', 'addPost']);
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

    await TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule, SharedModule ],
      providers: [ { provide: PostService, useValue: mockPostService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create and get all categories', async () => {
    expect(component).toBeTruthy();

    // Waits for ngOnInit and checks that we get categories
    fixture.whenStable().then(() => {
      expect(mockPostService.getAllCategories).toHaveBeenCalled();
      expect(component.categories.length).toBe(2);
      expect(component.categories[0].getCategoryId).toBe(1);
      expect(component.categories[1].getName).toBe("Bil");
    });
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
});
