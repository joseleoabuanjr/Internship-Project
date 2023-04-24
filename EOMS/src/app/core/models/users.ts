export class Users{
  public account_id: number;
  public username: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public facultyId: number;

  constructor( account_id:number, username:string, password:string, firstName:string, lastName:string, facultyId:number) {
    this.account_id = account_id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.facultyId = facultyId;
  }
}
