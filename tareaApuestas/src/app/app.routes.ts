import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.page';
import { RegisterComponent } from './paginas/registro/registro.page';
import { PartidosComponent } from './paginas/partidos/partidos.page';
import { ClasificacionComponent } from './paginas/clasificacion/clasificacion.page';
import { MatchDetailComponent } from './paginas/detalle-partido/detalle-partido.page';
import { TeamDetailComponent } from './paginas/detalle-equipo/detalle-equipo.page';
import { RankingComponent } from './paginas/ranking/ranking.page';
import { HistorialComponent } from './historial/historial.page';
import { PerfilComponent } from './paginas/perfil/perfil.page';
import { AuthGuard } from './guards/auth-guard';


export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'panel', component: PartidosComponent,canActivate: [AuthGuard]},
    {path: 'match-detail/:id', component: MatchDetailComponent,canActivate: [AuthGuard]},
    {path: 'team-detail/:id', component: TeamDetailComponent,canActivate: [AuthGuard]},
    {path: 'liga', component: ClasificacionComponent,canActivate: [AuthGuard]},
    {path: 'ranking', component: RankingComponent,canActivate: [AuthGuard]},
    {path: 'historial', component: HistorialComponent,canActivate: [AuthGuard]},
    {path: 'perfil', component: PerfilComponent,canActivate: [AuthGuard]},
    {path: '**', component: LoginComponent},
];