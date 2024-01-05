import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './MyComponents/GeneralComponents/navbar/navbar.component';
import { HomeComponent } from './MyComponents/GeneralComponents/home/home.component';
import { LoginComponent } from './MyComponents/User/login/login.component';
import { RegisterComponent } from './MyComponents/User/register/register.component';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './MyComponents/GeneralComponents/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './MyComponents/Product/products/products.component';
import { ProductDetailsComponent } from './MyComponents/Product/product-details/product-details.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ViewCartComponent } from './MyComponents/User/view-cart/view-cart.component';
import { MyOrdersComponent } from './MyComponents/User/my-orders/my-orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { ProductsListComponent } from './MyComponents/Admin/products-list/products-list.component';
import { AddProductComponent } from './MyComponents/Admin/add-product/add-product.component';
import { EditProductComponent } from './MyComponents/Admin/edit-product/edit-product.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ViewCartComponent,
    MyOrdersComponent,
    ProductsListComponent,
    AddProductComponent,
    EditProductComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgToastModule,
    RouterModule.forRoot([]),

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
