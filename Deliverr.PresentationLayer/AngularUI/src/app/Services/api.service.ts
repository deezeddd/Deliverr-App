import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: String = "https://localhost:7225/api/"
  constructor(private http: HttpClient) { }
  getProductsList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Product/GetAllProducts`)
  }
  getProductById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Product/GetProductById/${id}`)
  }
  addProduct(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}Product/CreateProduct`, userObj)
  }
  deleteProduct(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}Product/DeleteProduct/${id}`)
  }
  updateProduct(id: any, userObj: any) {
    return this.http.put<any>(`${this.baseUrl}Product/EditProduct/${id}`, userObj)
  }

  getProductByCategory(category: string){
    return this.http.put<any>(`${this.baseUrl}Product/GetProductsByCategory`, category);
  }


  createCart(userId: string, productId: number, quantity: number) {
    const cartData = {
      userId: userId,
      productId: productId,
      quantity: quantity,
    };
    // console.log(cartData);
    return this.http.post<any>(`${this.baseUrl}Cart/AddUserCart`, cartData);
  }
  updateCart(userId: string, productId: number, quantity: number) {
    const cartData = {
      userId: userId,
      productId: productId,
      quantity: quantity,
    };
    console.log(cartData);
    return this.http.post<any>(`${this.baseUrl}Cart/UpdateUserCart`, cartData);
  }

  getUserCart(userId: string): Observable<any> {
    console.log(userId);
    const params = new HttpParams().set('userId', userId);
    return this.http.get<any>(`${this.baseUrl}Cart/UserCartList`, { params: params });
  }

  deleteItemFromCart(userId: string, productId: number): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('productId', productId.toString());
    return this.http.delete<any>(`${this.baseUrl}Cart/RemoveFromCart`, { params: params });

  }
  deleteAllItemsFromCart(userId: string): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId)
    return this.http.delete<any>(`${this.baseUrl}Cart/RemoveAllItemsFromCart`, { params: params });
  }

  addOrders(orders: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Orders/AddOrders`, orders);
  }

  myOrders(userId: string): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId)
    return this.http.get<any>(`${this.baseUrl}Orders/MyOrders`, { params: params });
  }

  updateQuantity(orders: any[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}UpdateProductQuantities`, orders);

  }

  viewComments(productId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Comments/ViewComments/${productId}`);
  }

  addComment(commentData: any): Observable<any> {
    console.log(commentData);
    return this.http.post<any>(`${this.baseUrl}Comments/AddComment`, commentData);
  }

  getRating(productId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Comments/Rating/${productId}`);
  }

  deleteComment(id: number, userId: string): Observable<any> {
    const params = new HttpParams()
      .set('UserId', userId)
      .set('Id', id)
    console.log(params);
    return this.http.delete<any>(`${this.baseUrl}Comments/DeleteComment`, { params: params });
  }

}
