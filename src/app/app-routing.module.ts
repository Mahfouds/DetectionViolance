import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/AuthGuard';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'messagerie', component:MessagerieComponent, canActivate:[AuthGuard]},
  {path:'register', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
