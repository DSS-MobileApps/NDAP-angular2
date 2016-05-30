# Ndap-Angular2

## How the Search Component interacts with the Organisations List

Using Observables the following happens:
- The Organisation Service creates an observable called "orgListSource"
- When the Organisation Comp initiates, it subscribes to this observable
- Then the Organisation Comp calls the service method "searchOrgList" with the "all" parameters which in turn calls the http request method "getOrganisations"
- The http result is then pushed back to the "orgListSource"
- Because the Org Comp is subscribed to this, it is notified of the updated list and changes its result from NULL to all
- The Search Comp calls the same method on the Org Service, "SearchOrgList", with different parameters based on what search has been chosen