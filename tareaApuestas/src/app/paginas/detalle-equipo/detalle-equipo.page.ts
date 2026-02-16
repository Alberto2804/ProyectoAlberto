import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FutbolService } from '../../servicios/futbol';

@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.page.html',
  styleUrls: ['./detalle-equipo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetalleEquipoPage implements OnInit {
  nombreEquipo: string = '';
  jugadores: any[] = [];

  constructor(private route: ActivatedRoute, private futbolService: FutbolService) { }

  ngOnInit() {
    this.nombreEquipo = this.route.snapshot.paramMap.get('nombre') || '';
    if(this.nombreEquipo) {
      this.futbolService.getJugadores(this.nombreEquipo).subscribe(data => this.jugadores = data);
    }
  }

  obtenerEscudo(): string {
    const nombreLimpio = this.nombreEquipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
    return `assets/escudos/${nombreLimpio}.png`;
  }
}