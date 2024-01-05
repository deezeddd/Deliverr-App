import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {


  constructor(private apiService: ApiService, private toast: NgToastService, private route: Router) { }


  addProductForm = new FormGroup({
    productName: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z0-9]+$')
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.pattern('^[a-zA-Z0-9]+$')
    ]),
    category: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z0-9]+$')
    ]),
    availableQuantity: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ]),
    productImage: new FormControl('', [
      Validators.required,
      Validators.pattern('^.*\.(jpg|jpeg|png)$')
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')
    ]),
    discount: new FormControl('', [
      Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')
    ]),
    specification: new FormControl('', [
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z0-9]+$')
    ])
  });

  isSubmitted = false; 
  onSubmit() {
    const formData = (this.addProductForm);
    this.isSubmitted = true;
    if (this.addProductForm.valid) {
      // Process the form submission
      this.apiService.addProduct(formData.value).subscribe((res) => {
        console.log("AddProduct->", res);  //debug
        this.toast.success({ detail: "Successful", summary: "Product Added Successfully", duration: 3000 })
        this.route.navigate(['productlist'])
      }, err => (
        this.toast.error({ detail: "Unsuccessful", summary: err.message, duration: 3000 })
      )
      );

    } else {
      console.log('Form validation failed');
    }
  }

}

