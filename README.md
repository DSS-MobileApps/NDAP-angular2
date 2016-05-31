# Ndap-Angular2

## How the Search Component interacts with the Organisations List

Using Observables the following happens:
- The Organisation Service creates an observable called "orgListSource"
- When the Organisation Comp initiates, it subscribes to this observable
- Then the Organisation Comp calls the service method "searchOrgList" with the "all" parameters which in turn calls the http request method "getOrganisations"
- The http result is then pushed back to the "orgListSource"
- Because the Org Comp is subscribed to this, it is notified of the updated list and changes its result from NULL to all
- The Search Comp calls the same method on the Org Service, "SearchOrgList", with different parameters based on what search has been chosen

## Todo list

- Add google maps with results on it
- keep results list when navigating to the details view of an organisation
- change styling to match the current implementation

## Google Maps

I (Daniel H) have imported the google maps package from https://angular-maps.com/ 
and followed the following guide :https://angular-maps.com/docs/getting-started.html

There were no docs on how to add the api key so the last step below is how i added it though it doesn't seem like the correct way to do it, though it works

I modified the following files:
- npm install --save angular2-google-maps
- index.html - added a src import at the bottom
- updated angular-cli-build - User packages configuration.
- updated system-config.ts
- added provider to main.ts
- added to the map.component.ts
- added APIkey to /node_modules/angular2-google-maps/bundles/angular2-google-maps.js (personal key)