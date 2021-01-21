import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { MeasureValuesService } from './measure-values.service';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-multicast',
  templateUrl: './multicast.component.html',
})
export class MulticastComponent implements OnInit {

  listeners = [];
  logStream$ = new ReplaySubject();

  //measureValues$: Observable<number>; // später: Subject<number>
  measureValues$: Subject<number>;

  constructor(private mvs: MeasureValuesService, private es: ExerciseService) { }

  ngOnInit() {
    /******************************/

    //this.measureValues$ = this.mvs.getValues().pipe(share());
    //this.measureValues$ = new Subject();
    //this.measureValues$ = new BehaviorSubject(0);
    this.measureValues$ = new ReplaySubject(5);
    // letzter Aufruf, da this.measureValues$ ein Observer ist, da measureValues$ ein Subject ist
    this.mvs.getValues().subscribe(this.measureValues$);

    /******************************/
  }

  addListener() {
    this.listeners.push(this.es.generateRandomString(5));
  }

  addConsoleListener() {
    const randomString = this.es.generateRandomString(5);
    this.measureValues$.subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

}
