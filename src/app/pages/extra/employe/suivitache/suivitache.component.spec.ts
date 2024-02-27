import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivitacheComponent } from './suivitache.component';

describe('SuivitacheComponent', () => {
  let component: SuivitacheComponent;
  let fixture: ComponentFixture<SuivitacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuivitacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuivitacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
