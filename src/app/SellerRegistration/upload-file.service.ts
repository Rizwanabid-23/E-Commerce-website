import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private _http: HttpClient) { }

  public uploadfile(file: File) {

    let formParams = new FormData();
    formParams.append('file', file)
    return this._http.post('http://localhost:3000/uploadFile', formParams)
  }

}