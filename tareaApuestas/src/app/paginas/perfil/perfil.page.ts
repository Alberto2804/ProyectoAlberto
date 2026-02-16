import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PerfilPage implements OnInit {
  perfil: any = null;
  avatarSeed: string = 'bets-soccer';
  avatarUrl: string = '';
  estadisticas = { acertadas: 0, falladas: 0 };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { this.cargarPerfil(); }
  ionViewWillEnter() { this.cargarPerfil(); }

  cargarPerfil() {
    this.authService.obtenerPerfil().subscribe({
      next: (data) => {
        this.perfil = data;
        this.avatarSeed = data.username;
        this.actualizarAvatar();
        this.calcularEstadisticas();
      },
      error: () => this.cerrarSesion()
    });
  }


  actualizarAvatar() {
    this.avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.avatarSeed}&backgroundColor=0d1b11`;
  }

  cambiarAvatar() {
    this.avatarSeed = Math.random().toString(36).substring(7);
    this.actualizarAvatar();
  }

  calcularEstadisticas() {
    if (!this.perfil.bets) return;
    this.estadisticas.acertadas = this.perfil.bets.filter((b: any) => b.pointsEarned > 0).length;
    this.estadisticas.falladas = this.perfil.bets.filter((b: any) => b.pointsEarned === 0).length;
  }

  async cerrarSesion() {
    await this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}