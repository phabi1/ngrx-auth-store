import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Authenticate } from 'ngrx-auth-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor (
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new Authenticate());
  }
}
