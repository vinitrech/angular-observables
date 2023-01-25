import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    // this.subscription = interval(1000).subscribe(count => { // every time the component is created, another observable is created
    //   console.log(count);
    // });

    const customIntervalObservable = Observable.create(observer => {
      let count = 0
      setInterval(() => {
        observer.next(count);

        if (count === 3) {
          observer.complete(); // no need to unsubscribe
        }

        if (count > 3) {
          observer.error(new Error('Count is greater than 3.')) // throw error and stops the observer's execution and does NOT fire the complete() hook - no need to unsubscribe
        }
        count++;
      }, 1000);
    });

    this.subscription = customIntervalObservable
      .pipe(filter(data => {
          return data > 0
        }),
        map((data: number) => { // get the current data emitted by the observable and change before sending to the subscription hook - pipe is a built-in method for observables provided by rxjs library that can take any number of operators
          return 'Round ' + data;
        })).subscribe((data) => {
        console.log(data);
      }, (error: Error) => {
        console.log(error.message);
      }, () => {
        console.log("Completed execution");
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // every time the component is destroyed, the observer has to be destroyed as well
  }

}
