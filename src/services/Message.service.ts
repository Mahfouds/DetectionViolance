import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDTO } from 'src/models/MessageDTO';
import { AuthService } from './auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  readonly API_URL = "http://localhost:8080"

  readonly message = "/Chat/getMessages"
  readonly msgs = "/Chat/getMessages"
  readonly envy = "/Chat/EnvoyerMessage"



  constructor(private httpClient: HttpClient, private authService:AuthService) { }
  getMessagesRecepteur(id: number): Observable<MessageDTO[]> {
    const token = this.authService.getToken();
    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + token
      }
    };
    //return this.httpClient.get<Fournisseur[]>(this.API_URL+this.ENDPOINT_fournisseurs)
    const url = `${this.API_URL}${this.message}/${id}`;
    var Messages = this.httpClient.get<MessageDTO[]>(url, httpOptions);

    console.log(Messages);
    return Messages;
  }
  getMessages(msg: MessageDTO): Observable<MessageDTO[]> {
    const token = this.authService.getToken();
    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + token
      }
    };
    //return this.httpClient.get<Fournisseur[]>(this.API_URL+this.ENDPOINT_fournisseurs)
    const url = `${this.API_URL}${this.msgs}`;
    var Message = this.httpClient.post<MessageDTO[]>(url, msg, httpOptions);
    console.log(Message);
    return Message;
  }
  envoyerMessage(msg: MessageDTO): Observable<void> {
    const token = this.authService.getToken();
    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + token
      }
    };
    const url = `${this.API_URL}${this.envy}`;
    var Message = this.httpClient.post<void>(url, msg, httpOptions);
    console.log(Message);
    return Message;

  }
}
