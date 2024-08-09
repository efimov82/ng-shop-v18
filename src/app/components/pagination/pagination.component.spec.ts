import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';

import { MockActivatedRoute } from '../../pages/home/home.component.spec';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let routeMock: MockActivatedRoute;
  let initialMockParams: Params;

  beforeEach(async () => {
    initialMockParams = { page: 1 };
    routeMock = new MockActivatedRoute(initialMockParams);

    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [{ provide: ActivatedRoute, useValue: routeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('countPages', 2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
