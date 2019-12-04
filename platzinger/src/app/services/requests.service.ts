import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private angularFireDatabase: AngularFireDatabase) {
  }

  createRequest(request) {
    const cleanEmail = request.receiver_email.replace('.', ",");
    return this.angularFireDatabase.object('requests/' + cleanEmail + '/' + request.sender).set(request);
  }

  setRequestStatus(request, status) {
    const cleanEmail = request.receiver_email.replace('.', ",");
    return this.angularFireDatabase.object('requests/' + cleanEmail + '/' + request.sender + '/status').set(status);
  }

  getReuqestForEmail(email) {
    const cleanEmail = email.receiver_email.replace('.', ",");
    return this.angularFireDatabase.list('request/' + cleanEmail);
  }
}
