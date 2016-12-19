# NdapAngularMigrate

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



## IIS Setup

IIS 7 does not include SVG Mime type by default. to add see [Adding IIS7 Mime type Setting](http://www.iis.net/learn/manage/managing-your-configuration-settings/adding-ie-9-mime-types-to-iis)
Add new Mime type in IIS
File Name extension     .svg
MIME type	            image/svg+xml


## Build Commands for environments

### DEVINT
[Dev website](https://dev-disabilityadvocacyfinder.development.local/disability/ndap)
from CLI, run `ng build -e devint -prod -bh /disability/ndap/`
Stop LocatorAngular website on DEAWDWEB003 IIS
Copy dist files to \\deawdweb003.development.local\LocatorAngular
Start LocatorAngular website

### ST
[ST website](https://st-disabilityadvocacyfinder.development.local/disability/ndap)
from CLI, run `ng build -e st -prod -bh /disability/ndap/`
Stop LocatorAngular website on DEINFWFE111 IIS
Copy dist files to \\deinfwfe111.development.local\LocatorAngular
Start LocatorAngular website

