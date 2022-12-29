import { Subscription } from "rxjs";

export class HasSubscription {
    subscriptions: Subscription[] = [];
    
    onDestroy(): void {
        if (this.subscriptions) {
          this.subscriptions.forEach(sub => sub.unsubscribe());
        }
    }
}