import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getHasIdentity } from '../selectors/auth.selectors';

@Directive({
  selector: '[authHasIdentity]',
})
export class HasIdentityDirective implements OnInit, OnDestroy {

  @Input()
  public get authHasIdentity(): boolean {
    return this._reverse;
  }
  public set authHasIdentity(value: boolean) {
    this._reverse = value ? true : false;
    this.showBlockInView();
  }

  private identityChange: Subscription;
  private hasIdentity: boolean;
  private _reverse: boolean;

  constructor(
    private store: Store<any>,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.authHasIdentity = false;
  }

  ngOnInit(): void {
    this.viewContainer.clear();
    this.identityChange = this.store.pipe(select(
      getHasIdentity
    )).subscribe((hasIdentity) => {
      this.hasIdentity = hasIdentity;
      this.showBlockInView();
    });
  }
  ngOnDestroy(): void {
    if (this.identityChange) {
      this.identityChange.unsubscribe();
    }
  }

  private showBlockInView() {
    this.viewContainer.clear();
    if (this.hasIdentity === !this.authHasIdentity) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.changeDetectorRef.markForCheck();
    }
  }
}
