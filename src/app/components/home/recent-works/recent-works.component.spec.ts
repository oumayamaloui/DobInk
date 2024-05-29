import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentWorksComponent } from './recent-works.component';

describe('RecentWorksComponent', () => {
  let component: RecentWorksComponent;
  let fixture: ComponentFixture<RecentWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentWorksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
