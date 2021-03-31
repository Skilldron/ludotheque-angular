import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutjeuComponent } from './ajoutjeu.component';

describe('AjoutjeuComponent', () => {
  let component: AjoutjeuComponent;
  let fixture: ComponentFixture<AjoutjeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutjeuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutjeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
