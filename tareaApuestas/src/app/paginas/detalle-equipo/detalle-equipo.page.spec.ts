import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleEquipoPage } from './detalle-equipo.page';

describe('DetalleEquipoPage', () => {
  let component: DetalleEquipoPage;
  let fixture: ComponentFixture<DetalleEquipoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEquipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
