import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, zip, combineLatest } from 'rxjs';
import { map, tap, startWith, combineAll } from 'rxjs/operators';
import { Signin } from '../../store/actions/signin.actions';
import { getProcessing } from '../../store/selectors/signin.selectors';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;

  public disable$: Observable<boolean>;
  public processing$: Observable<boolean>;

  constructor(
    formBuilder: FormBuilder,
    private store: Store<any>,
  ) {
    this.signinForm = formBuilder.group({
      email: [, Validators.required],
      password: [, Validators.required]
    });

    this.processing$ = this.store.pipe(
      select(getProcessing),
      map(processing => !processing)
    );

    this.disable$ = combineLatest(
      this.signinForm.valueChanges.pipe(
        startWith(() => true),
        map(() => this.signinForm.invalid),
      ),
      this.store.pipe(
        select(getProcessing)
      )
    ).pipe(
      map(([invalid, processing]) => {
        return invalid || processing;
      }),
    );
  }

  ngOnInit(): void {
  }

  signin(): void {
    const values = this.signinForm.value;
    this.store.dispatch(new Signin({ credentials: values }));
  }

}
