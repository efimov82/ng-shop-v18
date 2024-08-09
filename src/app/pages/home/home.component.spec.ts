import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  convertToParamMap,
  Data,
  ParamMap,
  Params,
  UrlSegment,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HomeComponent } from './home.component';

export class MockActivatedRouteSnapshot implements ActivatedRouteSnapshot {
  private innerTestParams: Params = [];

  constructor(params?: Params) {
    if (params) {
      this.testParams = params;
    } else {
      this.testParams = [] as Params;
    }
  }

  private get testParams() {
    return this.innerTestParams;
  }

  private set testParams(params: Params) {
    this.innerTestParams = params;
  }

  get paramMap() {
    return convertToParamMap(this.testParams);
  }

  get queryParamMap() {
    return this.paramMap;
  }

  get url() {
    return [];
  }

  get title() {
    return '';
  }

  get fragment() {
    return null;
  }

  get data() {
    return [];
  }

  get outlet() {
    return '';
  }

  get params() {
    return this.innerTestParams;
  }

  get queryParams() {
    return this.innerTestParams;
  }

  get component() {
    return null;
  }

  get routeConfig() {
    return null;
  }

  get root() {
    return new ActivatedRouteSnapshot();
  }

  get parent() {
    return null;
  }

  get firstChild() {
    return null;
  }

  get children() {
    return [];
  }

  get pathFromRoot() {
    return [];
  }
}

export class MockActivatedRoute implements ActivatedRoute {
  private innerTestParams?: Params | [];
  private subject: BehaviorSubject<Params> = new BehaviorSubject(
    this.testParams
  );
  private paramMapSubject: BehaviorSubject<ParamMap> = new BehaviorSubject(
    convertToParamMap(this.testParams)
  );

  constructor(params?: Params) {
    if (params) {
      this.testParams = params;
    } else {
      this.testParams = [];
    }
  }

  private get testParams() {
    return this.innerTestParams || [];
  }

  private set testParams(params: Params) {
    this.innerTestParams = params;
    this.subject.next(params);
    this.paramMapSubject.next(convertToParamMap(params));
  }

  get snapshot() {
    return new MockActivatedRouteSnapshot(this.testParams);
  }

  get params() {
    return this.subject.asObservable();
  }

  get queryParams() {
    return this.params;
  }

  get title() {
    return new Observable<string | undefined>();
  }

  get paramMap() {
    return this.paramMapSubject.asObservable();
  }

  get queryParamMap() {
    return this.paramMap;
  }

  get url() {
    return new Observable<UrlSegment[]>();
  }

  get fragment() {
    return new Observable<string | null>();
  }

  get data() {
    return new Observable<Data>();
  }

  get outlet() {
    return '';
  }

  get component() {
    return null;
  }

  get routeConfig() {
    return null;
  }

  get root() {
    return new ActivatedRoute();
  }

  get parent() {
    return null;
  }

  get firstChild() {
    return null;
  }

  get children() {
    return [];
  }

  get pathFromRoot() {
    return [];
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routeMock: MockActivatedRoute;
  let initialMockParams: Params;

  beforeEach(async () => {
    initialMockParams = { page: 1 };
    routeMock = new MockActivatedRoute(initialMockParams);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
