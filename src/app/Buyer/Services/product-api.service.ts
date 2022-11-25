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
  insertBuyerAddress(buyerAddressData):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveBuyerAddress', buyerAddressData);
  }

}
