import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FutbolService } from '../../servicios/futbol';
import { Clasificacion } from '../../modelos/interfaces';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.page.html',
  styleUrls: ['./clasificacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ClasificacionPage implements OnInit {
  clasificacion: Clasificacion[] = [];

  constructor(private futbolService: FutbolService, private router: Router) { }

  ngOnInit() {
    this.cargarClasificacion();
  }

  cargarClasificacion() {
    this.futbolService.getClasificacion().subscribe(data => this.clasificacion = data);
  }

  obtenerEscudo(nombre: string): string {
    const nombreLimpio = nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
    return `assets/escudos/${nombreLimpio}.png`;
  }

  verDetalleEquipo(nombreEquipo: string) {
    this.router.navigate(['/detalle-equipo', nombreEquipo]);
  }
}