import { provideRouter, RouterConfig }  from '@angular/router';

import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationDetailComponent } from './organisations/organisation-detail.component';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: RouterConfig = [
  {
    path: 'organisations/:id',
    component: OrganisationsComponent
  },
  {
    path: 'organisations',
    component: OrganisationsComponent
  },

  {
    path: 'organisation/:id',
    component: OrganisationDetailComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  {
    path: 'contact',
    component: ContactComponent
  },


  // Root Url
  {
  path: '',
  component: OrganisationsComponent
},

// Catch all for any undefined URL
  {
  path: '*',
  component: OrganisationsComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
