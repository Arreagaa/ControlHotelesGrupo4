import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardInicioComponent } from './components/dashboard-inicio/dashboard-inicio.component';

import { HotelComponent } from './components/hotel/hotel.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';

import { UsuarioGuard } from './services/usuario.guard';
import { AdministradorGuard } from './services/administrador.guard';

//aqui se importan los componentes
/*const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Inicio', component: InicioComponent},
  {path: 'Registro', component: RegistroComponent},
  {path: 'Dashboard/:idEmpresa', component: DashboardComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'Sucursales', component: SucursalesComponent},
  {path: 'Empresa', component: EmpresaComponent},
  {path:'productoE', component:ProductosEComponent},
  {path:'verEmpresa/:idEmpresa', component:VerEmpresaComponent},
  {path:'productoS/:idSucursal',component: ProductosSComponent},
  {path: 'DashboardInicio', component: DashboardInicioComponent},
];*/

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Registro', component: RegistroComponent},
  {path: 'DashboardInicio', component: DashboardInicioComponent},
  {path: 'Inicio', component: InicioComponent},
  {path: 'PerfilCliente', component: PerfilClienteComponent},

  {
    path: 'Usuario', canActivate: [UsuarioGuard], children:[
      {path: 'Inicio', component: InicioComponent},
      {path: 'Dashboard', component: DashboardComponent},
      {path:'Habitaciones', component: HabitacionesComponent},
      {path:'Eventos/:idSucursal',component: EventosComponent}
    ]
  },
  {
    path: 'Admin', canActivate: [AdministradorGuard], children:[
      {path: 'Inicio', component: InicioComponent},

      {path: 'Hotel', component: HotelComponent},

      {path: 'Dashboard/:idEmpresa', component: DashboardComponent},

    ]
  },
  { path: "**", component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
