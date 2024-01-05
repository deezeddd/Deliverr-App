import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userId: any;
  product: any[] = [];
  orderDetails: any[] = [];
  flag = 0;


  constructor(private apiService: ApiService,
    private userStore: UserStoreService,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.userStore.getUserIdFromStore().subscribe(val => {
      let IdFromToken = this.authService.getIdFromToken()
      this.userId = val || IdFromToken;
    });

    this.apiService.myOrders(this.userId).subscribe((res) => {
      console.log("My Orders", res);
      this.orderDetails = res.reverse();
    })
  }

  navigateToDetails(productId: any) {
    this.route.navigate(["products/", productId])
  }

  page: number = 1;
  count: number = 0;
  tableSize: number = 6;

  onTableDataChange(event: any) {
    this.page = event;
  }


}
