import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { FutbolService } from '../../servicios/futbol';
import { Clasificacion } from '../../modelos/interfaces';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.page.html',
  styleUrls: ['./clasificacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class ClasificacionPage implements OnInit {
  clasificacion: Clasificacion[] = [];
  cargando = true;

  constructor(private futbolService: FutbolService) { }

  ngOnInit() {
    this.cargarClasificacion();
  }

  ionViewWillEnter() {
    this.cargarClasificacion(false);
  }

  cargarClasificacion(mostrarCarga = true) {
    if (mostrarCarga) this.cargando = true;

    this.futbolService.getClasificacion().subscribe({
      next: (data) => {
        this.clasificacion = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando la clasificación', err);
        this.cargando = false;
      }
    });
  }

  recargarManual(event: any) {
    this.futbolService.getClasificacion().subscribe({
      next: (data) => {
        this.clasificacion = data;
        event.target.complete();
      },
      error: () => event.target.complete()
    });
  }

  formatearEscudo(nombreEquipo: string): string {
    if (!nombreEquipo) return 'default';
    return nombreEquipo.toLowerCase().replace(/\s+/g, '-');
  }
}