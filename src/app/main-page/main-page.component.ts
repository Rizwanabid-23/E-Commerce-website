import { Component, HostListener, OnInit,ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject }  from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';
import { ProductApiService } from '../Buyer/Services/product-api.service';
import { ProdAndSellerDescriptionComponent } from '../Buyer/prod-and-seller-description/prod-and-seller-description.component';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | any;

  // Variables
  categories:any;
  subCategories:any;
  categoryHashid = [];

  prevSlide() {
    this.carousel.prev();
    this,this.carousel.play();
  }

  abc:any;

  nextSlide() {
    this.carousel.next();
    this.carousel.play();
  }

  stopSlider() {
    this.carousel.pause();
  }

  constructor(private ap:AppComponent, private service:ProductApiService) { 

  }

  prdData:any;
  ngOnInit(): void {
    let h = this.ap.getRecentLoginBuyerId();
    console.log("recent ", h );
    this.getProductData();
    this.getCategories();
    this.getSubCategories();
    // localStorage.removeItem('buyerLoginId');
    // localStorage.removeItem('sellerLoginId');
  }

  // This will load catogaries on main page
  getCategories()
  {
    this.service.getCategories().subscribe((res) =>{
      this.categories = res.data;
    })
  
  }
  getSubCategories()
  {
    this.service.getSubCategories().subscribe((res) =>{
      this.subCategories = res.data;
    })
  }

  // This function will get all product categories data
  getProductData(){
    this.service.getAllProductData().subscribe((res) =>{
      this.prdData = res.data;
      console.log(" ghsjdsah ", this.prdData);
    })
  }
  getCategoryProducts(subCatId)
  {
    subCatId = parseInt(subCatId);
    this.service.getProductDataByCategory(subCatId).subscribe((res) =>{
      this.prdData = res.data;
    })
  }

  // This will load data of selected picture in product and seller description page by calling
  // function of that page
  setSelctedProductGlobalAndOpenNextPage(selected_prd_id)
  {
    this.ap.clickedProductPictureId = selected_prd_id;
    this.ap.saveClickPrdPictureIdForAddToCart();
    // sessionStorage.setItem('clickedPrdInPrdndSellerDescrip',this.ap.clickedProductPictureId.toString());
    this.ap.goProductAndSellerDetailPage();
  }

  // calculate product price with calculating discount
  calculatediscountedPrice(price, discountPercentage){
    return price - (price*discountPercentage/100)
  }
  slideIndex = 1;
  // showSlides(this.slideIndex);
  
  // Next/previous controls
  plusSlides(n:any) {
    this.showSlides(this.slideIndex += n);
  }
  
  // Thumbnail image controls
  currentSlide(n:any) {
    this.showSlides(this.slideIndex = n);
  }
  
  showSlides(n:any) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute("style","display:none");
      // slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    // slides[this.slideIndex-1].style.display = "block";
    slides[this.slideIndex-1].setAttribute("style","display:block");
    dots[this.slideIndex-1].className += " active";
  }

  myFunctiondrop(@Inject(DOCUMENT) document: Document) {
    document.getElementById("myDropdown")?.classList.toggle("show");
  }

  
  myFunctiondrop1() {
    document.getElementById("myDropdown1")?.classList.toggle("show");
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
      if (!(event.target == document.getElementById("electric-button")) || (event.target == document.getElementById("cloth-button"))) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }

  myFunctiondrop2() {
    document.getElementById("myDropdown2")?.classList.toggle("show");
  }
  
  
  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x?.className=="topnav") {
        x.className += "responsive";
    } else {
        null;
    }
  }
  

}
