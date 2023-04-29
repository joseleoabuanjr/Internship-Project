export class Users{
  public account_id: number;
  public username: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public facultyId: number;
  public account_type: string;
  public email: string;

  constructor( accountId:number, userName:string, password:string, firstName:string, lastName:string, facultyId:number, account_type: string, email: string) {
    this.account_id = accountId;
    this.account_type = account_type;
    this.email = email;
    this.facultyId = facultyId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.username = userName;
  }
}
