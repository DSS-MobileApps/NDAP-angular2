/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'markerclustererplus': 'vendor/markerclustererplus',
};

/** User packages configuration. */
const packages: any = {
  'angular2-google-maps': {
    defaultExtension: 'js',
  },
  'markerclustererplus': {
    defaultExtension: 'js',
    main: 'dist/markerclusterer.min.js'
  },
  'angular2-locker': {
    defaultExtension: 'js',
    main: 'dist/locker.js'
  },


};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/http',

  // Thirdparty barrels.
  'rxjs',
  'markerclustererplus',
  // 'angular2-locker',

  // App specific barrels.
  'app',
  'app/shared',
  'app/search/search-location',
  'app/search/search-keyword',
  'app/search/search-state',
  'app/search/search-summary',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'markerclustererplus': 'vendor/markerclustererplus',
    'angular2-locker': 'vendor/angular2-locker',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
