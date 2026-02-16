import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth';
import { SoccerService } from '../../servicios/futbol';

@Component({
  selector: 'app-panel',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule]
})
export class PartidosComponent implements OnInit, OnDestroy {

  nombreUsuario = 'Usuario';
  avatarUsuario = '';
  cargando = true;
  textoBuscar = '';
  horaActual = '';
  filtroEstado = 'todos';
  partidos: any[] = [];
  clockInterval: any;
  refreshInterval: any;

  escudosPorEquipo: any = {
    'deportivo alaves': 'assets/alaves.png',
    'ud almeria': 'assets/almeria.png',
    'athletic club': 'assets/athletic.png',
    'atletico madrid': 'assets/escudos/atletico.png',
    'real betis': 'assets/betis.png',
    'cadiz cf': 'assets/cadiz.png',
    'celta de vigo': 'assets/celta.png',
    'fc barcelona': 'assets/fc_barcelona.png',
    'getafe cf': 'assets/getafe.png',
    'girona fc': 'assets/egirona.png',
    'granada cf': 'assets/granada.png',
    'ud las palmas': 'assets/las_palmas.png',
    'rcd mallorca': 'assets/mallorca.png',
    'osasuna': 'assets/osasuna.png',
    'rayo vallecano': 'assets/rayo.png',
    'real madrid': 'assets/real_madrid.png',
    'real sociedad': 'assets/real_sociedad.png',
    'sevilla fc': 'assets/sevilla.png',
    'valencia cf': 'assets/valencia.png',
    'villarreal': 'assets/villarreal.png'
  };

  constructor(
    private authService: AuthService,
    private soccerService: SoccerService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  async ngOnInit() {
    this.actualizarHora();
    this.clockInterval = setInterval(() => this.actualizarHora(), 1000);

    await this.cargarUsuario();
    await this.cargarPartidos();

    this.refreshInterval = setInterval(() => {
      this.ngZone.run(() => this.cargarPartidos(true));
    }, 10000);
  }

  ngOnDestroy() {
    clearInterval(this.clockInterval);
    clearInterval(this.refreshInterval);
  }

  get partidosFiltrados() {
    const texto = this.textoBuscar.toLowerCase();
    return this.partidos.filter(p => {
      if (this.filtroEstado !== 'todos' && p.status !== this.filtroEstado) return false;
      if (!texto) return true;
      return p.home.toLowerCase().includes(texto) || p.away.toLowerCase().includes(texto);
    });
  }

  cambiarFiltro(nuevoFiltro: string) {
    this.filtroEstado = nuevoFiltro;
  }

  get jornadaActual() {
    if (!this.partidos.length) return '-';
    return Math.max(...this.partidos.map(p => p.jornada ?? 0));
  }

  traducirEstado(estado: string): string {
    if (estado === 'pending') return 'Próximo';
    if (estado === 'live') return 'En Vivo';
    return 'Final';
  }

  escudoEquipo(nombre: string): string {
    const key = nombre.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .trim();
    return this.escudosPorEquipo[key] ?? 'assets/';
  }

  async irDetalle(idPartido: number) {
    this.router.navigate(['/match-detail', idPartido]);
  }

  async cerrarSesion() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  actualizarHora() {
    this.horaActual = new Date().toLocaleTimeString();
  }

  async cargarUsuario() {
    const user: any = await this.authService.getUser();
    if (user?.username) {
      this.nombreUsuario = user.username;
      this.avatarUsuario = `https://api.dicebear.com/9.x/micah/svg?seed=${user.username}`;
    }
  }

  async cargarPartidos(silencioso = false) {
    if (!silencioso) this.cargando = true;
    try {
      const datos = await this.soccerService.getPartidos();
      this.partidos = [...(datos ?? [])];
    } catch (e) {
      console.error(e);
    }
    this.cargando = false;
  }
}