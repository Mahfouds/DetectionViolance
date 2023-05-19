import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryAge } from 'src/models/CategoryAge';
import { MessageDTO } from 'src/models/MessageDTO';
import { REGION } from 'src/models/REGION';
import { User } from 'src/models/User';
import { UserDTO } from 'src/models/UserDTO';
import { UserInfoDTO } from 'src/models/UserInfoDTO';
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
  currentDestinatireName: string;
  image!: String;
  id: number = 0;
  m: MessageDTO = new MessageDTO;
  m1: MessageDTO = new MessageDTO;
  test = false
  msg = new Message();
  envoyerMessageDTO: MessageDTO;
  violanceState=false;
  currentInfos:UserInfoDTO;
region:number;
  vous: number;
  constructor(private service: MessageService, private authService: AuthService) {
    this.region=0;
    this.currentDestinatireName='';
    this.id = this.authService.getId();
    this.currentInfos=new UserInfoDTO();
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
    //this.scrollToBottom();
    this.authService.getUserInfos().subscribe(
      res=>{console.log("User Infos dsds : "+JSON.stringify(res));
    this.currentInfos=res;
    },
      err=>{console.log(err)}
    );

  }
  getViolanceState(path:string):any{
    path="D:/S2/DetectionViolance/src/"+path;
    return this.service.getViolanceState(path, 2).subscribe(
      res => {
        if (res.result == true) {
          console.log(res);
          return true;
        } else {
          return false;
        }
      },
     err => {
        console.log(err);
        return false;
      }
    );
  }


  EnvoyerMessages() {
    if (this.image != null) {
      const path = "D:/S2/DetectionViolance/src/assets/images/" + this.image;
      //const path="D:/S2/modelML/violenceDetection/violenceDetection/inputs/"+this.image;

      if(this.currentInfos.region==REGION.Europe)
      this.region=2;else this.region=1;
      this.service.getViolanceState(path, this.region).subscribe(
        (res) => {
          console.log(res)

          if (res.result == true) {
            if(this.currentInfos.categoryAge===CategoryAge.Mineur)
            alert("t'es mineur , ce contenu est violant a votre age ");
            else{
              this.envoyerMessageDTO.id_emmet = this.vous;
              this.envoyerMessageDTO.id_recep = this.currentDestinatire;
              this.envoyerMessageDTO.violanceState=true;
              //this.envoyerMessageDTO.texte = ref.value;
              //this.envoyerMessageDTO.Img = "assets/images/" + this.image;
              this.envoyerMessageDTO.setImage("assets/images/"+this.image);

              //this.envoyerMessageDTO.Img = path;
              console.log("message: " + this.envoyerMessageDTO.image)
              //this.listMessage.push(ref.value);
              //console.log(this.listMessage)


              //this.image = ref1.value;

              this.service.envoyerMessage(this.envoyerMessageDTO).subscribe(
                // console.log('les messages ont été envoyee avec succès !');
                res => { this.getMessagesBtw2Contacts(this.currentDestinatire,'');
              this.envoyerMessageDTO=new MessageDTO();this.image=''; },
                err => { }
              );

            }
          } else {
            this.envoyerMessageDTO.id_emmet = this.vous;
            this.envoyerMessageDTO.id_recep = this.currentDestinatire;
            this.envoyerMessageDTO.violanceState=false;
            //this.envoyerMessageDTO.texte = ref.value;
            //this.envoyerMessageDTO.Img = "assets/images/" + this.image;
            this.envoyerMessageDTO.setImage("assets/images/"+this.image);

            //this.envoyerMessageDTO.Img = path;
            console.log("message: " + this.envoyerMessageDTO.image)
            //this.listMessage.push(ref.value);
            //console.log(this.listMessage)


            //this.image = ref1.value;

            this.service.envoyerMessage(this.envoyerMessageDTO).subscribe(
              // console.log('les messages ont été envoyee avec succès !');
              res => { this.getMessagesBtw2Contacts(this.currentDestinatire,'');
              this.envoyerMessageDTO=new MessageDTO();this.image='';

            },
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
      this.envoyerMessageDTO.violanceState=false;
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
        res => { this.getMessagesBtw2Contacts(this.currentDestinatire,'');

        this.envoyerMessageDTO=new MessageDTO();this.image='';

      },
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
  getMessagesBtw2Contacts(id: number,username:string) {
    this.currentDestinatire = id;
    this.currentDestinatireName=username;
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
