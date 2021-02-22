import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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
  
    describe('addUser', () => {
      it('should add an user', () => {
        const user = new User({
            userId: 1,
            username: "zorg",
            email: "blob@planet.us",
            password: "Hyttepine",
            create_time: 1613552549000,
        });
  
        // Adds user
        service.addUser(user)
        .then(post => {})
        .catch(error => {
          fail();
        });
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/user/");
        expect(req.request.method).toBe("POST");
        expect(req.request.body).toEqual(user.serialize());
        req.flush({
          data: [{
            status: "success"
          }]
        });
      });
  
      it('should reject on http error', () => {
        const user = new User({
            userId: 1,
            username: "zorg",
            email: "blob@planet.us",
            password: "Hyttepine",
            create_time: 1613552549000,
        });
  
        // Adds user, gets HTTP error, should catch
        service.addUser(user).then(user => {
          fail();
        }).catch(error => {});
  
        // Mocks and checks HTTP request
        const req = httpMock.expectOne("api/user/");
        expect(req.request.method).toBe("POST");
        expect(req.request.body).toEqual(user.serialize());
        req.error(new ErrorEvent("400"));
      });
    });
  
});

