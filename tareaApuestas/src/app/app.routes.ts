import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./paginas/login/login.page').then(m => m.LoginPage) },
  { path: 'registro', loadComponent: () => import('./paginas/registro/registro.page').then(m => m.RegistroPage) },
  {
    path: 'app',
    loadComponent: () => import('./paginas/tabs/tabs.page').then(m => m.TabsPage),
    canActivate: [AuthGuard],
    children: [
      { path: 'partidos', loadComponent: () => import('./paginas/partidos/partidos.page').then(m => m.PartidosPage) },
      { path: 'liga', loadComponent: () => import('./paginas/clasificacion/clasificacion.page').then(m => m.ClasificacionPage) },
      { path: 'ranking', loadComponent: () => import('./paginas/ranking/ranking.page').then(m => m.RankingPage) },
      { path: 'perfil', loadComponent: () => import('./paginas/perfil/perfil.page').then(m => m.PerfilPage) },
      { path: '', redirectTo: 'partidos', pathMatch: 'full' }
    ]
  },
  { path: 'detalle-partido/:id', loadComponent: () => import('./paginas/detalle-partido/detalle-partido.page').then(m => m.DetallePartidoPage), canActivate: [authGuard] },
  { path: 'detalle-equipo/:nombre', loadComponent: () => import('./paginas/detalle-equipo/detalle-equipo.page').then(m => m.DetalleEquipoPage), canActivate: [authGuard] },
  {
    path: 'historial',
    loadComponent: () => import('./historial/historial.page').then( m => m.HistorialPage)
  }
];