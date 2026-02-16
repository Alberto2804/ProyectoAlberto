import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  

  datos = {
    username: '',
    email: '',
    password: '',
    avatar: ''
  };

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async registrarse() {
    
    if (!this.datos.username || !this.datos.email || !this.datos.password) {
      this.mostrarToast('Rellena todos los campos, anda');
      return;
    }

    this.datos.avatar = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${this.datos.username}`;

    const loading = await this.loadingCtrl.create({ message: 'Creando cuenta...' });
    await loading.present();

    this.authService.register(this.datos).subscribe({
      next: (res) => {
        loading.dismiss();
        this.router.navigate(['/tabs/partidos']);
      },
      error: (err) => {
        loading.dismiss();
        const msg = err.error?.message || 'Error al crear la cuenta';
        this.mostrarToast(msg);
      }
    });
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }
}