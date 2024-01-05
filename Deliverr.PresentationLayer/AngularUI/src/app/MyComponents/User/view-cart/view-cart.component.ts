import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit {
  userId: string = '';
  product: any[] = [];
  cart: any[] = [];
  productsInCart: any[] = [];
  originalList: any = [];
  quantityMap: Map<number, number> = new Map<number, number>();
  sum: any = 0;
  initialSum: any;
  constructor(
    private authService: AuthService,
    private userStore: UserStoreService,
    private toast: NgToastService,
    private apiService: ApiService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.userStore.getUserIdFromStore().subscribe((val) => {
      let IdFromToken = this.authService.getIdFromToken();
      console.log('Product/ user Id -> ', val);
      this.userId = val || IdFromToken;
    });
    this.getUserCart();
    this.cartTotal(this.productsInCart);
  }
  calculatePrice(price: any, quantity: any) {
    const numericPrice = parseFloat(price);
    const numericQuantity = parseInt(quantity);

    if (!isNaN(numericPrice) && !isNaN(numericQuantity)) {
      this.sum -= this.initialSum; // Subtract the initial sum

      this.sum += numericPrice * numericQuantity; // Calculate the updated sum

      this.initialSum = numericPrice * numericQuantity; // Update the initial sum with the new values
    }
  }

  cartTotal(productsInCart: any) {
    this.sum = 0; // Reset the sum to zero before calculating

    for (let i = 0; i < productsInCart.length; i++) {
      const product = productsInCart[i];
      const numericPrice = parseFloat(product.price);
      const numericQuantity = parseInt(product.quantity);

      if (!isNaN(numericPrice) && !isNaN(numericQuantity)) {
        this.sum += numericPrice * numericQuantity;
      }
    }
  }


  discountedPrice(discount: any, price: any) {
    const discountAmount = (discount / 100) * price;
    const discountedPrice = price - discountAmount;
    return discountedPrice;
  }


  getUserCart() {
    this.apiService.getUserCart(this.userId).subscribe((res) => {
      // console.log('cart', res);
      res.forEach((item: any) => {
        if (item.product) {
          this.product.push(item.product);
        }
        if (item.cart) {
          this.cart.push(item.cart);
        }
        this.mergeArrays();
      });
      this.cartTotal(this.productsInCart)
    });
  }

  mergeArrays() {
    const mergedMap: Map<number, any> = new Map<number, any>();
    this.cart.forEach((cartItem: any) => {
      const productId = cartItem.productId;
      if (mergedMap.has(productId)) {
        // Update the quantity of the existing merged item
        mergedMap.get(productId).quantity += cartItem.quantity;
      } else {
        const prod = this.product.find(
          (productItem: any) => productItem.productId === productId
        );
        if (prod) {
          const mergedItem = { ...prod, ...cartItem };
          mergedMap.set(productId, mergedItem);
        } else {
          // If the product doesn't exist in the product array, add it as a separate item in mergedMap
          mergedMap.set(productId, cartItem);
        }
      }
    });

    this.productsInCart = Array.from(mergedMap.values());
    this.originalList = this.productsInCart;
  }

  removeFromCart(productId: any) {
    this.apiService.deleteItemFromCart(this.userId, productId).subscribe(
      (res) => {
        const index = this.productsInCart.findIndex(
          (p: any) => p.productId === productId
        );
        if (index !== -1) {
          this.productsInCart.splice(index, 1);
          this.toast.success({
            detail: 'Success',
            summary: 'Product Removed From Cart',
            duration: 3000,
          });
        }
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
  increaseQuantity(productId: number) {
    const product = this.productsInCart.find((item: any) => item.productId === productId);
    const currentQuantity = this.getQuantity(product.productId);
    const availableQuantity = product.availableQuantity;

    if (currentQuantity < availableQuantity) {
      const newQuantity = currentQuantity + 1;
      this.setQuantity(product.productId, newQuantity);
      this.updateCart(product.productId, newQuantity);
      this.calculatePrice(product.price, newQuantity);


    } else {
      this.toast.error({
        detail: 'Unsuccessful',
        summary: "Can't add more than available quantity",
        duration: 3000,
      });
    }
  }


  decreaseQuantity(productId: number) {
    const product = this.productsInCart.find((item: any) => item.productId === productId);
    const currentQuantity = this.getQuantity(productId);
    if (currentQuantity > 1) {
      this.setQuantity(productId, currentQuantity - 1);
      this.updateCart(productId, currentQuantity - 1);
      this.calculatePrice(product.price, currentQuantity - 1);
    }
  }

  updateCart(productId: number, newQuantity: number) {
    const itemToUpdate = this.productsInCart.find((item: any) => item.productId === productId);
    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
      // Making API call to update the cart item with the new quantity
      this.apiService.updateCart(this.userId, productId, newQuantity).subscribe(
        (res) => {
          console.log('Cart item updated successfully');
        },
        (err: any) => {
          console.log(err.message);
        }
      );
    }
  }

  getQuantity(productId: number): number {
    const quantityFromMap = this.quantityMap.get(productId);
    const product = this.productsInCart.find((p: any) => p.productId === productId);

    if (quantityFromMap !== undefined) {
      return quantityFromMap;
    } else if (product) {
      const currentQuantity = product.quantity;
      const availableQuantity = product.availableQuantity;

      if (currentQuantity > availableQuantity) {
        return availableQuantity;
      } else {
        return currentQuantity;
      }
    } else {
      return 0;
    }
  }


  setQuantity(productId: number, quantity: number) {
    this.quantityMap.set(productId, quantity);
  }

  placeOrder(productsInCart: any[]) {
    this.apiService.addOrders(productsInCart).subscribe((res) => {
      this.toast.success({
        detail: 'Success',
        summary: 'Order Placed',
        duration: 3000,
      });
    });

    this.apiService.updateQuantity(productsInCart).subscribe((res) => { })

    this.apiService.deleteAllItemsFromCart(this.userId).subscribe((res) => {
      console.log(res.message);
      this.productsInCart.splice(0, this.productsInCart.length);
      this.route.navigate(['myorders']);
    });
  }

  navigateToDetails(productId: any) {
    this.route.navigate(["products/", productId]);
  }

  //pagination
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
      this.getUserCart()
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
        this.getUserCart()
        console.log(this.productName);
      } else {
        this.flag = 0; // Reset the flag
        this.errorMsg = "";
        this.productsInCart = filteredResults; // Update the productsList array with filtered results
      }
    }
  }
}
