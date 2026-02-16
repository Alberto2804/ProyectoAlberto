import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FutbolService } from '../../servicios/futbol';
import { AuthService } from '../../servicios/auth';
import { Partido, Usuario } from '../../modelos/interfaces';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PartidosPage implements OnInit, OnDestroy {
  partidos: Partido[] = [];
  usuario: Usuario | null = null;
  intervaloRecarga: any;

  constructor(
    private futbolService: FutbolService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDatos();
    
   
    this.intervaloRecarga = setInterval(() => {
      this.cargarPartidos();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.intervaloRecarga) {
      clearInterval(this.intervaloRecarga);
    }
  }

  cargarDatos() {
    this.authService.obtenerPerfil().subscribe({
      next: (perfil) => this.usuario = perfil,
      error: (err) => console.error('Error cargando perfil', err)
    });

    this.cargarPartidos();
  }

  cargarPartidos() {
    this.futbolService.getPartidos().subscribe({
      next: (data) => this.partidos = data,
      error: (err) => console.error('Error cargando partidos', err)
    });
  }

  obtenerEscudo(nombreEquipo: string): string {
    if (!nombreEquipo) return 'assets/escudos/default.png';
    const nombreLimpio = nombreEquipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
    return `assets/escudos/${nombreLimpio}.png`;
  }

  irDetallePartido(id: number) {
    this.router.navigate(['/detalle-partido', id]);
  }
}