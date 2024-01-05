import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './MyComponents/GeneralComponents/home/home.component';
import { LoginComponent } from './MyComponents/User/login/login.component';
import { NotfoundComponent } from './MyComponents/GeneralComponents/notfound/notfound.component';
import { ProductDetailsComponent } from './MyComponents/Product/product-details/product-details.component';
import { ProductsComponent } from './MyComponents/Product/products/products.component';
import { RegisterComponent } from './MyComponents/User/register/register.component';
import { MyOrdersComponent } from './MyComponents/User/my-orders/my-orders.component';
import { ViewCartComponent } from './MyComponents/User/view-cart/view-cart.component';
import { AuthGuard } from './Guards/auth.guard';
import { ProductsListComponent } from './MyComponents/Admin/products-list/products-list.component';
import { AddProductComponent } from './MyComponents/Admin/add-product/add-product.component';
import { EditProductComponent } from './MyComponents/Admin/edit-product/edit-product.component';
import { RoleGuard } from './Guards/role.guard';
import { LoggedInGuard } from './Guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/:id',                     //TODO change this
    component: ProductDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuard]

  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInGuard]

  },
  {
    path: 'myorders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewcart',
    component: ViewCartComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'productlist',
    component: ProductsListComponent,
    canActivate: [RoleGuard]

  },
  {
    path: 'addproduct',
    component: AddProductComponent,
    canActivate: [RoleGuard]

  },
  {
    path: 'editproduct/:id',
    component: EditProductComponent,
    canActivate: [RoleGuard]

  },

  {
    path: '**',
    component: NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
