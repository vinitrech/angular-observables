import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "./user/users.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  activated: boolean = false;
  private activatedSubscription: Subscription

  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.activatedSubscription = this.userService.activatedEmitter.subscribe((didActivate: boolean) => {
      this.activated = didActivate;
    });
  }

  ngOnDestroy() {
    this.activatedSubscription.unsubscribe();
  }
}
