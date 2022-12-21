import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApiServiceService {

  constructor(private _http:HttpClient) { }
  checkValidSignInUser(userData: any): Observable<any> {
    return this._http.post('http://localhost:3000/adminSignInValid', userData);
  }
  totalSeller():Observable<any>
  {
    return this._http.get('http://localhost:3000/getTotalSeller');
  }
  sellerByDate(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/getSellerByDate', data);
  }
  totalBuyer():Observable<any>
  {
    return this._http.get('http://localhost:3000/getTotalBuyer');
  }
  buyerByDate(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/getBuyerByDate', data);
  }
  getSellerData():Observable<any>
  {
    return this._http.get('http://localhost:3000/getSellerData');
  }
  getBuyerData():Observable<any>
  {
    return this._http.get('http://localhost:3000/getBuyerData');
  }
  checkValidCategory(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/checkValidCategory', data);
  }

  insertCategory(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveCategory', data);
  }
  getCategories():Observable<any>
  {
    return this._http.get('http://localhost:3000/getCategories');
  }
  checkValidSubCategory(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/checkValidSubCategory', data);
  }
  insertSubCategory(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveSubCategory', data);
  }
  checkValidBrand(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/checkValidBrand', data);
  }
  insertBrand(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveBrand', data);
  }

}
