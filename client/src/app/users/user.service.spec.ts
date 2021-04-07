import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Review } from '../models/review.model';
import { User } from '../models/user.model';

import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ]
      });
      service = TestBed.inject(UserService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    describe('getUser', () => {
      it('should get an user', () => {
        // Gets post and checks values
        service.getUser(1).then(user => {
          expect(user.getUserId).toBe(1);
          expect(user.getUsername).toBe("zorg");
        }).catch(error => {
          fail();
        });
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/user/1");
        expect(req.request.method).toBe("GET");
        req.flush({
          data: [{
            userId: 1,
            username: "zorg",
            email: "blob@planet.us",
            password: "Hyttepine",
            create_time: 1613552549000,
            isAdmin: 0
          }]
        });
      });
  
      it('should reject on invalid user', () => {
        // Gets invalid post, should go to catch
        service.getUser(2).then(user => {
          fail();
        }).catch(error => {});
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/user/2");
        expect(req.request.method).toBe("GET");
        req.flush({
          data: [{
            userId: 0,
            username: "zorg",
            email: "blob@planet.us",
            password: "Hyttepine",
            isAdmin: 0
          }]
        });
      });
  
      it('should reject on http error', () => {
        // Gets HTTP error instead of post, should catch
        service.getUser(2).then(user => {
          fail();
        }).catch(error => {});
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/user/2");
        expect(req.request.method).toBe("GET");
        req.error(new ErrorEvent("400"));
      });
    });

    describe('deleteUser', () => {
      it('should delete user', () => {
        // Deletes user with id = 2
        service.deleteUser(2)
        .then(data => {})
        .catch(error => {
          fail();
        });
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/user/2");
        expect(req.request.method).toBe("DELETE");
        req.flush({
          data: []
        });
      });
  
      it('should reject on http error', () => {
        // Deletes user with id = 2, but should catch HTTP error
        service.deleteUser(2).then(data => {
          fail();
        }).catch(error => {});
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/user/2");
        expect(req.request.method).toBe("DELETE");
        req.error(new ErrorEvent("400"));
      });
    });

    describe('getAllReceivedUserReviews', () => {
      it('should get users received reviews', () => {
        // Gets posts by category and checks values
        service.getAllReceivedUserReviews(2).then(reviews => {
          for (let i = 0; i < reviews.length; i++) {
            expect(reviews[i].getId).toBe(i + 1);
            expect(reviews[i].getUserId).toBe(2);
            expect(reviews[i].getStars).toBe(5);
            expect(reviews[i].getComment).toBe("Test comment");
          }
        }).catch(error => {
          fail();
        });
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/post/review/received/2");
        expect(req.request.method).toBe("GET");
        req.flush({
          data: [{
            id: 1,
            userId: 2,
            stars: 5,
            comment: "Test comment",
          }, {
            id: 2,
            userId: 2,
            stars: 5,
            comment: "Test comment",
          }]
        });
      });
  
      it('should receive empty list on invalid user', () => {
        // Gets invalid user
        service.getAllReceivedUserReviews(420).then(reviews => {
          reviews.length == 0
        }).catch(error => {
          fail();
        });
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/post/review/received/420");
        expect(req.request.method).toBe("GET");
        req.flush({
          data: []
        });
      });
  
      it('should reject on http error', () => {
        // Gets HTTP error, should catch
        service.getAllReceivedUserReviews(2).then(posts => {
          fail();
        }).catch(error => {});
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/post/review/received/2");
        expect(req.request.method).toBe("GET");
        req.error(new ErrorEvent("400"));
      });
    });

    describe('getAllGivenReviews', () => {
      it('should get users given reviews', () => {
        // Gets posts by category and checks values
        service.getAllGivenReviews(2).then(reviews => {
          for (let i = 0; i < reviews.length; i++) {
            expect(reviews[i].getId).toBe(i + 1);
            expect(reviews[i].getUserId).toBe(2);
            expect(reviews[i].getStars).toBe(5);
            expect(reviews[i].getComment).toBe("Test comment");
          }
        }).catch(error => {
          fail();
        });
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/post/review/given/2");
        expect(req.request.method).toBe("GET");
        req.flush({
          data: [{
            id: 1,
            userId: 2,
            stars: 5,
            comment: "Test comment",
          }, {
            id: 2,
            userId: 2,
            stars: 5,
            comment: "Test comment",
          }]
        });
      });
  
      it('should receive empty list on invalid user', () => {
        // Gets invalid user
        service.getAllGivenReviews(420).then(reviews => {
          reviews.length == 0
        }).catch(error => {
          fail();
        });
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/post/review/given/420");
        expect(req.request.method).toBe("GET");
        req.flush({
          data: []
        });
      });
  
      it('should reject on http error', () => {
        // Gets HTTP error instead of post, should catch
        service.getAllGivenReviews(2).then(posts => {
          fail();
        }).catch(error => {});
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/post/review/given/2");
        expect(req.request.method).toBe("GET");
        req.error(new ErrorEvent("400"));
      });
    });
});

