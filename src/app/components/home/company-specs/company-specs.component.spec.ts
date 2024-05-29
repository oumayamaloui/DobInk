import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySpecsComponent } from './company-specs.component';

describe('CompanySpecsComponent', () => {
  let component: CompanySpecsComponent;
  let fixture: ComponentFixture<CompanySpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanySpecsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanySpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
