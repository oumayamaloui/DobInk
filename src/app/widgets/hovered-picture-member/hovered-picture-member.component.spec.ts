import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoveredPictureMemberComponent } from './hovered-picture-member.component';

describe('HoveredPictureMemberComponent', () => {
  let component: HoveredPictureMemberComponent;
  let fixture: ComponentFixture<HoveredPictureMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoveredPictureMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoveredPictureMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
