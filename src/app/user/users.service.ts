import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {
  activatedEmitter: Subject<boolean> = new Subject<boolean>(); // on subjects, the next() method can be called from outside
  // Subjects are better than emitters, for performance and readability
}
