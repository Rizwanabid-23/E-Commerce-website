import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApiServiceService {

  constructor(private _http:HttpClient) { }

  insertCategory(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveCategory', data);
  }
  getCategories():Observable<any>
  {
    return this._http.get('http://localhost:3000/getCategories');
  }
  insertSubCategory(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveSubCategory', data);
  }
  insertBrand(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveBrand', data);
  }

}
