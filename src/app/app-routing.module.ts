import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
   {path: '', loadChildren:() => import('./login/login.module').then(n=>n.LoginPageModule)},
  { path: 'p1boardcreation', loadChildren: './p1boardcreation/p1boardcreation.module#P1boardcreationPageModule' },
  { path: 'p2boardcreation', loadChildren: './p2boardcreation/p2boardcreation.module#P2boardcreationPageModule' },
  { path: 'p1gameboard', loadChildren: './p1gameboard/p1gameboard.module#P1gameboardPageModule' },
  { path: 'p2gameboard', loadChildren: './p2gameboard/p2gameboard.module#P2gameboardPageModule' },
  { path: 'waitingplayerslist', loadChildren: './waitingplayerslist/waitingplayerslist.module#WaitingplayerslistPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
