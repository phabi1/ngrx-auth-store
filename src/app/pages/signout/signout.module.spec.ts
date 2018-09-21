import { SignoutModule } from './signout.module';

describe('SignoutModule', () => {
  let signoutModule: SignoutModule;

  beforeEach(() => {
    signoutModule = new SignoutModule();
  });

  it('should create an instance', () => {
    expect(signoutModule).toBeTruthy();
  });
});
