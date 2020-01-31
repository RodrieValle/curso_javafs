import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './pages/producto/producto.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { VentaComponent } from './pages/venta/venta.component';


const routes: Routes = [
  { path: 'producto', component: ProductoComponent },
  { path: 'persona', component: PersonaComponent },
  { path: 'venta', component: VentaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
