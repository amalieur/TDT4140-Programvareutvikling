import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Category } from '../models/category.model';
import { Post } from '../models/post.model';
import { Review } from '../models/review.model';

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

  describe('deletePost', () => {
    it('should delete post', () => {

      // Deletes post with id = 2
      service.deletePost(2)
      .then(data => {})
      .catch(error => {
        fail();
      });

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/2");
      expect(req.request.method).toBe("DELETE");
      req.flush({
        data: []
      });
    });

    it('should reject on http error', () => {

      // Deletes post with id = 5, but should catch HTTP error
      service.deletePost(5).then(data => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/5");
      expect(req.request.method).toBe("DELETE");
      req.error(new ErrorEvent("400"));
    });
  });

  describe('updatePost', () => {
    it('should update post', () => {
      let post = new Post({
        id: 2,
        title: "Test",
        description: "TestDescription",
        timestamp: 23947298,
        owner: "user",
        imageUrl: null,
        price: 49,
        categoryid: 2
      });
      
      // Updates post with id = 2
      service.updatePost(2, post)
      .then(data => {})
      .catch(error => {
        fail();
      });

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/2");
      expect(req.request.method).toBe("PUT");
      req.flush({
        data: []
      });
    });

    it('should reject on http error', () => {
      let post = new Post({
        id: 2,
        title: "Test",
        description: "TestDescription",
        timestamp: 23947298,
        owner: "user",
        imageUrl: null,
        price: 49,
        categoryid: 2
      });

      // Updates post with id = 2, but should catch HTTP error
      service.updatePost(2, post).then(data => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/2");
      expect(req.request.method).toBe("PUT");
      req.error(new ErrorEvent("400"));
    });
  });

  describe('getPostsByCategory', () => {
    it('should get posts by category', () => {
      // Gets posts by category and checks values
      service.getPostsByCategory(2, undefined, 0, 0, 100).then(posts => {
        for (let i = 0; i < posts.length; i++) {
          expect(posts[i].getId).toBe(i + 1);
          expect(posts[i].getTitle).toBe("Test" + (i + 1));
          expect(posts[i].getCategory).toBe(2);
        }
      }).catch(error => {
        fail();
      });

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/?categoryid=2&location=undefined&sort=0&min_price=0&max_price=100");
      expect(req.request.method).toBe("GET");
      req.flush({
        data: [{
          id: 1,
          title: "Test1",
          description: "TestDescription",
          timestamp: 23947298234,
          owner: "user",
          imageUrl: null,
          price: 49,
          categoryid: 2
        }, {
          id: 2,
          title: "Test2",
          description: "TestDescription",
          timestamp: 23453246527,
          owner: "user",
          imageUrl: null,
          price: 159,
          categoryid: 2
        }]
      });
    });

    it('should reject on invalid post', () => {
      // Gets invalid post, should go to catch
      service.getPostsByCategory(52, undefined, 0, 0, 100).then(posts => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/?categoryid=52&location=undefined&sort=0&min_price=0&max_price=100");
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
      service.getPostsByCategory(35, undefined, 0, 0, 100).then(post => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/?categoryid=35&location=undefined&sort=0&min_price=0&max_price=100");
      expect(req.request.method).toBe("GET");
      req.error(new ErrorEvent("400"));
    });
  });

  describe('getMaxPrice', () => {
    it('should get posts by category', () => {
      // Gets posts by category and checks values
      service.getMaxPrice(2).then(maxPrice => {
        expect(maxPrice).toBe(99);
      }).catch(error => {
        fail();
      });

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/max?categoryid=2");
      expect(req.request.method).toBe("GET");
      req.flush({
        data: [{
          maxPrice: 99
        }]
      });
    });

    it('should reject on http error', () => {
      // Gets HTTP error instead of maxPrice, should catch
      service.getMaxPrice(2).then(maxPrice => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/max?categoryid=2");
      expect(req.request.method).toBe("GET");
      req.error(new ErrorEvent("400"));
    });
  });

  describe('getPostsByUserId', () => {
    it('should get posts by user', () => {
      // Gets posts by category and checks values
      service.getPostsByUserId(2).then(posts => {
        for (let i = 0; i < posts.length; i++) {
          expect(posts[i].getId).toBe(i + 1);
          expect(posts[i].getTitle).toBe("Test" + (i + 1));
          expect(posts[i].getOwner).toBe(2);
        }
      }).catch(error => {
        fail();
      });

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/?userId=2");
      expect(req.request.method).toBe("GET");
      req.flush({
        data: [{
          id: 1,
          title: "Test1",
          description: "TestDescription",
          timestamp: 23947298234,
          owner: 2,
          imageUrl: null,
          price: 49,
          categoryid: 2
        }, {
          id: 2,
          title: "Test2",
          description: "TestDescription",
          timestamp: 23453246527,
          owner: 2,
          imageUrl: null,
          price: 159,
          categoryid: 2
        }]
      });
    });

    it('should reject on invalid post', () => {
      // Gets invalid post, should go to catch
      service.getPostsByUserId(420).then(posts => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/?userId=420");
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
      service.getPostsByUserId(520).then(posts => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/?userId=520");
      expect(req.request.method).toBe("GET");
      req.error(new ErrorEvent("400"));
    });
  });

  describe('contactPost', () => {
    it('should add post and user postContacted relation', () => {
      // Add relation of post with id = 2 and user with id = 1
      service.contactPost(2, 1)
      .then(data => {})
      .catch(error => {
        fail();
      });

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/contact/");
      expect(req.request.method).toBe("POST");
      req.flush({
        data: []
      });
    });

    it('should reject on http error', () => {
      // Add relation of post with id = 2 and user with id = 1, but should catch HTTP error
      service.contactPost(2, 1).then(data => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/contact/");
      expect(req.request.method).toBe("POST");
      req.error(new ErrorEvent("400"));
    });
  });

  describe('reviewPost', () => {
    it('should add review', () => {
      // Add review on post with id = 2, user with id = 1 and 5 stars given
      service.reviewPost(2, 1, 5, "Test comment")
      .then(data => {})
      .catch(error => {
        fail();
      });

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/review/");
      expect(req.request.method).toBe("POST");
      req.flush({
        data: []
      });
    });

    it('should reject on http error', () => {
      // Add review on post with id = 2, user with id = 1 and 5 stars given, but should catch HTTP error
      service.reviewPost(2, 1, 5, "Test comment").then(data => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/review/");
      expect(req.request.method).toBe("POST");
      req.error(new ErrorEvent("400"));
    });
  });

  describe('updateReview', () => {
    it('should update review', () => {
      let review = new Review({
        id: 2,
        userId: 1,
        stars: 5,
        comment: "Test comment",
      });
      
      // Updates review with id = 2 and userId = 1
      service.updateReview(review)
      .then(data => {})
      .catch(error => {
        fail();
      });

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/review/");
      expect(req.request.method).toBe("PUT");
      req.flush({
        data: []
      });
    });

    it('should reject on http error', () => {
      let review = new Review({
        id: 2,
        userId: 1,
        stars: 5,
        comment: "Test comment",
      });

      // Updates review with id = 2 and userId = 1, but should catch HTTP error
      service.updateReview(review).then(data => {
        fail();
      }).catch(error => {});

      // Mocks and checks HTTP request
      const req = httpMock.expectOne("api/post/review/");
      expect(req.request.method).toBe("PUT");
      req.error(new ErrorEvent("400"));
    });
  });
});