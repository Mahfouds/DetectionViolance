export class MessageDTO {

        id: number;
        texte: string;
        id_emmet:number;
        id_recep:number;
        image: string;
        violanceState:boolean;
        emetteur: string;
        recepteur: string;
        date:Date;
        constructor(){
this.id=0;
this.texte='';
this.id_emmet=0;
this.id_recep=0;
this.image='';
this.violanceState=false;
this.emetteur='';
this.recepteur='';
this.date=new Date();
this.date.setHours(new Date().getHours());
this.date.setMinutes(new Date().getMinutes());
this.date.setSeconds(new Date().getSeconds());
this.date.setMilliseconds(new Date().getMilliseconds());
        }
        setImage(path:string){
          this.image=path
        }
}
