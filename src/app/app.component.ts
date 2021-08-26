import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy = new Subject();

  // eslint-disable-next-line
  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        const mvp = document.getElementById('meta-viewport');
        if (window.screen.width < 320) {
          mvp?.setAttribute('content', 'user-scalable=no, width=320');
        } else {
          mvp?.setAttribute('content', 'width=device-width, initial-scale=1');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
