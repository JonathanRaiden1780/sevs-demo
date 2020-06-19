import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsCComponent } from './reports-c.component';

describe('ReportsCComponent', () => {
  let component: ReportsCComponent;
  let fixture: ComponentFixture<ReportsCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
