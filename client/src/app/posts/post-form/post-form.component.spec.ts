import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should serialize Post', () => {
    expect(component.serializedPost == "").toBeFalse();

    try{
      const obj = JSON.parse(component.serializedPost);
    }catch{
      fail("Could not serialize");
    }
  })

  it('should deserialize Post', () => {
    expect(component.deserializedPost.getUser).toEqual("Admin");
  })
});
