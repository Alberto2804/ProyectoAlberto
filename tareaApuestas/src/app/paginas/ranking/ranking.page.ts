import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FutbolService } from '../../servicios/futbol';
import { Usuario } from '../../modelos/interfaces';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class RankingPage implements OnInit {
  usuarios: Usuario[] = [];
  cargando = true;

  constructor(private futbolService: FutbolService) { }

  ngOnInit() {
    this.cargarRanking();
  }

  ionViewWillEnter() {
    this.cargarRanking(false);
  }

  cargarRanking(mostrarCarga = true) {
    if (mostrarCarga) this.cargando = true;

    this.futbolService.getRanking().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando el ranking', err);
        this.cargando = false;
      }
    });
  }

  recargarManual(event: any) {
    this.futbolService.getRanking().subscribe({
      next: (data) => {
        this.usuarios = data;
        event.target.complete();
      },
      error: () => event.target.complete()
    });
  }
}