import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SigninEffects } from './signin.effects';

describe('SigninEffects', () => {
  let actions$: Observable<any>;
  let effects: SigninEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SigninEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SigninEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
