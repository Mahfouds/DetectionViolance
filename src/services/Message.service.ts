import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDTO } from 'src/models/MessageDTO';
import { AuthService } from './auth-service.service';
import { User } from 'src/models/User';
import { UserDTO } from 'src/models/UserDTO';
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
    console.log("from service voila msg : "+JSON.stringify(msg));
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
  getViolanceState(path:string,region:number):Observable<any>{
    return this.httpClient.get<any>("http://127.0.0.1:5000/getResult/"+path+"/"+region);
  }
  getAllusers():Observable<UserDTO[]>{
    const token = this.authService.getToken();
    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + token
      }
    };
    return this.httpClient.get<UserDTO[]>("http://localhost:8080/Chat/selectAllContacts",httpOptions);
  }
  getMessageBtw2Contcats(id1:number,id2:number):Observable<MessageDTO[]>{
    const token = this.authService.getToken();
    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + token
      }
    };
    return this.httpClient.get<MessageDTO[]>("http://localhost:8080/Chat/getMessagesBtw2Contacts/"+id1+"/"+id2,httpOptions);
  }
}
