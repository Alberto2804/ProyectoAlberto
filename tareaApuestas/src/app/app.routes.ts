import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./paginas/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./paginas/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./paginas/tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'partidos',
    loadComponent: () => import('./paginas/partidos/partidos.page').then( m => m.PartidosPage)
  },
  {
    path: 'clasificacion',
    loadComponent: () => import('./paginas/clasificacion/clasificacion.page').then( m => m.ClasificacionPage)
  },
  {
    path: 'ranking',
    loadComponent: () => import('./paginas/ranking/ranking.page').then( m => m.RankingPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./paginas/perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'detalle-partido',
    loadComponent: () => import('./paginas/detalle-partido/detalle-partido.page').then( m => m.DetallePartidoPage)
  },
  {
    path: 'detalle-equipo',
    loadComponent: () => import('./paginas/detalle-equipo/detalle-equipo.page').then( m => m.DetalleEquipoPage)
  },
];
