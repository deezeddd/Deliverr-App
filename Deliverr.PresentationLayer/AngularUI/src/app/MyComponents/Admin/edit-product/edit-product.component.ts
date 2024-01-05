import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private apiService: ApiService, private toast: NgToastService, private router: ActivatedRoute,
    private route : Router) {
  }
  //Form
  updateProductForm = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    category: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    availableQuantity: new FormControl('', Validators.required),
    productImage: new FormControl('', Validators.required),
    price: new FormControl(['', Validators.required]),
    discount: new FormControl(['']),
    specification: new FormControl('')
  })

  product: any;
  id: any;
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      if (this.id != null) {
        this.apiService.getProductById(this.id).subscribe(res => {
          console.log(res);
          this.product = res;
          this.updateProductForm.get('productName')?.setValue(this.product.productName);
          this.updateProductForm.get('description')?.setValue(this.product.description);
          this.updateProductForm.get('price')?.setValue(this.product.price);
          this.updateProductForm.get('discount')?.setValue(this.product.discount);
          this.updateProductForm.get('availableQuantity')?.setValue(this.product.availableQuantity);
          this.updateProductForm.get('productImage')?.patchValue(this.product.productImage);
          this.updateProductForm.get('category')?.setValue(this.product.category);
          this.updateProductForm.get('specification')?.setValue(this.product.specification);
        })
      }
    })

  }

  isSubmitted = false;
  onUpdate(updateProductForm: any) {
    this.isSubmitted = true;
    if (this.updateProductForm.valid) {
      const updatedProduct = { ...this.updateProductForm.value }; // Create a copy of the form values
      console.log(updatedProduct);

      this.apiService.updateProduct(this.id, updatedProduct).subscribe(res => {
        this.toast.success({ detail: "Successful", summary: "Product Updated Successfully", duration: 3000 })
        this.route.navigate(['productlist'])
      }, err => {
        this.toast.error({ detail: "Unsuccesful", summary: "Error While Updating The Product", duration: 3000 })
      })
    }
  }



}
