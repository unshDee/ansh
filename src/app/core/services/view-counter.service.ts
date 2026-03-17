import { Injectable, OnDestroy } from '@angular/core';
import { Database, ref, runTransaction, onValue, Unsubscribe } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViewCounterService implements OnDestroy {
  private countSubject = new BehaviorSubject<number | null>(null);
  readonly count$ = this.countSubject.asObservable();

  private unsubscribeDb: Unsubscribe | null = null;

  constructor(private db: Database) {
    const counterRef = ref(this.db, 'views/total');

    this.unsubscribeDb = onValue(counterRef, (snapshot) => {
      this.countSubject.next(snapshot.val() ?? 0);
    });

    runTransaction(counterRef, (current) => (current ?? 0) + 1);
  }

  ngOnDestroy(): void {
    this.unsubscribeDb?.();
  }
}
