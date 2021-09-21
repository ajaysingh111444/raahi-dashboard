import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDashboadComponent } from './campaign-dashboad.component';

describe('CampaignDashboadComponent', () => {
  let component: CampaignDashboadComponent;
  let fixture: ComponentFixture<CampaignDashboadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDashboadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDashboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
