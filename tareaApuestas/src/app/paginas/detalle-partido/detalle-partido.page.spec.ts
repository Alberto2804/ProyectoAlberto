import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePartidoPage } from './detalle-partido.page';

describe('DetallePartidoPage', () => {
  let component: DetallePartidoPage;
  let fixture: ComponentFixture<DetallePartidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePartidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
