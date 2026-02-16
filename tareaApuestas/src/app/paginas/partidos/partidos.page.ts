import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { FutbolService } from '../../servicios/futbol'; 
import { Partido } from '../../modelos/interfaces';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class PartidosPage implements OnInit, OnDestroy {
  partidos: Partido[] = [];
  cargando = true;
  timerSuscripcion!: Subscription;

  constructor(private futbolService: FutbolService) { }

  ngOnInit() {
    this.cargarPartidos();
    this.timerSuscripcion = interval(10000).subscribe(() => {
      this.cargarPartidos(false);
    });
  }

  ngOnDestroy() {
    if (this.timerSuscripcion) {
      this.timerSuscripcion.unsubscribe();
    }
  }

  cargarPartidos(mostrarCarga = true) {
    if (mostrarCarga) this.cargando = true;
    
    this.futbolService.getPartidos().subscribe({
      next: (data) => {
        this.partidos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando la jornada', err);
        this.cargando = false;
      }
    });
  }

 
  recargarManual(event: any) {
    this.futbolService.getPartidos().subscribe({
      next: (data) => {
        this.partidos = data;
        event.target.complete();
      },
      error: () => event.target.complete()
    });
  }

  // Transforma "Real Madrid" en "real-madrid" para buscar su escudo en la carpeta assets
  formatearEscudo(nombreEquipo: string): string {
    if (!nombreEquipo) return 'default';
    return nombreEquipo.toLowerCase().replace(/\s+/g, '-');
  }
}