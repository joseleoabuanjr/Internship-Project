export class Data{
  public data: any[];
  public success: number;

  constructor( data: any[], success: number ) {
    this.success = success;
    this.data = data;
  }
}
