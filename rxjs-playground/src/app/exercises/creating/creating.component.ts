import { Component, OnInit } from '@angular/core';
import { Observable, of, from, throwError, timer, interval, ReplaySubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent implements OnInit {

  logStream$ = new ReplaySubject<string | number>();

  ngOnInit() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */
 /**
     of(1, 2 , 3, 4, 5).subscribe({
       next: e => this.log(e),
       error: e => this.log(e),
       complete: () => this.log("COMPLETE")
     });

     from('[4, 5, 6]').subscribe({
      next: e => this.log(e),
      error: e => this.log(e),
      complete: () => this.log("COMPLETE")
     });


     throwError('err').subscribe({
      next: e => this.log(e),
      error: e => this.log(e),
      complete: () => this.log("COMPLETE")
     });
*/

     timer(0, 500).pipe(
       map(e => e * 3),
       filter(e => e % 2 === 0),
     ).subscribe({
      next: e => this.log(e),
      error: e => this.log('ERROR' + e),
      complete: () => this.log("COMPLETE")
     });

    /******************************/


    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
