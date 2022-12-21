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
    return this._http.get('http://localhost:3000/getSelectedProduct/'+prdId);
  }
  getAllProductData():Observable<any>
  {
    return this._http.get('http://localhost:3000/getProduct');
  }
  // getLoginSellerProducts(sid):Observable<any>
  // {
  //   return this._http.get('http://localhost:3000/getLoginSellerProducts/"'+sid+'"');
  // }
  // This will get product by categories
  getProductDataByCategory(categoryId):Observable<any>
  {
    return this._http.get('http://localhost:3000/getProductByCategory/"'+categoryId+'"');
  }

  getSellerProductData(sid:any):Observable<any>
  {
    return this._http.get('http://localhost:3000/getSellerProduct/'+sid);
  }

  getAllSaleData(sid:any):Observable<any>
  {
    return this._http.get("http://localhost:3000/getSaleData/"+sid)
  }
  totalSale(sid:any):Observable<any>
  {
    // console.log("sssiiidddd:",sid);
    return this._http.get("http://localhost:3000/getTotalSale/"+sid)
  }
  saleByDate(date:any, sid:any):Observable<any>
  {
    // console.log("idddd  ", date);
    return this._http.post("http://localhost:3000/getSaleByDate/"+sid, date)
  }

  totalExpense(sid:any):Observable<any>
  {
    return this._http.get("http://localhost:3000/getTotalExpense/"+sid)
  }
  expenseByDate(date:any, sid:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/getExpenseByDate/"+sid, date)
  }
  totalProfit(sid:any):Observable<any>
  {
    // console.log("idddd  ", date);
    return this._http.get("http://localhost:3000/getTotalProfit/"+sid)
  }
  profitByDate(date:any, sid:any):Observable<any>
  {
    // console.log("idddd  ", date);
    return this._http.post("http://localhost:3000/getProfitByDate/"+sid, date)
  }
  totalProductSold(sid:any):Observable<any>
  {
    return this._http.get("http://localhost:3000/getTotalProductSold/"+sid)
  }
  productSoldByDate(date:any, sid:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/getProductSoldByDate/"+sid, date)
  }

  totalProductremaining(sid:any):Observable<any>
  {
    return this._http.get("http://localhost:3000/getTotalProductremaining/"+sid)
  }
  productRemainingByDate(date:any, sid:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/getProductRemainingByDate/"+sid, date)
  }

  getBuyerData(sid:any):Observable<any>
  {
    return this._http.get("http://localhost:3000/getBuyerData/"+sid)
  }
  annualProfit(sid:any):Observable<any>
  {
    // console.log("sid:",sid);
    return this._http.get("http://localhost:3000/getAnnualProfit/"+sid)
  }

  monthlyProfit(sid:any):Observable<any>
  {
    return this._http.get("http://localhost:3000/getMonthlyProfit/"+sid)
  }

  getProductQuantity(prdId):Observable<any>
  {
    return this._http.get('http://localhost:3000/getProductQuantity/"'+prdId+'"');
  }

  insertBuyerAddress(recentLoginBuyer,buyerAddressData):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveBuyerAddress/'+ recentLoginBuyer, buyerAddressData);
  }

  getBuyerAddress(recentLoginBuyer):Observable<any>
  {
    return this._http.get('http://localhost:3000/getBuyerAddress/'+ recentLoginBuyer);
  }

  getCategories():Observable<any>
  {
    return this._http.get('http://localhost:3000/getCategories');
  }

  getSubCategories():Observable<any>
  {
    return this._http.get('http://localhost:3000/getSubCategories');
  }

  insertOrder(data:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveOrder/', data);
  }

  insertOrderDetails(orderDetail):Observable<any>
  {
    return this._http.post('http://localhost:3000/saveOrderDetail/', orderDetail);
  }
  // This will add product stock
  insertProductStock(userData:any, prdId): Observable<any> {
    return this._http.post('http://localhost:3000/addProductStock/'+prdId, userData);
  }
  updateRecentAddedStock(userData:any):Observable<any>
  {
    return this._http.post('http://localhost:3000/updateRecentaddStock', userData);
  }
  deleteSelectedProduct(data):Observable<any>
  {
    return this._http.post("http://localhost:3000/deleteSelectedProduct/",data)
  }
}
