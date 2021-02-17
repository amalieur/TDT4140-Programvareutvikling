import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostThumbnailComponent } from './post-thumbnail.component';

describe('PostThumbnailComponent', () => {
  let component: PostThumbnailComponent;
  let fixture: ComponentFixture<PostThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
