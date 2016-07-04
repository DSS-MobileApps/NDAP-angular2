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

  // App specific barrels.
  'app',
  'app/shared',
  'app/search-location',
  'app/search-keyword',
  'app/search-state',
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
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
