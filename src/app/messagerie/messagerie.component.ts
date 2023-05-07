import { Component, OnInit } from '@angular/core';
import { MessageDTO } from 'src/models/MessageDTO';
import { MessageService } from 'src/services/Message.service';
import { AuthService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit{

  title = 'Detection Violance';
  message: MessageDTO[] = [];
  message1: MessageDTO[] = [];
  listMessage: String[] = [];
  image!: String;
  id: number = 0;
  m: MessageDTO = new MessageDTO;
  m1: MessageDTO = new MessageDTO;
  test = false
  constructor(private service: MessageService, private authService:AuthService) {
    this.id = this.authService.getId();
    this.service.getMessagesRecepteur(this.id).subscribe((message: MessageDTO[]) => {
      console.log("on va aficher la list des messages de ", this.id)
      this.message = message;

      console.log("receptuer" + message)
    });

  }
  ngOnInit(): void {
    this.id = this.authService.getId();
  }

  EnvoyerMessages(ref: any, ref1: any) {
    this.m.id_emmet = this.id;
    this.m.id_recep = this.message1[0].id_emmet;

    this.m.texte = ref.value;
    this.m.Img = ref1.value;

    this.listMessage.push(ref.value);
    console.log(this.listMessage)


    this.image = ref1.value;

    this.service.envoyerMessage(this.m).subscribe(() => {
      // console.log('les messages ont été envoyee avec succès !');
    });
    ref1.value = "";
    ref.value = "";

  }
  getMessages1(idE: number) {
    this.m1.id_recep = this.id;
    this.listMessage = []
    this.m1.id_emmet = idE;
    console.log("this.message1");

    this.service.getMessages(this.m1).subscribe((message1: MessageDTO[]) => {
      console.log('les messages ont été envoyee avec succès !');

      this.message1 = message1;
      console.log(this.message1)

    });
  }

  signOut(){
    this.authService.singOut();
  }

}
