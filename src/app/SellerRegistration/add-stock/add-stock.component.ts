import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../upload-file.service';



@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  showMsg: any;
  readData: any;
  accountCreated:Boolean = false;
  uLogin:Boolean;
  constructor(private service: APIService, private router: Router, private ap: AppComponent,private uploadService:UploadFileService) { }
  ngOnInit(): void {

  }
  getProductBrands()
  {
    console.log("Get Brands");
  }
  getProductCategory()
  {
    console.log("Get Category");
  }

  userid = -10;
  pstockForm = new FormGroup({
    'pname': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'sellerid': new FormControl('', Validators.required),
    'brandid': new FormControl('', Validators.required),
    'categoryid': new FormControl('', Validators.required),
    'pimage': new FormControl('', Validators.required),
    'buyPrice':new FormControl('',Validators.required),
    'sellPrice':new FormControl('',Validators.required),
    'discount':new FormControl('',Validators.required)

  })
  async checkProduct(){
    this.service.checkProductStock(this.pstockForm.value).subscribe(res => {
      this.readData = res.data;
      console.log("readData:",this.readData);
      if (this.readData == null) {
        this.addProductStock();
        console.log("line36");
      }
      else {
        this.showMsg = 'This Product Already Exist';
      }

    });

  }


  addProductStock() {
    this.userid = this.ap.loginSellerId;
    
    console.log("function");
    this.service.insertProductStock(this.pstockForm.value).subscribe(res => {

    });
    // this.ap.appOpen = false;
    // this.ap.sellerLogin = false;
    // this.ap.buyerLogin = true;


    this.router.navigate(['/SellerDashboard']);
    this.pstockForm.reset();
  }

  selectedFile:File=null;
  onFileChange(event:any)
  {
    // console.log(event);
    this.selectedFile=event.target.files[0];
    console.log("heheh");
    console.log(this.selectedFile);
  }
  onUpload()
  {
    
    if(this.selectedFile)
    {
      console.log("On upload Selected");
      this.uploadService.uploadfile(this.selectedFile).subscribe(res=>{
        alert("uploaded")
      })
    }
    else{
      alert("please select a file")
    }



    // const fd=new FormData();
    // fd.append('image',this.selectedFile,this.selectedFile.name);
    // this.http.post('C:/Users/rizwa/Documents/GitHub/E-Commerce-website/src/assets/upload_images',fd,{
    //   reportProgress: true,
    //   observe:'events'
    // })
    // .subscribe(event=>{
    //   if (event.type===HttpEventType.UploadProgress)
    //   {
    //     console.log('Upload progress:'+Math.round(event.loaded/event.total*100)+'%')
    //   }
    //   else if (event.type===HttpEventType.Response)
    //   {
    //     console.log(event);
    //   }
      
    // });
  }
}
