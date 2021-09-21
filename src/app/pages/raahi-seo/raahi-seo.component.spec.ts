import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaahiSeoComponent } from './raahi-seo.component';

describe('RaahiSeoComponent', () => {
  let component: RaahiSeoComponent;
  let fixture: ComponentFixture<RaahiSeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaahiSeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaahiSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
