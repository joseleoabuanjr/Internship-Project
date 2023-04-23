import { Component/*, HostBinding*/ } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition,
// } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // animations: [
  // i'll put some animations later
  // ]
})
export class AppComponent {
  title = 'EOMS';
}/*import { animation } from '@angular/animations';*/
