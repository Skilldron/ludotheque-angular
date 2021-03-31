import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatjeuComponent } from './achatjeu.component';

describe('AchatjeuComponent', () => {
  let component: AchatjeuComponent;
  let fixture: ComponentFixture<AchatjeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchatjeuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatjeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
