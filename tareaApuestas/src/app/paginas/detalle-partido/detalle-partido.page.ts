import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';

import { FutbolService } from '../../servicios/futbol'; 
import { ApuestasService } from '../../servicios/apuestas';
import { AuthService } from '../../servicios/auth';
import { Partido, Usuario } from '../../modelos/interfaces';

@Component({
  selector: 'app-detalle-partido',
  templateUrl: './detalle-partido.page.html',
  styleUrls: ['./detalle-partido.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetallePartidoPage implements OnInit, OnDestroy {
  matchId!: number;
  partido: Partido | undefined;
  usuarioActual: Usuario | null = null;
  cargando = true;

  apuestaLocal: number | null = null;
  apuestaVisitante: number | null = null;
  enviandoApuesta = false;

  refreshTimer!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private futbolService: FutbolService,
    private apuestasService: ApuestasService,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.matchId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.authService.usuario$.subscribe(user => {
      this.usuarioActual = user;
    });

    this.cargarDatos(true);

    this.refreshTimer = interval(5000).subscribe(() => {
      this.cargarDatos(false);
    });
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      this.refreshTimer.unsubscribe();
    }
  }

  cargarDatos(mostrarCarga: boolean) {
    if (mostrarCarga) this.cargando = true;

    this.futbolService.getPartidos().subscribe(partidos => {
      this.partido = partidos.find(p => p.id === this.matchId);
      if (mostrarCarga) this.cargando = false;
    });
  }

  enviarApuesta() {
    if (this.apuestaLocal === null || this.apuestaVisitante === null) {
      this.mostrarToast('Introduce un resultado válido', 'warning');
      return;
    }

    if (!this.usuarioActual) return;

    this.enviandoApuesta = true;
    const apuestaData = {
      userId: this.usuarioActual.id,
      matchId: this.matchId,
      homeScore: this.apuestaLocal,
      awayScore: this.apuestaVisitante
    };

    this.apuestasService.realizarApuesta(apuestaData).subscribe({
      next: () => {
        this.enviandoApuesta = false;
        this.mostrarToast('¡Apuesta registrada con éxito!', 'success');
        this.apuestaLocal = null;
        this.apuestaVisitante = null;
      },
      error: (err) => {
        this.enviandoApuesta = false;
        this.mostrarToast(err.error?.error || 'Error al enviar apuesta', 'danger');
      }
    });
  }

  formatearEscudo(nombreEquipo: string): string {
    if (!nombreEquipo) return 'default';
    return nombreEquipo.toLowerCase().replace(/\s+/g, '-');
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}