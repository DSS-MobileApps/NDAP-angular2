# NDAP - Angular 2 Prototype

## Todo list

- Highlight map markers that are selected
- keep results list when navigating to the details view of an organisation
- change styling to match the current implementation
- change the maps shown area to allow all the markers to be visible on a search result refresh

## General Structure of the Application
The main component of the app is `organisations` with `search` and `map` splitting off that.
The `search` component provides a single point of communication between the types of searching and the `organisation` component 
which shows the results (thus `provider-type` is a child of `search`)

## How the Search Component interacts with the Organisations List

Using Observables the following happens:
- The Organisation Service creates an observable called "orgListSource"
- When the Organisation Comp initiates, it subscribes to this observable
- Then the Organisation Comp calls the service method "searchOrgList" with the "all" parameters which in turn calls the http request method "getOrganisations"
- The http result is then pushed back to the "orgListSource"
- Because the Org Comp is subscribed to this, it is notified of the updated list and changes its result from NULL to all
- The Search Comp calls the same method on the Org Service, "SearchOrgList", with different parameters based on what search has been chosen

## Google Maps

I (Daniel H) have imported the google maps package from https://angular-maps.com/ 
and followed the following guide :https://angular-maps.com/docs/getting-started.html

There were no docs on how to add the api key so the last step below is how i added it though it doesn't seem like the best way to do it, 
though it works i would like to do something as follows: https://github.com/SebastianM/angular2-google-maps/issues/177

I modified the following files:
* npm install --save angular2-google-maps
* index.html - added a src import at the bottom
* updated angular-cli-build - User packages configuration.
* updated system-config.ts
* added the provider to main.ts
* imported into map.component.ts
* added APIkey to /node_modules/angular2-google-maps/bundles/angular2-google-maps.js (personal key)
