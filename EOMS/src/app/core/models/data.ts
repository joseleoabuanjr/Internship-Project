import { Users } from "src/app/core/models/users";

export class DataUser{
  public data: Users[];
  public success: number;

  constructor( data: Users[], success: number ) {
    this.success = success;
    this.data = data;
  }
}
