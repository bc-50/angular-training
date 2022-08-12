import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private ObsSub: Subscription;
  constructor() { }

  ngOnInit() {
    // this.ObsSub = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customObs = Observable.create(obs => {
      let count = 0;
      setInterval(() => {
        obs.next(count);
        if (count == 2) {
          obs.complete();
        }
        if (count > 3) {
          obs.error(new Error('Count is more than 3'));
        }
        count++;
      }, 1000);
    });

    this.ObsSub = customObs.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return "Round " + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      console.log('Completed');
    });
  }

  ngOnDestroy() {
    this.ObsSub.unsubscribe();
  }
}
