import { provideRouter, RouterConfig }  from '@angular/router';

import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationComponent } from './organisations/organisation/organisation.component';

import { SearchAreaComponent, SearchResultsComponent } from './search/index';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: RouterConfig = [
  {
    path: 'organisations/:id',
    component: SearchResultsComponent //OrganisationsComponent
  },
  {
    path: 'organisations',
    component: SearchResultsComponent // OrganisationsComponent
  },

  {
    path: 'organisation/:id',
    component: OrganisationComponent
  },

  {
    path: 'search',
    component: SearchAreaComponent
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
