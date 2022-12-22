import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
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
  subCategories;
  brands:any;
  picturePath:any;
  navigateOnNextPage:any;
  allEntriesRight:any;
  submitProductButton:any;
  submitProductButtonProperty:any;
  constructor(private service: APIService, private ap:AppComponent, private uploadService:UploadFileService) { }
  ngOnInit(): void {
    this.ap.loginSellerId = parseInt(sessionStorage.getItem('sellerLoginId'));
    this.submitProductButton = 'Save';
    this.submitProductButtonProperty = true;
    this.getSubCategories();
    this.getBrands();
  }

  getBrands()
  {
    this.service.getProductBrands().subscribe((res) =>{
      this.brands = res.data;
    })
  }
  getSubCategories()
  {
    this.service.getSubCategories().subscribe((res) =>{
      this.subCategories = res.data;
    })
  }
  userid = -10;
  pstockForm = new FormGroup({
    'pname': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'brandid': new FormControl('', Validators.required),
    'categoryid': new FormControl('', Validators.required),
    'pimage': new FormControl('', Validators.required),
    'buyPrice':new FormControl('',Validators.required),
    'sellPrice':new FormControl('',Validators.required),
    'discount':new FormControl('',Validators.required),
    'quantity':new FormControl('',Validators.required)
  })
  async checkProduct(){
    this.showMsg = '';
    this.allEntriesRight = true;
    await this.service.checkProductStock(this.pstockForm.value).subscribe(res => {
      this.readData = res.data;
      if (this.readData == null) {
        if(this.pstockForm.value.sellPrice < this.pstockForm.value.buyPrice)
        {
          this.allEntriesRight = false;
          this.showMsg = 'Sell Price Should be Greater than Buying Price';
        }
        else if((parseInt(this.pstockForm.value.discount) < 0) || (parseInt(this.pstockForm.value.discount) > 99))
        {
          this.allEntriesRight = false;
          this.showMsg = 'Discount should between 1 and 99';
        }
        else if((parseInt(this.pstockForm.value.quantity) <= 0) || (parseInt(this.pstockForm.value.quantity) > 99))
        {
          this.allEntriesRight = false;
          this.showMsg = 'Quantity should between 1 and 99';
        }
        if(this.allEntriesRight)
        {
          this.addProduct();
        }
      }
      else {
        this.showMsg = 'Same name Product Already Exist in Stock';
      }

    });

  }

  selectedFile:File=null;
  onFileChange(event:any)
  {
    this.selectedFile=event.target.files[0];
  }

  async addProduct() {
    let fname = this.selectedFile.name;
    if(fname.split(".").pop() == "jpeg" || fname.split(".").pop() == "png" || fname.split(".").pop() == "jpg")
    {
      // this.submitProductButton = 'Saving...';
      // this.submitProductButtonProperty = false;
      let response;
      let prdName = this.pstockForm.value.pname;
      let prdDescription = this.pstockForm.value.description;
      let prdSellerId = this.ap.loginSellerId.toString();
      let prdBrandId = this.pstockForm.value.brandid;
      let prdCategoryId = this.pstockForm.value.categoryid;

      let formParams = new FormData(); // This is for image
      formParams.append('image', this.selectedFile) // This is for image
      formParams.append("prdName", prdName);
      formParams.append("prdDescription", prdDescription);
      formParams.append("prdSellerId", prdSellerId);
      formParams.append("prdBrandId", prdBrandId);
      formParams.append("prdCategoryId", prdCategoryId);
      await this.service.insertProduct(formParams).subscribe(res => {
        response = res.data;
        if(response != null)
        {
          this.addProductStock(response);
        }
      });
    }
    else
    {
      this.showMsg = "Image type should be png, jpg or jpeg";
    }
  }

  async addProductStock(insertedPrdId) {
    let response;
    let prdBuyPrice = this.pstockForm.value.buyPrice;
    let prdSellPrice = this.pstockForm.value.sellPrice;
    let prdDiscountPercentage = this.pstockForm.value.discount;
    let quantity = this.pstockForm.value.quantity;
    let data = {
      "prdBuyPrice":prdBuyPrice,
      "prdSellPrice":prdSellPrice,
      "prdDiscountPercentage":prdDiscountPercentage,
      "quantity":quantity
    }
    await this.service.insertProductStock(data, insertedPrdId).subscribe(res => {
      response = res.data;
      if(response != null)
      {
        this.ap.showTextInMessageModal = "New Product Successfully Saved";
        this.ap.navigateOnNextPage = "SellerDashboard";
        this.ap.goMessageModalPage();
        this.pstockForm.reset();
      }
    });
  }



}
