import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoveredPictureWidgetComponent } from './hovered-picture-widget.component';

describe('HoveredPictureWidgetComponent', () => {
  let component: HoveredPictureWidgetComponent;
  let fixture: ComponentFixture<HoveredPictureWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoveredPictureWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoveredPictureWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
