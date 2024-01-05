import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  filteredProducts: any;
  constructor(private http: HttpClient, private toast: NgToastService,
    private apiService: ApiService, private authService: AuthService,
    private userStore: UserStoreService) { }

  //pagination variables
  page: number = 1;
  count: number = 0;
  tableSize: number = 9;

  onTableDataChange(event: any) {
    this.page = event;
  }
  //services part
  productsList: any = [];
  userId: any;
  ngOnInit(): void {
    this.getProductsList();
    this.userStore.getUserIdFromStore().subscribe(val => {
      let IdFromToken = this.authService.getIdFromToken()
      console.log("Product/ user Id -> ", val);
      this.userId = val || IdFromToken;
    })
  }

  discountedPrice(discount: any, price: any) {
    const discountAmount = (discount / 100) * price;
    const discountedPrice = price - discountAmount;
    return discountedPrice;
  }

  originalList: any = []
  getProductsList() {
    this.apiService.getProductsList().subscribe((data: any) => {
      console.log(data);
      this.productsList = data   // for search purpose
      this.originalList = data;  //stores permanent list
    });
  }
  sortOrder: 'asc' | 'desc' = 'asc';
  sortBy() {
    if (this.sortOrder === 'asc') {
      this.productsList.sort((a: any, b: any) => a.price - b.price);
      this.sortOrder = 'desc';
    } else {
      this.productsList.sort((a: any, b: any) => b.price - a.price);
      this.sortOrder = 'asc';
    }
  }

  //search part
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
      if (filteredResults.length === 0) {
        this.flag = 1;
        this.errorMsg = "No Results Found For: " + this.productName;
        this.getProductsList()
        console.log(this.productName);
      } else {
        this.flag = 0;
        this.errorMsg = "";
        this.productsList = filteredResults;
      }
    }
  }
  category: any;
  displayCategory() {
    this.apiService.getProductByCategory(this.category).
      subscribe({
        next: (data) => {
          this.filteredProducts = data;
          console.log(data);
        }
      });
  }
  isDropdownOpen = false;
  getSelectedCategory(category: string) {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.category = category;
    console.log(this.category);
  }
  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  //ADD TO CART METHODS

  quantity: any;
  quantityMap: Map<number, number> = new Map<number, number>();
  increaseQuantity(productId: number) {
    const product = this.productsList.find((item: any) => item.productId === productId);
    if (product) {
      const currentQuantity = this.getQuantity(product.productId);
      const maxQuantity = product.availableQuantity;

      if (currentQuantity < maxQuantity) {
        const newQuantity = currentQuantity + 1;
        if (newQuantity <= maxQuantity) {
          this.setQuantity(product.productId, newQuantity);
        }
      }
    }
  }

  decreaseQuantity(productId: number) {
    const currentQuantity = this.getQuantity(productId);
    if (currentQuantity > 0) {
      this.setQuantity(productId, currentQuantity - 1);
    }
  }

  getQuantity(productId: number): number {
    return this.quantityMap.get(productId) || 1;
  }

  setQuantity(productId: number, quantity: number) {
    this.quantityMap.set(productId, quantity);
  }


  toggleAddCart(productId: number, quantity: number): void {
    const product = this.productsList.find((p: any) => p.productId === productId);
    if (product) {
      this.apiService.createCart(this.userId, productId, quantity).subscribe(res => {
        this.toast.success({ detail: 'Success', summary: 'Added To Cart', duration: 3000 });
      }, err => {
        this.toast.error({
          detail: 'Unsuccessful',
          summary: "Can't add more than available quantity",
          duration: 3000,
        });
      });
    }
  }
}
