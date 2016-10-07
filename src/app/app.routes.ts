import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationComponent } from './organisations/organisation/organisation.component';

import { SearchAreaComponent, SearchResultsComponent } from './search/index';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  // {
  //   path: 'organisations/:id',
  //   component: SearchResultsComponent //OrganisationsComponent
  // },
  {
    path: 'organisations',
    component: SearchResultsComponent, // OrganisationsComponent
    // loadChildren: 'app/search/search-results/search-results.component#SearchResultsComponent' //crisis-center.module#CrisisCenterModule'
  },

  {
    path: 'organisation/:id',
    component: OrganisationComponent
    // loadChildren: 'app/organisations/organisation/organisation.component#OrganisationComponent'
},

  {
    path: 'search',
    component: SearchAreaComponent
    // loadChildren: 'app/search/search-area.component#SearchAreaComponent'
  },

  {
    path: 'about',
    component: AboutComponent
    // loadChildren: 'app/about/about.component#AboutComponent'
  },

  {
    path: 'contact',
    component: ContactComponent
    // loadChildren: 'app/contact/contact.component#ContactComponent'
  },


  // Root Url
  {
  path: '',
  // component: OrganisationsComponent
  component: SearchAreaComponent
},
// {
//   path: '',
//   redirectTo: '/search',
//   pathMatch: 'full'
// },

// Catch all for any undefined URL
  {
  path: '**',
  component: OrganisationsComponent
  }
];

// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
