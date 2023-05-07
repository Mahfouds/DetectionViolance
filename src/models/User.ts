import { CategoryAge } from "./CategoryAge";
import { REGION } from "./REGION";

export class User {
    id:number;  
    userName:String ;   
    pass:String ;
    region : REGION;
    categoryAge : CategoryAge;
    constructor(){
        this.id=0;
        this.userName='';
        this.pass='';
        this.region=REGION.Maroc;
        this.categoryAge=CategoryAge.Adulte;
    }
}
