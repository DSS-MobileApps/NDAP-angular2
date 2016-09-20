import { NdapAngularMigratePage } from './app.po';

describe('ndap-angular-migrate App', function() {
  let page: NdapAngularMigratePage;

  beforeEach(() => {
    page = new NdapAngularMigratePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
