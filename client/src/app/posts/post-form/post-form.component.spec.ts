import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PostFormComponent } from './post-form.component';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form', () => {
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
    component.publishPost();
    expect(component.statusMessage).toBe("Tittelen kan ikke være tom");
  }));

  it('should route after publishing post', () => {
    component.title = "Title";
    component.description = "Description";
    component.price = 50;
    component.categoryid = 2;
    component.publishPost();
    
    expect(router.url).toBe('/');
  });
});
