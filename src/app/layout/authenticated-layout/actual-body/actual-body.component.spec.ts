import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualBodyComponent } from './actual-body.component';

describe('ActualBodyComponent', () => {
  let component: ActualBodyComponent;
  let fixture: ComponentFixture<ActualBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
