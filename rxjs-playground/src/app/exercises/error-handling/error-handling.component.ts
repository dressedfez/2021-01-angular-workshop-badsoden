import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-error-handling',
  templateUrl: './error-handling.component.html',
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject();

  constructor(private es: ExerciseService) { }

  start() {
    this.es.randomError().pipe(

      /******************************/
      // retry(3)
      catchError(err => {
        console.log('FEHLER', err);
        //return throwError('Schöner Fehler');  //--> nicht so schlimmer Fehler
        //return of('Nichts', 'passiert', '🤣'); // durch gutes Element ersetzen
        return EMPTY;
      })
      /******************************/
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err)
    });
  }
}
