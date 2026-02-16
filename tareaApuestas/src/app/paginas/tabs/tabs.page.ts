import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, RouterLinkActive]
})
export class TabsPage {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async cerrarSesion() {
    await this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}