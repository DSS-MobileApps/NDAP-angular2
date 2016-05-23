export class Angular2ServiceFinderPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular2-service-finder-app h1')).getText();
  }
}
