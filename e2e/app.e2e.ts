import { Angular2ServiceFinderPage } from './app.po';

describe('angular2-service-finder App', function() {
  let page: Angular2ServiceFinderPage;

  beforeEach(() => {
    page = new Angular2ServiceFinderPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angular2-service-finder works!');
  });
});
