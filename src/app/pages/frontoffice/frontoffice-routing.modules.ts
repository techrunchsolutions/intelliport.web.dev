import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarterComponent } from './starter/starter.component';

const routes: Routes = [
    {
        path: 'starter',
        component: StarterComponent
    },
    // { path: 'verification', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
    // { path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }