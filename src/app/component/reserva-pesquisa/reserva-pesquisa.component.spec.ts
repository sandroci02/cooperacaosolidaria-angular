import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaPesquisaComponent } from './reserva-pesquisa.component';

describe('ReservaPesquisaComponent', () => {
  let component: ReservaPesquisaComponent;
  let fixture: ComponentFixture<ReservaPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
