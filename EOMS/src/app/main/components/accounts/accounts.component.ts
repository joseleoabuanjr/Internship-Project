import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Product } from './product';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { Users } from 'src/app/core/models/users';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
  SMALL_WIDTH_BREAKPOINT = 740;
  products: Product[] = [
    {
      id: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      releaseDate: 'March 19, 2018',
      description: 'Leaf rake with 48-inch wooden handle',
      price: 19.95,
      starRating: 3.2,
      imageUrl: 'assets/images/leaf_rake.png',
      category: 'Garden',
      tags: ['rake', 'leaf', 'yard', 'home']
    },
    {
      id: 2,
      productName: 'Garden Cart',
      productCode: 'GDN-0023',
      releaseDate: 'March 18, 2018',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      starRating: 4.2,
      imageUrl: 'assets/images/garden_cart.png',
      category: 'Garden'
    },
    {
      id: 5,
      productName: 'Hammer',
      productCode: 'TBX-0048',
      releaseDate: 'May 21, 2018',
      description: 'Curved claw steel hammer',
      price: 8.9,
      starRating: 4.8,
      imageUrl: 'assets/images/hammer.png',
      category: 'Toolbox',
      tags: ['tools', 'hammer', 'construction']
    },
    {
      id: 8,
      productName: 'Saw',
      productCode: 'TBX-0022',
      releaseDate: 'May 15, 2018',
      description: '15-inch steel blade hand saw',
      price: 11.55,
      starRating: 3.7,
      imageUrl: 'assets/images/saw.png',
      category: 'Toolbox'
    },
    {
      id: 10,
      productName: 'Video Game Controller',
      productCode: 'GMG-0042',
      releaseDate: 'October 15, 2018',
      description: 'Standard two-button video game controller',
      price: 35.95,
      starRating: 4.6,
      imageUrl: 'assets/images/xbox-controller.png',
      category: 'Gaming'
    }
  ];

  public isScreenSmall: boolean | undefined;

  users!: Observable<Users[]>;

  constructor(
    private breakpointObserver : BreakpointObserver,
    private userService: DataService,
    private router: Router
    ) { }

    @Output() toggleSidenav = new EventEmitter<void>();
    @ViewChild(MatDrawer) drawer!: MatDrawer;

  ngOnInit(): void {
      this.breakpointObserver
      .observe([`(max-width: ${this.SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe(
        (state:BreakpointState) => {
          this.isScreenSmall = state.matches
        }
      );

      this.router.events.subscribe(() => {
        if (this.isScreenSmall){
          this.drawer.close();
        }
      })
    }
}
