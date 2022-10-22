import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApisellerregistrationService {

  constructor(private  _http:HttpClient) { }

  insertSellerData(sellerData:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/insertSellerUser', sellerData);
  }

  checkValidSellerSignUp(sellerData:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/sellerSignUpUserValid', sellerData);
  }

  checkValidSellerSignIn(sellerData:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/sellerSignInUserValid', sellerData);
  }

  getLoginSellerFNameLName(sId:any):Observable<any>
  {
    return this._http.get('http://localhost:3000/getLoginSellerName/"'+sId+'"');
  }


}
