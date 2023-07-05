import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // {
    //     path: 'starter',
    //     component: StarterComponent
    // },
    // {
    //     path: 'profile',
    //     component: ProfileComponent
    // },
    // {
    //     path: 'invoice',
    //     component: InvoiceComponent
    // },
    // {
    //     path: 'timeline',
    //     component: TimelineComponent
    // },
    // {
    //     path: 'pricing',
    //     component: PricingComponent
    // }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UtilityRoutingModule { }