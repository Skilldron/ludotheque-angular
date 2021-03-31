import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutcommentairesComponent } from './ajoutcommentaires.component';

describe('AjoutcommentairesComponent', () => {
  let component: AjoutcommentairesComponent;
  let fixture: ComponentFixture<AjoutcommentairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutcommentairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutcommentairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
