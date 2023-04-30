export class Programs{
  public id: number;
  public program_title: string;
  public date_and_time_start: string;
  public date_and_time_end: string;
  public place: string;
  public program_details: string;
  public program_lead: string;
  public program_members: string;
  public participants: string;
  public program_flow: string;
  public additional_details: string;
  public partners: string;

  constructor( id:number, program_title:string, date_and_time_start:string, date_and_time_end:string, place:string, program_details:string, program_lead: string, program_members: string, participants: string, program_flow: string, additional_details: string, partners: string) {
    this.id = id;
    this.program_lead = program_lead;
    this.program_members = program_members;
    this.program_details = program_details;
    this.date_and_time_end = date_and_time_end;
    this.place = place;
    this.date_and_time_start = date_and_time_start;
    this.program_title = program_title;
    this.participants = participants;
    this.program_flow = program_flow;
    this.additional_details = additional_details;
    this.partners = partners;
  }
}
