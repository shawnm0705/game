import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DavinciCodeComponent } from './davinci-code.component';

describe('DavinciCodeComponent', () => {
  let component: DavinciCodeComponent;
  let fixture: ComponentFixture<DavinciCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DavinciCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DavinciCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
