import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  constructor(private toast: NgToastService, private apiService: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.getProductsList();
  }
  productsList: any = [];
  originalList: any = [];
  getProductsList() {
    this.apiService.getProductsList().subscribe(res => {
      this.productsList = res.reverse();
      this.originalList = res.reverse();
    })
  }
  //pagination variables
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;

  onTableDataChange(event: any) {
    this.page = event;
  }

  productName: any
  errorMsg!: string;
  flag = 0;
  filteredResult: any;

  searchByTitle() {
    this.flag = 0;
    if (this.productName === "") {
      this.getProductsList()
    } else {
      let filteredResults = this.originalList.filter((res: any) => {
        console.log("das", res);
        const searchedProduct = res.productName.toLowerCase().includes(this.productName.toLowerCase());
        return searchedProduct;
      });
      //after search display
      if (filteredResults.length === 0) {
        this.flag = 1;
        this.errorMsg = "No Results Found For: " + this.productName;
        this.getProductsList()
        console.log(this.productName);
      } else {
        this.flag = 0; // Reset the flag
        this.errorMsg = "";
        this.productsList = filteredResults; // Update the productsList array with filtered results
      }
    }
  }

  onDelete(id: number) {
    this.apiService.deleteProduct(id).subscribe(res => {
      const index = this.productsList.findIndex((p: any) => p.productId === id);
      if (index != -1) {
        this.productsList.splice(index, 1);
        this.toast.success({ detail: "Success", summary: "Product Deleted Successfully", duration: 3000 })
      }
    }, err => {
      console.log(err.message);
    })
  }
  navigateToEdit(id: any) {
    this.route.navigate(['editproduct/' + id])
  }

  navigateToDetails(productId: any) {
    this.route.navigate(['products/', productId]);
  }
}
