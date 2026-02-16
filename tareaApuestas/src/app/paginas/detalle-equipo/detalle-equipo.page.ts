import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FutbolService } from '../../servicios/futbol';
import { Equipo, Jugador } from '../../modelos/interfaces';

@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.page.html',
  styleUrls: ['./detalle-equipo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetalleEquipoPage implements OnInit {
  nombreEquipo = '';
  equipo: Equipo | undefined;
  jugadores: Jugador[] = [];
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private futbolService: FutbolService
  ) { }

  ngOnInit() {
    this.nombreEquipo = this.route.snapshot.paramMap.get('nombre') || '';
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    
    this.futbolService.getClasificacion().subscribe({
      next: (clasificacion) => {
        this.equipo = clasificacion.find(e => e.name === this.nombreEquipo);

        
        if (this.equipo) {
          this.futbolService.getJugadores(this.nombreEquipo).subscribe(jugadores => {
            this.jugadores = jugadores.sort((a, b) => b.goals - a.goals);
            this.cargando = false;
          });
        } else {
          this.cargando = false;
        }
      },
      error: () => this.cargando = false
    });
  }

  formatearEscudo(nombre: string): string {
    if (!nombre) return 'default';
    return nombre.toLowerCase().replace(/\s+/g, '-');
  }
}