import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private _http:HttpClient) { 
    
  }
  getProductData(prdId):Observable<any>
  {
    return this._http.get('http://localhost:3000/getProduct/"'+prdId+'"');
  }
  getAllProductData():Observable<any>
  {
    return this._http.get('http://localhost:3000/getProduct');
  }

  getSellerProductData():Observable<any>
  {
    return this._http.get('http://localhost:3000/getSellerProduct');
  }

  getAllSaleData():Observable<any>
  {
    return this._http.get("http://localhost:3000/getSaleData")
  }

  getProductQuantity(prdId):Observable<any>
  {
    return this._http.get('http://localhost:3000/getProductQuantity/"'+prdId+'"');
  }

  insertBuyerAddress(buyerAddressData, recentLoginBuyer):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveBuyerAddress/"'+ recentLoginBuyer+'"', buyerAddressData);
  }

  getBuyerAddress(recentLoginBuyer):Observable<any>
  {
    return this._http.get('http://localhost:3000/getBuyerAddress/"'+ recentLoginBuyer+'"');
  }

  getCategories():Observable<any>
  {
    return this._http.get('http://localhost:3000/getCategories');
  }

  getSubCategories():Observable<any>
  {
    return this._http.get('http://localhost:3000/getSubCategories');
  }

  insertOrder(formData, recentLoginBuyer):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveOrder/"'+recentLoginBuyer+'"', formData);
  }

  insertOrderDetails(orderDetail):Observable<any>
  {
    console.log("In service detail service ", orderDetail);
    return this._http.post('http://localhost:3000/saveOrderDetail/', orderDetail);
  }
}
