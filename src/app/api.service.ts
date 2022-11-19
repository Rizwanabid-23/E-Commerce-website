import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private _http:HttpClient) {}

    //Connect Express to Angular
    expressUrl = 'http://localhost:3000/buyerUser';

    // This will get data from table
    getUserData():Observable<any>
    {
      return this._http.get('http://localhost:3000/buyerUser');
    }
    // reset buyer user password
    checkbuyerUserData(userData:any):Observable<any>
    {
      return this._http.post('http://localhost:3000/resetBuyerPassword',userData);
    }

    //update buyer user password

    updateBuyerUserPassword(userData:any):Observable<any>
    {
      // console.log(userData);
      return this._http.post('http://localhost:3000/updateBuyerPassword',userData);
    }

    // This will insert data in table
    insertUserData(userData:any):Observable<any>
    {
      return this._http.post('http://localhost:3000/buyerUser', userData);

    }

    // This will check that sign in user is valid or not
    checkValidSignInUser(userData:any):Observable<any>
    {
      return this._http.post('http://localhost:3000/buyerUserSignInValid', userData);
    }

    // This will check that sign up user detail is valid or not
    checkValidSignUpUser(userData:any):Observable<any>
    {
      return this._http.post('http://localhost:3000/buyerUserSignUpValid', userData);
    }

        // This will insert data in table
    checkProductStock(userData:any):Observable<any>
    {
      return this._http.post('http://localhost:3000/addProductValid', userData);

    }
    insertProductStock(userData:any):Observable<any>
    {
      return this._http.post('http://localhost:3000/addProduct', userData);

    }
    

}
