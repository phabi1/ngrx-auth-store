import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Signin } from '../../store/actions/signin.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private store: Store<any>,
  ) {
    this.signinForm = formBuilder.group({
      email: [, Validators.required],
      password: [, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  signin(): void {
    const values = this.signinForm.value;
    this.store.dispatch(new Signin({ credentials: values }));
  }

}
