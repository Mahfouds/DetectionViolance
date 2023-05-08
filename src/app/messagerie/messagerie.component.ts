import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageDTO } from 'src/models/MessageDTO';
import { User } from 'src/models/User';
import { UserDTO } from 'src/models/UserDTO';
import { Message } from 'src/models/message';
import { MessageService } from 'src/services/Message.service';
import { AuthService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  title = 'Detection Violance';
  message: MessageDTO[] = [];
  message1: MessageDTO[] = [];
  listMessage: String[] = [];
  messages: MessageDTO[] = [];
  users: UserDTO[];
  currentDestinatire: number;
  image!: String;
  id: number = 0;
  m: MessageDTO = new MessageDTO;
  m1: MessageDTO = new MessageDTO;
  test = false
  msg = new Message();
  envoyerMessageDTO: MessageDTO;

  vous: number
  constructor(private service: MessageService, private authService: AuthService) {
    this.id = this.authService.getId();
    this.users = [];
    this.messages = [];
    this.currentDestinatire = 0;
    this.envoyerMessageDTO = new MessageDTO();
    this.vous = 0;
    this.service.getMessagesRecepteur(this.id).subscribe((message: MessageDTO[]) => {
      console.log("on va aficher la list des messages de ", this.id)
      this.message = message;

      console.log("receptuer" + message)
    });

  }
  ngOnInit(): void {

    this.id = this.authService.getId();
    this.getAllcontacts();
    this.vous = this.authService.getId();
    this.scrollToBottom();

  }

  EnvoyerMessages() {
    if (this.image != null) {
      const path = "D:/S2/DetectionViolance/src/assets/images/" + this.image;
      //const path="D:/S2/modelML/violenceDetection/violenceDetection/inputs/"+this.image;
      this.service.getViolanceState(path, 2).subscribe(
        (res) => {
          console.log(res)
          if (res.result == true) {
            alert("violance");
          } else {
            this.envoyerMessageDTO.id_emmet = this.vous;
            this.envoyerMessageDTO.id_recep = this.currentDestinatire;

            //this.envoyerMessageDTO.texte = ref.value;
            //this.envoyerMessageDTO.Img = "assets/images/" + this.image;
            this.envoyerMessageDTO.setImage("assets/images/" + this.image);

            //this.envoyerMessageDTO.Img = path;
            console.log("message: " + this.envoyerMessageDTO.Img)
            //this.listMessage.push(ref.value);
            //console.log(this.listMessage)


            //this.image = ref1.value;

            this.service.envoyerMessage(this.envoyerMessageDTO).subscribe(
              // console.log('les messages ont été envoyee avec succès !');
              res => { this.getMessagesBtw2Contacts(this.currentDestinatire); },
              err => { }
            );

          }
        },
        (err) => {
          console.log(err);

        });

    } else {
      this.envoyerMessageDTO.id_emmet = this.vous;
      this.envoyerMessageDTO.id_recep = this.currentDestinatire;

      //this.envoyerMessageDTO.texte = ref.value;
      //this.envoyerMessageDTO.Img = path;
      console.log("message: " + this.envoyerMessageDTO)
      //this.listMessage.push(ref.value);
      const date = new Date();
      const formattedDate = date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      this.envoyerMessageDTO.date = new Date(formattedDate);
      console.log("la date " + this.envoyerMessageDTO.date)


      //this.image = ref1.value;

      this.service.envoyerMessage(this.envoyerMessageDTO).subscribe(
        // console.log('les messages ont été envoyee avec succès !');
        res => { this.getMessagesBtw2Contacts(this.currentDestinatire); },
        err => { }
      );
    }
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

  signOut() {
    this.authService.singOut();
  }
  onFileSelect(event: any) {
    const file = event.target.files[0];
    console.log(file.name); // logs the file name
    console.log(file.path); // logs the file path (if available)
    this.image = file.name;
    console.log("image : "+this.image)
  }
  getAllcontacts() {
    this.service.getAllusers().subscribe(
      res => { this.users = res; console.log("users : " + this.users) },
      err => { console.log("getAllcontacts error : " + err) }
    )
  }

  getVousContact() {
    const userId = this.authService.getId();
    console.log("user id :" + userId)
    this.users.forEach(user => {
      if (user.id === userId) {
        user.vous = true;
      }
    });
  }
  getMessagesBtw2Contacts(id: number) {
    this.currentDestinatire = id;
    this.service.getMessageBtw2Contcats(this.vous, id).subscribe(
      res => { this.messages = res; console.log("messages : " + this.messages) },
      err => { console.log("getAllcontacts error : " + err) }
    )
  }


  scrollToBottom(): void {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }


}
