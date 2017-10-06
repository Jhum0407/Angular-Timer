import  { AngularFireDatabase, FirebaseListObservable, } from 'angularfire2/database';
export interface Clock {
    db: AngularFireDatabase;
    hours: number;
    minutes: number;
    seconds: number;
    millisecoonds: number
    
}
