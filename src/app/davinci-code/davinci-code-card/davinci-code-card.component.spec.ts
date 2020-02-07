import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DavinciCodeCardComponent } from './davinci-code-card.component';

describe('DavinciCodeCardComponent', () => {
  let component: DavinciCodeCardComponent;
  let fixture: ComponentFixture<DavinciCodeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DavinciCodeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DavinciCodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
