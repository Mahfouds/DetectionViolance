import { REGION } from './REGION';
import { CategoryAge } from "./CategoryAge";

export class UserInfoDTO {
  id: number;
  categoryAge: CategoryAge;
  region: REGION;
  constructor() {
    this.id = 0;
    this.categoryAge = CategoryAge.Mineur;
    this.region = REGION.Maroc
  }
}
