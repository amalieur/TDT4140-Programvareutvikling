import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Category } from '../models/category.model';
import { Post } from '../models/post.model';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPost', () => {
    it('should get a post', () => {
      // Gets post and checks values
      service.getPost(1).then(post => {
        expect(post.getId).toBe(1);
        expect(post.getTitle).toBe("Test");
      }).catch(error => {
        fail();
      });

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/1");
      expect(req.request.method).toBe("GET");
      req.flush({
        data: [{
          id: 1,
          title: "Test",
          description: "TestDescription",
          timestamp: 23947298,
          owner: "user",
          imageUrl: null,
          price: 49,
          categoryid: 2
        }]
      });
    });

    it('should reject on invalid post', () => {
      // Gets invalid post, should go to catch
      service.getPost(2).then(post => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/2");
      expect(req.request.method).toBe("GET");
      req.flush({
        data: [{
          id: 0,
          title: "Test",
          description: "TestDescription",
          timestamp: 23947298
        }]
      });
    });

    it('should reject on http error', () => {
      // Gets HTTP error instead of post, should catch
      service.getPost(2).then(post => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/2");
      expect(req.request.method).toBe("GET");
      req.error(new ErrorEvent("400"));
    });
  });

  describe('addPost', () => {
    it('should add a post', () => {
      let post = new Post({
        id: 1,
        title: "Test",
        description: "TestDescription",
        timestamp: 23947298,
        owner: "user",
        imageUrl: null,
        price: 49,
        categoryid: 2
      });

      // Adds post
      service.addPost(post)
      .then(post => {})
      .catch(error => {
        fail();
      });

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/");
      expect(req.request.method).toBe("POST");
      expect(req.request.body).toEqual(post.serialize());
      req.flush({
        data: [{
          status: "success"
        }]
      });
    });

    it('should reject on http error', () => {
      let post = new Post({
        id: 1,
        title: "Test",
        description: "TestDescription",
        timestamp: 23947298,
        owner: "user",
        imageUrl: null,
        price: 49,
        categoryid: 2
      });

      // Adds post, gets HTTP error, should catch
      service.addPost(post).then(post => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/");
      expect(req.request.method).toBe("POST");
      expect(req.request.body).toEqual(post.serialize());
      req.error(new ErrorEvent("400"));
    });
  });

  describe('getAllCategories', () => {
    it('should get categories', () => {

      // Gets all categories and checks values
      service.getAllCategories()
      .then(categories => {
        expect(categories.length).toBe(3);
        expect(categories[0] instanceof Category).toBeTrue();
        expect(categories[1].getCategoryId).toBe(2);
        expect(categories[2].getName).toBe("Elektronikk");
      })
      .catch(error => {
        fail();
      });

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/category/");
      expect(req.request.method).toBe("GET");
      req.flush({
        data: [
          {categoryid: 1, name: "Dyr"},
          {categoryid: 2, name: "Bil"},
          {categoryid: 3, name: "Elektronikk"}
        ]
      });
    });

    it('should reject on http error', () => {

      // Gets HTTP error, should catch
      service.getAllCategories().then(categories => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/category/");
      expect(req.request.method).toBe("GET");
      req.error(new ErrorEvent("400"));
    });
  });
});

