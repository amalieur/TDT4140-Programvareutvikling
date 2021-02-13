import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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
      service.getPost(1).then(post => {
        expect(post.getId).toBe(1);
        expect(post.getTitle).toBe("Test");
      }).catch(error => {
        fail();
      });

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
      service.getPost(2).then(post => {
        fail();
      }).catch(error => {});

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
      service.getPost(2).then(post => {
        fail();
      }).catch(error => {});

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

      service.addPost(post)
      .then(post => {})
      .catch(error => {
        fail();
      });

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

      service.addPost(post).then(post => {
        fail();
      }).catch(error => {});

      const req = httpMock.expectOne("api/post/");
      expect(req.request.method).toBe("POST");
      expect(req.request.body).toEqual(post.serialize());
      req.error(new ErrorEvent("400"));
    });
  });
});

