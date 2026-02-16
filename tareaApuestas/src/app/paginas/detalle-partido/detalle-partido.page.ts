import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // MUY IMPORTANTE para usar ngModel en los sliders
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SoccerService } from '../../servicios/futbol';
import { BetService } from '../../servicios/apuestas';
import { Partido } from '../../modelos/interfaces';

@Component({
  selector: 'app-detalle-partido',
  templateUrl: './detalle-partido.page.html',
  styleUrls: ['./detalle-partido.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetallePartidoPage implements OnInit, OnDestroy {
  idPartido!: number;
  partido: Partido | null = null;
  intervaloRecarga: any;

  // Variables para los deslizadores de apuestas
  golesLocal: number = 0;
  golesVisitante: number = 0;
  enviandoApuesta: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private futbolService: SoccerService,
    private apuestasService: BetService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.idPartido = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarPartido();

    this.intervaloRecarga = setInterval(() => {
      this.cargarPartido();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.intervaloRecarga) {
      clearInterval(this.intervaloRecarga);
    }
  }

  cargarPartido() {
    this.Service.getPartidos().subscribe({
      next: (partidos) => {
        const encontrado = partidos.find(p => p.id === this.idPartido);
        if (encontrado) {
          this.partido = encontrado;
        }
      },
      error: (err) => console.error('Error cargando partido', err)
    });
  }

  enviarApuesta() {
    if (!this.partido) return;

    this.enviandoApuesta = true;
    const datosApuesta = {
      matchId: this.partido.id,
      homeScore: this.golesLocal,
      awayScore: this.golesVisitante
    };

    this.apuestasService.realizarApuesta(datosApuesta).subscribe({
      next: () => {
        this.mostrarMensaje('¡Apuesta registrada con éxito!', 'success');
        this.enviandoApuesta = false;
      },
      error: (err) => {
        this.mostrarMensaje(err.error?.error || 'Error al realizar la apuesta', 'danger');
        this.enviandoApuesta = false;
      }
    });
  }

  async mostrarMensaje(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  obtenerEscudo(nombreEquipo: string): string {
    if (!nombreEquipo) return 'assets/escudos/default.png';
    const nombreLimpio = nombreEquipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
    return `assets/escudos/${nombreLimpio}.png`;
  }
}