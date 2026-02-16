import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FutbolService } from '../../servicios/futbol';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class RankingPage implements OnInit {
  usuarios: any[] = [];

  constructor(private futbolService: FutbolService) { }

  ngOnInit() {
    this.cargarRanking();
  }

  ionViewWillEnter() {
    this.cargarRanking();
  }

  cargarRanking() {
    this.futbolService.getRanking().subscribe(data => this.usuarios = data);
  }
}