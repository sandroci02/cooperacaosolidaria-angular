import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaCadastroComponent } from './reserva-cadastro.component';

describe('ReservaCadastroComponent', () => {
  let component: ReservaCadastroComponent;
  let fixture: ComponentFixture<ReservaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
