import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BestSellingsComponent} from './best-sellings.component';

describe('BestSellingsComponent', () => {
  let component: BestSellingsComponent;
  let fixture: ComponentFixture<BestSellingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSellingsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BestSellingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
