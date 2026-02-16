import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class RegistroPage implements OnInit {
  username = '';
  password = '';
  confirmPassword = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  registrar() {
    if (!this.username || !this.password || !this.confirmPassword) {
      this.mostrarMensaje('Por favor, rellena todos los campos');
      return;
    }

   
    if (this.password !== this.confirmPassword) {
      this.mostrarMensaje('Las contraseñas no coinciden');
      return;
    }

    this.cargando = true;

    this.authService.registro({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.cargando = false;
        this.mostrarMensaje('¡Fichaje completado con éxito!', 'success');
        this.router.navigate(['/tabs/partidos']);
      },
      error: (err) => {
        this.cargando = false;
        this.mostrarMensaje(err.error?.error || 'Error al intentar registrarse');
      }
    });
  }

  async mostrarMensaje(mensaje: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom',
      color: color,
      icon: color === 'success' ? 'checkmark-circle-outline' : 'alert-circle-outline'
    });
    toast.present();
  }
}