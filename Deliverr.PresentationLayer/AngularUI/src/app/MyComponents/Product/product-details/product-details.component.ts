import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(private apiService: ApiService,
    private route: ActivatedRoute, private userStore: UserStoreService,
    private authService: AuthService, private formBuilder: FormBuilder,
    private toast: NgToastService) { }
  prod: any;
  rating: any;
  userId: any;
  ratingForm: any;
  Name: any;
  isAdmin = false;
  Role: any;
  productId: any;
  comments: any[] = [];
  ngOnInit(): void {

    this.userDetails();

    this.userStore.getUserIdFromStore().subscribe(val => {
      let IdFromToken = this.authService.getIdFromToken()
      console.log("Product/ user Id -> ", val);
      this.userId = val || IdFromToken;
    })

    this.fetchProductDetails();

    this.ratingForm = this.formBuilder.group({
      rating: [0],
      comment: ['']
    });
  }

  fetchProductDetails() {
    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id')!;
      if (this.productId != null) {
        this.apiService.getProductById(this.productId).subscribe(
          (product) => {
            console.log(product);
            this.prod = product;
          },
          (err) => {
            console.log(err.message);
          }
        );
        this.apiService.viewComments(this.productId).subscribe((res: any) => {
          this.comments = res.comments;
          // console.log(this.comments);
        });
        this.apiService.getRating(this.productId).subscribe((res: any) => {
          this.rating = res;
          console.log(res);
        });
      }
    });
  }
  discountedPrice(discount: any, price: any) {
    const discountAmount = (discount / 100) * price;
    const discountedPrice = price - discountAmount;
    return discountedPrice;
  }
  

  refreshComments() {
    this.fetchProductDetails();
  }

  userDetails() {
    combineLatest([
      this.userStore.getFullNameFromStore(),
      this.userStore.getRoleFromStore()
    ]).subscribe(([fullNameFromStore, roleFromStore]) => {
      const fullNameFromToken = this.authService.getFullNameFromToken();
      const roleFromToken = this.authService.getRoleFromToken();

      console.log("Navbar name -> ", fullNameFromStore);
      console.log("Navbar role -> ", roleFromStore);

      this.Name = fullNameFromStore || fullNameFromToken;
      this.Role = roleFromStore || roleFromToken;

      if (this.Role === "Admin") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  onCommentSubmit() {
    if (this.ratingForm.valid) {
      this.ratingForm.get('rating').setValue(this.count);
      const commentData = {
        UserId: this.userId,
        UserName: this.Name,
        ProductId: this.productId,
        Rating: this.ratingForm.value.rating,
        Comment: this.ratingForm.value.comment
      };
      this.apiService.addComment(commentData).subscribe(() => {
        this.toast.success({ detail: "Success", summary: "Comment added", duration: 3000 })
        this.refreshComments();
        // this.ratingForm.reset();
      });
    }
  }
  count: any = 1;
  incrementRating() {
    if (this.count < 5) {
      this.count += 1;
    }
  }

  decrementRating() {
    if (this.count > 1) {
      this.count -= 1;
    }
  }

  getStarsArray(rating: number): any[] {
    const starsArray = [];
    for (let i = 0; i < rating; i++) {
      starsArray.push(i);
    }
    return starsArray;
  }
  deleteComment(id: any, userId: string) {
    this.apiService.deleteComment(id, userId).subscribe((res) => {
      this.toast.success({ detail: "Success", summary: "Comment deleted", duration: 3000 })
      this.refreshComments();
    });
  }



  quantity: any;
  quantityMap: Map<number, number> = new Map<number, number>();
  increaseQuantity(productId: number) {
    const currentQuantity = this.getQuantity(productId);
    if (this.prod.availableQuantity > currentQuantity)
      this.setQuantity(productId, currentQuantity + 1);
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
    const product = this.prod;
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
